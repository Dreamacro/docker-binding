import docker, { IMAGE } from './spec_helper'
import { Container, Network } from '../lib'

let container: Container, network: Network

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

test('can list networks', async () => {
  const networks = await docker.getAllNetworks()
  expect(networks.length).not.toEqual(0)
})

test('can create a network', async () => {
  network = await docker.createNetwork({
    Name: 'test'
  })

  expect(network).not.toBeUndefined()
})

test('can inspect a network', async () => {
  const info = await network.inspect()
  expect(info.Id).not.toBeUndefined()
})

test('can connect a container to a network', async () => {
  const isSucceed = await network.connect(container.id)
  expect(isSucceed).toBeTruthy()
})

test('can disconnect a container to a network', async () => {
  const isSucceed = await network.disconnect(container.id)
  expect(isSucceed).toBeTruthy()
})

test('can remove a network', async () => {
  const isSucceed = await network.remove()
  expect(isSucceed).toBeTruthy()
})
