import { IncomingMessage } from 'http'

import Request, { RequestPromise } from './request'
import * as util from './util'

export interface IExecStartBody {
  Detach?: boolean
  Tty?: boolean
}

export interface IExecResizeQuery {
  h?: number
  w?: number
}

export class Exec {
  constructor(private id: string, readonly request: Request) {}

  start(opt: IExecStartBody): IncomingMessage {
    const u = `/exec/${this.id}/start`
    return this.request.post(u, new Buffer(JSON.stringify(opt)), true, {
      headers: { 'Content-Type': 'application/json' }
    }) as IncomingMessage
  }

  inspect(): Promise<util.KeyValue> {
    const u = `/exec/${this.id}/json`
    return this.request.get(u).then(resp => resp.body)
  }

  resize(opt: IExecResizeQuery): Promise<boolean> {
    const u = `/exec/${this.id}/resize`
    return (this.request.post(u, opt) as RequestPromise).then(
      resp => resp.statusCode === 201
    )
  }
}
