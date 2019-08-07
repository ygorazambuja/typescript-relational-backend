import { Request, Response } from 'express'
import knexInstance from '../configs/db'

export async function adicionaComentario (request: Request, response: Response) {
  const { postId, conteudo } = request.body

  knexInstance('comentarios')
    .insert({ postId, conteudo })
    .then(_ => {
      return response.status(204).send({})
    })
    .catch(err => {
      return response.status(400).send({ err })
    })
}

export async function getComentariosDoPost (
  request: Request,
  response: Response
) {
  const postId = request.params.id

  knexInstance('comentarios')
    .select('conteudo')
    .where({ postId: postId })
    .then(result => {
      if (!result) return response.status(401).send({})
      return response.status(200).send(result)
    })
    .catch(err => {
      return response.status(500).send({ err })
    })
}
