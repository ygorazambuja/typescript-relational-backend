import { Request, Response } from 'express'
import knexInstance from '../configs/db'

import postInterface from '../interfaces/postInterface'

export async function create (request: Request, response: Response) {
  const { pessoaId, titulo, conteudo } = request.body
  const post = {
    pessoaId: pessoaId,
    titulo: titulo,
    conteudo: conteudo
  }
  // ta rolando algum bug nas horas ai, não sei se é no postgres ou js
  knexInstance('posts')
    .insert(post)
    .then(_ => {
      return response.status(204).send({})
    })
    .catch(err => {
      return response.status(500).send({ err })
    })
}
export async function listaTodos (request: Request, response: Response) {
  const Posts = await knexInstance('posts').select('*')

  return response.status(200).send(Posts)
}
export async function remove (request: Request, response: Response) {
  const linhasDeletadas = knexInstance('posts')
    .where({ id: request.body.id })
    .del()

  if (!linhasDeletadas) {
    return response.status(400).send({})
  } else {
    return response.status(204).send({})
  }
}

export async function listaPostsDoUsuario (
  request: Request,
  response: Response
) {
  const { id } = request.params

  knexInstance('posts')
    .select('*')
    .where({ pessoaId: id })
    .then(result => {
      return response.status(200).send(result)
    })
    .catch(err => {
      return response.status(500).send({ err })
    })
}
