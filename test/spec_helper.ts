import Docker from '../lib'

const socketPath = '/var/run/docker.sock'

export const IMAGE = 'alpine:latest'

export default new Docker({ socketPath })
