import request from 'supertest'
import * as faker from 'faker'
import * as dotenv from 'dotenv'
import { Encrypt } from '../../src/utils/crypto'

beforeAll(() => {
  dotenv.config()
})

const URL_PADRAO = 'http://localhost:3000'

describe('Testes com mensagens privadas, criptografando os emails', () => {
  it('deveria criptografar o email', async () => {
    const remetente = faker.internet.email()
    const remetenteCriptografado = await Encrypt(remetente)

    expect(remetente).not.toBe(remetenteCriptografado)
  })
  it('deveria postar uma nova mensagem', async () => {
    const novoPost = {
      remetente: faker.internet.email(),
      conteudo: faker.lorem.words(30)
    }

    const response = await request(URL_PADRAO)
      .post('/message')
      .send(novoPost)

    expect(response.body.remetente).not.toBe(novoPost.remetente)
    expect(response.status).toBe(200)
    expect(response.body.conteudo).toBe(novoPost.conteudo)
  })
  it('deveria me retornar todas as mensagens', async () => {
    const response = await request(URL_PADRAO).get('/message')
    expect(response.body).toBeInstanceOf(Array)
    expect(response.status).toBe(200)
  })
  it('deveria me retornar a mensagem com o respectivo ID', async () => {
    const response = await request(URL_PADRAO).get(`/message/${3}`)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body.id).toBeDefined()
    expect(response.body.conteudo).toBeDefined()
    expect(response.body.remetente).toBeDefined()
    expect(response.status).toBe(200)
  })
})
