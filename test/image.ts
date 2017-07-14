import docker, { IMAGE } from './spec_helper'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

test('can get all images', async () => {
  const images = await docker.getAllImages({ all: true })
  const alpine = images.find(i => i.get('RepoTags').includes(IMAGE))
  expect(alpine).not.toBeUndefined()
})

test('can inspect a image', async () => {
  const image = await docker.getImage(IMAGE)
  const alpine = await image.inspect()
  expect(alpine.Id).not.toBeUndefined()
})

test('can get history from a image', async () => {
  const image = await docker.getImage(IMAGE)
  const history = await image.history()
  expect(history.length).not.toEqual(0)
})

test('can pull image', async () => {
  const [name, tag] = IMAGE.split(':')
  const ret = await docker.pull({
    fromImage: name,
    tag,
    fromSrc: 'https://docker.mirrors.ustc.edu.cn/'
  })
  expect(ret).not.toBeUndefined()
})
