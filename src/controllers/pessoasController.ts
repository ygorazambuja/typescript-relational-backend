import { Request, Response, response } from 'express'
import { genSaltSync, hashSync } from 'bcryptjs'
import knexInstance from '../configs/db'
import * as Knex from 'knex'

const encryptPassword = password => {
  return hashSync(password, genSaltSync(10))
}
export async function Adiciona (request: Request, response: Response) {
  const pessoa = { ...request.body }

  if (!pessoa.nome) {
    return response.status(400).send({ error: 'Nome Vazio' })
  }

  if (!pessoa.confirmPassword) {
    return response
      .status(400)
      .send({ error: 'Confirmação de Senha não presente' })
  }

  if (!(pessoa.password === pessoa.confirmPassword)) {
    return response.status(401).send({ error: 'Senhas não conferem' })
  }

  pessoa.password = encryptPassword(pessoa.password)
  delete pessoa.confirmPassword

  return knexInstance('pessoas')
    .insert(pessoa)
    .then(() => response.status(200).send(pessoa))
    .catch(err => response.status(400).send({ error: err }))
}
export async function BuscaTodos (request: Request, response: Response) {
  const pessoas = await knexInstance('pessoas').select()

  if (!pessoas) return response.status(204).send({})

  return response.status(200).send(pessoas)
}
export async function remove (request: Request, response: Response) {
  const { id } = request.params

  const linhasDeletadas = await knexInstance('pessoas')
    .where({ id: id })
    .del()

  if (linhasDeletadas) {
    return response.status(204).send({})
  } else {
    return response.status(400).send({})
  }
}
