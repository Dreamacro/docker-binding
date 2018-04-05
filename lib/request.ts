import { Readable } from 'stream'
import { Agent } from 'https'
import { IncomingMessage } from 'http'
import * as fs from 'fs'
import * as path from 'path'

import * as got from 'got'
import { GotOptions, GotResponse, GotPromise } from 'got'

export interface RequestConfig {
  baseURL?: string
  socketPath?: string
  key?: Buffer
  ca?: Buffer
  cert?: Buffer
}

export interface RequestResponse extends GotResponse {}
export interface RequestPromise extends GotPromise {}
export interface RequestOptions extends GotOptions {}

class Request {
  private baseURL: string
  private agent: Agent
  private socketPath: string
  constructor(config: RequestConfig) {
    const { key, ca, cert } = config

    this.agent =
      key && cert
        ? new Agent({
            key,
            cert,
            ca,
            rejectUnauthorized: !!ca
          })
        : undefined
    this.baseURL = config.baseURL
    this.socketPath = config.socketPath
  }

  protected getPath(api: string) {
    if (this.socketPath) {
      return path.join(`unix:${this.socketPath}:`, api)
    }
    return path.join(this.baseURL, api)
  }

  get(path: string, json: boolean = true, option: RequestOptions = {}) {
    return got.get(this.getPath(path), { ...option, agent: this.agent, json })
  }

  post(
    path: string,
    body: Buffer | object = new Buffer(0),
    stream: boolean = false,
    option: RequestOptions = {}
  ): IncomingMessage | RequestPromise {
    const u = this.getPath(path)
    return stream
      ? got.stream.post(u, { ...option, body, agent: this.agent })
      : got.post(u, {
          ...option,
          agent: this.agent,
          body,
          json: !Buffer.isBuffer(body)
        })
  }

  del(path: string, json: boolean = true, option: RequestOptions = {}) {
    return got.delete(this.getPath(path), {
      ...option,
      agent: this.agent,
      json
    })
  }
}

export default Request
