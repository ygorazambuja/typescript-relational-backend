import request from 'supertest'

const URL_PADRAO = 'http://localhost:3000'

describe('Posts', () => {
  it('deveria remover um post pelo ID', async () => {
    const posts = await request(URL_PADRAO).get('/posts')
    const id = posts.body[posts.body.length - 1].id

    const response = await request(URL_PADRAO).del(`/posts/${id}`)
    expect(response.status).toBe(204)
  })
})
