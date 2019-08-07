import * as faker from 'faker'
import request from 'supertest'

const URL_PADRAO = 'http://localhost:3000'

describe('Teste com Comentarios', () => {
  it('deveria adicionar um comentario', async () => {
    const comentario = {
      conteudo: faker.lorem.lines(5),
      postId: Math.floor(Math.random() * (3000 - 0))
    }
    const response = await request(URL_PADRAO)
      .post(`/posts/comentario`)
      .send(comentario)

    expect(response.status).toBe(204)
    expect(response.noContent).toBe(true)
  })
  it('deveria pegar todos os comentarios do post', async () => {
    const postId = Math.floor(Math.random() * (3000 - 0))

    const response = await request(URL_PADRAO).get(
      `/posts/${postId}/comentarios`
    )
    expect(response.body).toBeInstanceOf(Array)
    expect(response.status).not.toBe(400)
  })
})
