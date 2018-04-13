import docker, { IMAGE } from './spec_helper'
import { Container } from '../lib'
import { Readable } from 'stream'

let container: Container

test('can start a container from alpine', async () => {
  container = await docker.createContainer({
    Image: IMAGE,
    Cmd: ['sh', '-c', 'while true; do sleep 3; done;']
  })

  const info = await container.inspect()
  const isStart = await container.start()
  expect(info.Id).not.toBeUndefined()
  expect(isStart).toBeTruthy()
})

test('can get all containers and include alpine', async () => {
  const containers = await docker.getAllContainers({ all: true })
  const alpine = containers.find(c => c.get('Image') === IMAGE)

  expect(containers.length).not.toEqual(0)
  expect(alpine.get('Id')).not.toBeUndefined()
})

test('get container logs', async () => {
  const logStream = await container.log()
  expect(logStream).toBeInstanceOf(Readable)
})

test('can stop a container', async () => {
  const isSucceed = await container.stop()
  expect(isSucceed).toBeTruthy()
})

test('can restart a container', async () => {
  const isSucceed = await container.restart()
  expect(isSucceed).toBeTruthy()
})

test('can kill a container', async () => {
  const isSucceed = await container.kill()
  expect(isSucceed).toBeTruthy()
})

test('can remove a container', async () => {
  const isSucceed = await container.remove()
  expect(isSucceed).toBeTruthy()
})
