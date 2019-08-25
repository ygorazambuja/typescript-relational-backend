import { Request, Response } from 'express'
import { Encrypt } from '../utils/crypto'
import knexInstance from '../configs/db'

export async function PostMessage (request: Request, response: Response) {
  const conteudo = request.body.conteudo
  const remetente = request.body.remetente

  try {
    Encrypt(remetente).then(res => {
      const post = { remetente: res, conteudo: conteudo }
      knexInstance('messages')
        .insert(post)
        .then(() => {
          return response.status(200).send(post)
        })
        .catch(err => {
          return response.status(501).send(err)
        })
    })
  } catch (error) {
    return response.status(500).send(error)
  }
}

export async function GetMessages (request: Request, response: Response) {
  const Messages = await knexInstance('messages').select('*')
  return response.status(200).send(Messages)
}

export async function GetMessageById (request: Request, response: Response) {
  knexInstance('messages')
    .select('*')
    .where({ id: request.params.id })
    .then(result => {
      return response.status(200).send(result[0])
    })
    .catch(err => {
      return response.status(500).send(err)
    })
}
