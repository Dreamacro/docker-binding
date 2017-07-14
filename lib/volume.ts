import Request, { RequestPromise } from './request'
import * as util from './util'

export interface IVolume {
  Name: string
  Driver: string
  Mountpoint: string
  Labels: util.KeyValue
  Scope: string
  Options: {
    device: string
    o: string
    type: string
  }
}

export interface ICreateVolumeBody {
  Name?: string
  Driver?: string
  DriverOpts?: util.KeyValue
  Labels?: util.KeyValue
}

export class Volume {
  constructor(readonly name: string, readonly request: Request) {}

  inspect(): util.KeyValue {
    const path = `/volumes/${this.name}`
    return this.request.get(path).then(resp => resp.body)
  }

  remove(): Promise<boolean> {
    const path = `/volumes/${this.name}`
    return this.request.del(path).then(resp => resp.statusCode === 204)
  }
}

export class MacroVolume extends Volume {
  constructor(private info: IVolume, readonly request: Request) {
    super(info.Name, request)
  }

  get<K extends keyof IVolume>(key: K) {
    return this.info[key]
  }
}
