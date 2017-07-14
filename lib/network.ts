import Request, { RequestPromise } from './request'
import * as util from './util'

export interface INetwork {
  Name: string
  Id: string
  Created: Date
  Scope: string
  Driver: string
  EnableIPv6: boolean
  Internal: boolean
  Attachable: boolean
  Ingress: boolean
  IPAM: {
    Driver: string
    Config: {}[]
  }
}

export interface ICreateNetworkBody {
  Name: string
  CheckDuplicate?: boolean
  Driver?: string
  Internal?: boolean
  Attachable?: boolean
  Ingress?: boolean
  IPAM?: {
    Driver?: string
    Config?: {}[]
    Options?: object
  }
  EnableIPv6?: boolean
  Options?: {}[]
  Labels?: {}[]
}

export class Network {
  constructor(private id: string, readonly request: Request) {}

  inspect(): util.KeyValue {
    const path = `/networks/${this.id}`
    return this.request.get(path).then(resp => resp.body)
  }

  remove(): Promise<boolean> {
    const path = `/networks/${this.id}`
    return this.request.del(path).then(resp => resp.statusCode === 204)
  }

  connect(Container: string, EndPointConfig?: any): Promise<boolean> {
    const path = `/networks/${this.id}/connect`
    return (this.request.post(path, {
      Container,
      EndPointConfig
    }) as RequestPromise).then(resp => resp.statusCode === 200)
  }

  disconnect(Container: string, Force?: boolean): Promise<boolean> {
    const path = `/networks/${this.id}/disconnect`
    return (this.request.post(path, {
      Container,
      Force
    }) as RequestPromise).then(resp => resp.statusCode === 200)
  }
}

export class MacroNetwork extends Network {
  constructor(private info: INetwork, readonly request: Request) {
    super(info.Id, request)
  }

  get<K extends keyof INetwork>(key: K) {
    return this.info[key]
  }
}
