import crypto from 'crypto-js'

export async function Encrypt (mensagem: string): Promise<string> {
  const cypher = await crypto.AES.encrypt(
    mensagem,
    process.env.AUTH_SECRET
  ).toString()
  return cypher
}

export function Decrypt (mensagem): string {
  const bytes = crypto.AES.decrypt(mensagem, process.env.AUTH_SECRET)
  const originalText = bytes.toString(crypto.enc.Utf8)
  return originalText
}
