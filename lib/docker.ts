import { Agent, AgentOptions } from 'https'
import { IncomingMessage } from 'http'
import * as fs from 'fs'
import * as url from 'url'

import Request, { RequestConfig, RequestPromise } from './request'
import * as util from './util'
import { Version, Info } from './system'
import {
  Image,
  ImageQuery,
  MacroImage,
  IImage,
  ICreateImageQuery
} from './image'
import {
  Container,
  IContainerQuery,
  MacroContainer,
  IContainer,
  IContainerBody
} from './container'
import { Network, MacroNetwork, INetwork, ICreateNetworkBody } from './network'
import { Volume, MacroVolume, IVolume, ICreateVolumeBody } from './volume'

const readFileOrNull = (path: string) => (path ? fs.readFileSync(path) : null)

export default class Docker {
  private request: Request
  constructor(config: RequestConfig) {
    this.request = new Request(config)
  }

  getAllImages(query?: ImageQuery): Promise<MacroImage[]> {
    const u = util.genURL('/images/json', query)
    return this.request
      .get(u)
      .then(resp =>
        (resp.body as IImage[]).map(i => new MacroImage(i, this.request))
      )
  }

  getImage(name: string): Image {
    return new Image(name, this.request)
  }

  getAllContainers(query?: IContainerQuery): Promise<MacroContainer[]> {
    const u = util.genURL('/containers/json', query)
    return this.request
      .get(u)
      .then(resp =>
        (resp.body as IContainer[]).map(
          c => new MacroContainer(c, this.request)
        )
      )
  }

  getContainer(id: string): Container {
    return new Container(id, this.request)
  }

  getAllNetworks(filters: util.KeyValue = {}): Promise<MacroNetwork[]> {
    const u = util.genURL('/networks', filters)
    return this.request
      .get(u)
      .then(resp =>
        (resp.body as INetwork[]).map(n => new MacroNetwork(n, this.request))
      )
  }

  getNetwork(id: string): Network {
    return new Network(id, this.request)
  }

  getAllVolumes(filters: util.KeyValue = {}): Promise<MacroVolume[]> {
    const u = util.genURL('/volumes', filters)
    return this.request
      .get(u)
      .then(resp =>
        (resp.body.Volumes as IVolume[]).map(
          n => new MacroVolume(n, this.request)
        )
      )
  }

  getVolume(name: string): Volume {
    return new Volume(name, this.request)
  }

  createNetwork(opts: ICreateNetworkBody): Promise<Network> {
    const u = '/networks/create'
    return (this.request.post(u, opts) as RequestPromise).then(
      resp => new Network(resp.body.Id, this.request)
    )
  }

  createVolume(opts: ICreateVolumeBody): Promise<Volume> {
    const u = '/volumes/create'
    return (this.request.post(u, opts) as RequestPromise).then(
      resp => new Volume(resp.body.Name, this.request)
    )
  }

  createContainer(body: IContainerBody, name?: string): Promise<Container> {
    const u = util.genURL('/containers/create', { name })
    return (this.request.post(u, body) as RequestPromise).then(
      resp => new Container(resp.body.Id, this.request)
    )
  }

  delUnusedNetworks(filters: util.KeyValue): Promise<boolean> {
    const u = util.genURL('/networks/prune', filters)
    return (this.request.post(u) as RequestPromise).then(
      resp => resp.statusCode === 200
    )
  }

  pull(
    query: ICreateImageQuery,
    stream: boolean = false,
    body: string = ''
  ): IncomingMessage | RequestPromise {
    const u = util.genURL('/images/create', query)
    return this.request.post(u, new Buffer(body), stream)
  }

  alive(): Promise<boolean> {
    return this.request.get('/_ping', false).then(resp => resp.body === 'OK')
  }

  version(): Promise<Version> {
    return this.request.get('/version').then(resp => resp.body as Version)
  }

  info(): Promise<Info> {
    return this.request.get('/info').then(resp => resp.body as Info)
  }
}
