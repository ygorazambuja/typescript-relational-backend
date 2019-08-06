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
