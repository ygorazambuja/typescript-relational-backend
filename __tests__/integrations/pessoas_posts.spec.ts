import request from 'supertest'
import * as faker from 'faker'
import userInterface from '../../src/interfaces/userInterface'

const URL_PADRAO = 'http://localhost:3000'

async function getUsuarioValido () {
  const response = await request(URL_PADRAO).get('/pessoa')
  const users: [userInterface] = response.body
  return users[users.length - 1]
}

describe('integração dos usuarios com os posts', () => {
  it('deveria adicionar um post para cada usuario cadastrado', async () => {
    const response = await request(URL_PADRAO).get('/pessoa')
    response.body.map(async usuario => {
      let user = {
        pessoaId: usuario.id,
        titulo: faker.lorem.lines(1),
        conteudo: faker.lorem.words(30)
      }
      await request(URL_PADRAO)
        .post('/posts')
        .send(user)
    })
    expect(response.status).toBe(200)
  })
  it('deveria adicionar um post', async () => {
    const usuarioValido = await getUsuarioValido()
    const post = {
      pessoaId: usuarioValido.id,
      titulo: faker.lorem.lines(1),
      conteudo: faker.lorem.words(30)
    }
    const response = await request(URL_PADRAO)
      .post('/posts')
      .send(post)
    expect(response.status).toBe(204)
    expect(response.noContent).toEqual(true)
  })
  it('deveria listar todos os posts de um determinado usuario', async () => {
    const usuarioValido = await getUsuarioValido()
    const response = await request(URL_PADRAO).get(
      `/pessoa/${usuarioValido.id}/posts`
    )
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })
})
