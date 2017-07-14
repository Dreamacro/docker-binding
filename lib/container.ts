import * as util from './util'
import Request, { RequestPromise } from './request'
import { Exec } from './exec'

export interface IContainer {
  Id: string
  Names: string[]
  Image: string
  ImageID: string
  Command: string
  Created: number
  State: string
  Status: string
  Ports: {
    PrivatePort: number
    PublicPort: number
    Type: string
  }[]
  Labels: {
    [key: string]: string
  }
  SizeRw: number
  SizeRootFs: number
  HostConfig: {}
  NetworkSettings: {}
  Mounts: {
    Name: string
    Source: string
    Destination: string
    Driver: string
    Mode: string
    RW: boolean
    Propagation: string
  }[]
}

export interface IContainerQuery {
  all?: boolean
  limit?: number
  size?: boolean
  filters?: {
    ancestor?: string
    before?: string
    expose?: string
    exited?: string
    health?: string
    id?: string
    isolation?: string
    'is-task'?: string
    label?: string
    name?: string
    network?: string
    publish?: string
    since?: string
    status?: string
    volume?: string
  }
}

export interface IContainerBody {
  Hostname?: string
  Domainname?: string
  User?: string
  AttachStdin?: boolean
  AttachStdout?: boolean
  AttachStderr?: boolean
  ExposedPorts?: {
    [key: string]: object
  }
  Tty?: boolean
  OpenStdin?: boolean
  Env?: string[]
  Cmd?: string[] | string
  Image: string
  WorkingDir?: string
  Entrypoint?: string | string[]
  [key: string]: any
}

export interface IExecBody {
  AttachStdin?: boolean
  AttachStdout?: boolean
  AttachStderr?: boolean
  DetachKeys?: string
  Tty?: boolean
  Env?: string[]
  Cmd?: string[]
  Privileged?: boolean
  User?: string
}

export class Container {
  constructor(readonly id: string, readonly request: Request) {}

  inspect(size: boolean = false): Promise<util.KeyValue> {
    const u = util.genURL(`/containers/${this.id}/json`, { size })
    return this.request.get(u).then(resp => resp.body)
  }

  start(detachKeys: string = ''): Promise<boolean> {
    const u = util.genURL(`/containers/${this.id}/start`, { detachKeys })
    return (this.request.post(u) as RequestPromise).then(
      resp => resp.statusCode === 204
    )
  }

  stop(t: number = 0): Promise<boolean> {
    const u = util.genURL(`/containers/${this.id}/stop`, { t })
    return (this.request.post(u) as RequestPromise).then(
      resp => resp.statusCode === 204
    )
  }

  restart(t: number = 0): Promise<boolean> {
    const u = util.genURL(`/containers/${this.id}/restart`, { t })
    return (this.request.post(u) as RequestPromise).then(
      resp => resp.statusCode === 204
    )
  }

  kill(signal: string = 'SIGKILL') {
    const u = util.genURL(`/containers/${this.id}/kill`, { signal })
    return (this.request.post(u) as RequestPromise).then(
      resp => resp.statusCode === 204
    )
  }

  remove(opt: {
    v?: boolean
    force?: boolean
    link?: boolean
  } = {}): Promise<boolean> {
    const u = util.genURL(`/containers/${this.id}`, opt)
    return this.request.del(u).then(resp => resp.statusCode === 204)
  }

  exec(opt?: IExecBody): Promise<Exec> {
    const u = `/containers/${this.id}/exec`
    return (this.request.post(u, opt) as RequestPromise).then(
      resp => new Exec(resp.body.Id, this.request)
    )
  }
}

export class MacroContainer extends Container {
  constructor(private info: IContainer, request: Request) {
    super(info.Id, request)
  }

  get<K extends keyof IContainer>(key: K) {
    return this.info[key]
  }
}
