import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { isValidToken } from '@utils/token'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiToken = req.headers.apiToken || req.body.apiToken

  const redirectUrl = req.body.redirectUrl

  try {
    isValidToken(apiToken)

    if (redirectUrl) {
      await prisma.project.update({
        where: { apiToken },
        data: { redirectUrl }
      })
    }
    res.status(200).send('Ok')
  } catch (err) {
    res.status(400).json({ err })
  }
}

export default handler
