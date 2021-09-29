import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { isValidToken } from '@utils/token'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email as string | undefined

  const apiToken =
    req.headers.apiToken || req.body.apiToken || req.query.apiToken
  try {
    isValidToken(apiToken)

    if (!email) {
      res.status(400).send('No Email sent')
      return
    }

    const valid = await prisma.project.findUnique({
      where: { apiToken },
      include: { whitelist: { where: { email } } }
    })

    if (valid?.whitelist[0].email === email) {
      res.status(200).send('Ok')
      return
    }
  } catch (err) {
    res.status(400).json({ err })
  }
}

export default handler
