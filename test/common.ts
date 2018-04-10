import docker from './spec_helper'

test('can connect remote api', async () => {
  expect(await docker.alive()).toBeTruthy()
})

test('can get version', async () => {
  const version = await docker.version()
  expect(version.Version).not.toBeUndefined()
})

test('can get info', async () => {
  const info = await docker.info()
  expect(info.MemTotal).not.toBeUndefined()
})
