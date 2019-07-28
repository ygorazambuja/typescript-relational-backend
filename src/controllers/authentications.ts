import { Request, Response } from 'express'
import { compareSync } from 'bcryptjs'
import { encode, decode } from 'jwt-simple'
import knexInstance from '../configs/db'
const { authSecret } = require('../../.env')

export async function signin (req: Request, res: Response) {
  const { email, password } = req.body

  const pessoa = await knexInstance('pessoas')
    .select()
    .where('email', email)
    .first()

  if (!pessoa) return res.status(400).send('Usuário não encontrado')

  const isMatch = compareSync(password, pessoa.password)

  if (!isMatch) return res.status(401).send({ error: 'Email/Senha inválidos' })

  const now = Math.floor(Date.now() / 100)

  const payload = {
    id: pessoa.id,
    nome: pessoa.nome,
    email: pessoa.email,
    iat: now,
    exp: now + 60 * 60 * 24 * 3
  }

  return res.json({
    ...payload,
    token: encode(payload, authSecret)
  })
}
