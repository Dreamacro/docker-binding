import { KeyValue } from './util'

export interface Version {
  Version: string
  Os: string
  KernelVersion: string
  GoVersion: string
  GitCommit: string
  Arch: string
  ApiVersion: string
  MinAPIVersion: string
  BuildTime: string
  Experimental: boolean
}

export interface Info extends KeyValue {
  Architecture: string
  Containers: number
  Images: number
  KernelVersion: string
  MemTotal: number
  NCPU: number
  Name: string
  OperatingSystem: string
  ServerVersion: string
  SystemTime: string
}
