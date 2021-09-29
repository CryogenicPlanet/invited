import { NextApiRequest, NextApiResponse } from 'next'
import { generateSlug } from 'random-word-slugs'

import { PrismaClient } from '@prisma/client'
import { isValidToken } from '@utils/token'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiToken =
    req.headers.apiToken || req.body.apiToken || req.query.apiToken
  try {
    isValidToken(apiToken)

    const slug = `${generateSlug()}-${Math.floor(1000 + Math.random() * 9000)}`

    await prisma.project.update({
      where: { apiToken },
      data: {
        InviteLinks: {
          create: {
            slug
          }
        }
      }
    })

    res.status(200).json({ slug })
  } catch (err) {
    res.status(400).json({ err })
  }
}

export default handler
