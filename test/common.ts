import docker from './spec_helper'

test('can connect remote api', async () => {
  expect(await docker.alive()).toBeTruthy()
})

test('can get version', async () => {
  const version = await docker.version()
  expect(version.Version).not.toBeUndefined()
})
