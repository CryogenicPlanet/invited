import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.body.slug as string
  const email = req.body.email as string

  if (!slug || !email) {
    res.status(400).send('No slug sent')
    return
  }

  const valid = await prisma.inviteLinks.findUnique({
    where: { slug },
    include: { project: true }
  })

  if (valid?.used === false) {
    const project = await prisma.project.update({
      where: { id: valid.project.id },
      data: {
        InviteLinks: {
          updateMany: { where: { slug, used: false }, data: { used: true } }
        },
        whitelist: { create: { email } }
      }
    })
    res.status(200).json({ url: project.redirectUrl })
  } else {
    res.status(400).send('Invalid invite, already used')
  }

  //
}

export default handler
