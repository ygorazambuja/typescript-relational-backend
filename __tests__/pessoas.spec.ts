import request from 'supertest'
import { decode } from 'jwt-simple'
import { authSecret } from '../.env'
import * as faker from 'faker'

const URL_PADRAO = 'http://localhost:3000'

describe('Pessoas', () => {
  it('deveria retornar um token valido', async () => {
    const usuarioValido = {
      email: 'ygorazambuja@gmail.com',
      password: '123456'
    }
    const result = await request(URL_PADRAO)
      .post('/signin')
      .send(usuarioValido)

    const isMatch = decode(result.body.token, authSecret)

    expect(isMatch.id).toBeDefined()
    expect(isMatch.nome).toBeDefined()
    expect(isMatch.iat).toBeDefined()
    expect(isMatch.exp).toBeDefined()
    expect(isMatch.email).toBeDefined()
  })
  it('deveria retornar um usuario invalido', async () => {
    const usuarioInvalido = {
      email: 'ygorazambuja@gmail.com',
      password: '12345'
    }
    const result = await request(URL_PADRAO)
      .post('/signin')
      .send(usuarioInvalido)

    expect(result.body.token).toBeUndefined()
  })
  it('deveria dar problema de usuario sem autorização', async () => {
    const usuarioComSenhaErrada = {
      email: 'ygorazambuja@gmail.com',
      password: '12345'
    }
    const result = await request(URL_PADRAO)
      .post('/signin')
      .send(usuarioComSenhaErrada)

    expect(result.status).toBe(401)
  })
  it('deveria criar um usuario novo', async () => {
    const passwordFake = faker.internet.password()

    const usuarioFake = {
      nome: faker.name.firstName(),
      email: faker.internet.email(),
      password: passwordFake,
      confirmPassword: passwordFake
    }
    const result = await request(URL_PADRAO)
      .post('/signup')
      .send(usuarioFake)

    expect(result.body.nome).toBe(usuarioFake.nome)
    expect(result.body.email).toBe(usuarioFake.email)
    expect(result.body.password).not.toBe(usuarioFake.password)
  })
  it('não deveria deletar o usuario pelo ID, porque não existe no banco', async () => {
    const id = 4
    const result = await request(URL_PADRAO).delete(`/pessoa/${id}`)

    expect(result.status).toBe(400)
  })
  it('deveria deletar o usuario pelo ID', async () => {
    const pessoas = await request(URL_PADRAO).get('/pessoa')
    const id = pessoas.body[pessoas.body.length - 1].id
    const result = await request(URL_PADRAO).delete(`/pessoa/${id}`)
    expect(result.status).toBe(204)
  })
  it('deveria listar os usuarios', async () => {
    const result = await request(URL_PADRAO).get('/pessoa')
    expect(result.body).toBeInstanceOf(Array)
    expect(result.body[result.body.length - 1].id).toBeDefined()
  })
})
