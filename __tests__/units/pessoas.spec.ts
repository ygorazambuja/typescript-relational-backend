import request from 'supertest'
import * as faker from 'faker'

const password = faker.internet.password()

const usuarioFake = {
  nome: faker.name.firstName(),
  email: faker.internet.email(),
  password: password,
  confirmPassword: password
}

const URL_PADRAO = 'http://localhost:3000'

describe('Pessoas', () => {
  it('deveria criar 10 usuarios novos', async () => {
    const password = faker.internet.password()
    const arrayOfUsers = []
    for (let i = 0; i < 10; i++) {
      const fakeUser = {
        nome: faker.name.firstName(),
        email: faker.internet.email(),
        password: password,
        confirmPassword: password
      }
      arrayOfUsers.push(fakeUser)
    }
    arrayOfUsers.map(async usuario => {
      await request(URL_PADRAO)
        .post('/signup')
        .send(usuario)
    })
    const response = await request(URL_PADRAO).get('/pessoa')
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(100)
  })

  it('deveria criar um usuario novo', async done => {
    const result = await request(URL_PADRAO)
      .post('/signup')
      .send(usuarioFake)

    expect(result.body.nome).toBe(usuarioFake.nome)
    expect(result.body.email).toBe(usuarioFake.email)
    expect(result.body.password).not.toBe(usuarioFake.password)
    done()
  })
  it('deveria retornar um usuario invalido e sem autorização', async done => {
    let usuarioInvalido = usuarioFake
    usuarioInvalido.password = 'algumaSenhaInvalida'
    const result = await request(URL_PADRAO)
      .post('/signin')
      .send(usuarioInvalido)

    expect(result.body.token).toBeUndefined()
    expect(result.status).toBe(401)
    done()
  })

  it('não deveria deletar o usuario pelo ID, porque não existe no banco', async () => {
    const id = 4000
    const result = await request(URL_PADRAO).delete(`/pessoa/${id}`)

    expect(result.status).toBe(400)
  })

  it('deveria deletar o usuario pelo ID', async () => {
    const pessoas = await request(URL_PADRAO).get('/pessoa')
    const id = pessoas.body[pessoas.body.length - 1].id
    const result = await request(URL_PADRAO).delete(`/pessoa/${id}`)
    expect(result.status).toBe(204)
  })

  it('deveria listar os usuarios', () => {
    request(URL_PADRAO)
      .get('/pessoa')
      .then(result => {
        expect(result.body).toBeInstanceOf(Array)
      })
  })
})
