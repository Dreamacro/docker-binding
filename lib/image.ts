import Request from './request'
import * as util from './util'

export interface IImage {
  Id: string
  ParentId: string
  RepoTags: string[]
  RepoDigests: string[]
  Created: number
  Size: number
  VirtualSize: number
  SharedSize: number
  Labels: {
    [key: string]: string
  }
  Containers: number
}

export interface ImageQuery {
  all?: boolean
  filters?: {
    before?: string
    dangling?: string
    label?: string
    reference?: string
    since?: string
  }
  digests?: boolean
}

export interface ImageHistory {
  Id: string
  Created: number
  CreatedBy: string
  Tags: string[]
  Size: number
  Comment: string
}

export interface ICreateImageQuery {
  fromImage?: string
  fromSrc?: string
  repo?: string
  tag?: string
}

export class Image {
  constructor(private name: string, readonly request: Request) {}

  inspect(): util.KeyValue {
    const path = `/images/${this.name}/json`
    return this.request.get(path).then(resp => resp.body)
  }

  history() {
    const path = `/images/${this.name}/history`
    return this.request.get(path).then(resp => resp.body as ImageHistory[])
  }
}

export class MacroImage extends Image {
  constructor(private info: IImage, readonly request: Request) {
    super(info.Id, request)
  }

  get<K extends keyof IImage>(key: K) {
    return this.info[key]
  }
}
