import * as url from 'url'

export interface KeyValue {
  [key: string]: any
}

export function genURL(pathname: string, query?: object) {
  return url.format({
    pathname,
    query
  })
}
