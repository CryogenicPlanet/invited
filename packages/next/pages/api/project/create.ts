import { NextApiRequest, NextApiResponse } from 'next'
import { generateSlug } from 'random-word-slugs'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const projectName = req.body.projectName
  const email = req.body.owner

  if (!projectName || !email) {
    res.status(400).send('No project name')
  }

  const apiToken = generateSlug(8)

  await prisma.project.create({
    data: {
      projectName,
      apiToken,
      owner: { connectOrCreate: { where: { email }, create: { email } } }
    }
  })
}
export default handler
