import docker, { IMAGE } from './spec_helper'
import { Container, Exec } from '../lib'

let container: Container, exec: Exec

beforeAll(async () => {
  container = await docker.createContainer({
    Image: IMAGE,
    Cmd: ['sh', '-c', 'while true; do sleep 3; done;']
  })
  await container.start()
})

afterAll(async () => {
  await container.kill()
  await container.remove()
})

test('can create a exec instance', async () => {
  exec = await container.exec({
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Cmd: ['sh'],
    Tty: true,
  })

  expect(exec).not.toBeUndefined()
})

test('can start a exec instance', async () => {
  const stream = exec.start({
    Tty: true
  })
  expect(stream).not.toBeUndefined()
})

test('can inspect a exec instance', async () => {
  const info = await exec.inspect()
  expect(info.ID).not.toBeUndefined()
})
