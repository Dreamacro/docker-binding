declare module 'got' {
  import { RequestOptions, IncomingMessage } from 'http'
  import { Readable, Stream } from 'stream'

  function Got(url: string, opts: Got.GotOptions): Got.GotPromise

  namespace Got {
    export interface GotResponse extends IncomingMessage {
      body: any
    }

    export interface GotPromise extends Promise<GotResponse> {}

    export interface GotOptions extends RequestOptions {
      body?: string | Buffer | Readable | object
      encoding?: string | null
      form?: boolean
      json?: boolean
      query?: string | object
      retries?: number | Function
      followRedirect?: boolean
      decompress?: boolean
      useElectronNet?: boolean
    }

    export function HTTPError(...args: any[]): void

    export function MaxRedirectsError(...args: any[]): void

    export function ParseError(...args: any[]): void

    export function ReadError(...args: any[]): void

    export function RequestError(...args: any[]): void

    export function UnsupportedProtocolError(...args: any[]): void

    export function get(url: string, opts: GotOptions): GotPromise

    export function head(url: string, opts: GotOptions): GotPromise

    export function patch(url: string, opts: GotOptions): GotPromise

    export function post(url: string, opts: GotOptions): GotPromise

    export function put(url: string, opts: GotOptions): GotPromise

    function del(url: string, opts: GotOptions): GotPromise
    export { del as delete }

    export function stream(url: string, opts: GotOptions): GotPromise

    namespace HTTPError {
      const stackTraceLimit: number

      function captureStackTrace(p0: any, p1: any): any

      namespace prototype {
        const message: string

        const name: string

        function toString(): string
      }
    }

    namespace MaxRedirectsError {
      const stackTraceLimit: number

      function captureStackTrace(p0: any, p1: any): any

      namespace prototype {
        const message: string

        const name: string

        function toString(): string
      }
    }

    namespace ParseError {
      const stackTraceLimit: number

      function captureStackTrace(p0: any, p1: any): any

      namespace prototype {
        const message: string

        const name: string

        function toString(): string
      }
    }

    namespace ReadError {
      const stackTraceLimit: number

      function captureStackTrace(p0: any, p1: any): any

      namespace prototype {
        const message: string

        const name: string

        function toString(): string
      }
    }

    namespace RequestError {
      const stackTraceLimit: number

      function captureStackTrace(p0: any, p1: any): any

      namespace prototype {
        const message: string

        const name: string

        function toString(): string
      }
    }

    namespace UnsupportedProtocolError {
      const stackTraceLimit: number

      function captureStackTrace(p0: any, p1: any): any

      namespace prototype {
        const message: string

        const name: string

        function toString(): string
      }
    }

    export namespace stream {
      export function get(url: string, opts: GotOptions): IncomingMessage

      export function head(url: string, opts: GotOptions): IncomingMessage

      export function patch(url: string, opts: GotOptions): IncomingMessage

      export function post(url: string, opts: GotOptions): IncomingMessage

      export function put(url: string, opts: GotOptions): IncomingMessage

      function del(url: string, opts: GotOptions): IncomingMessage
      export { del as delete }
    }
  }

  export = Got
}
