import { NextApiRequest, NextApiResponse } from 'next'
import { generateSlug } from 'random-word-slugs'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * @apiDefine project Project
 *    Handling requests  to project
 */

/**
 * @api {post} api/project/create Create Project
 * @apiDescription Creating Project
 * @apiGroup project
 * @apiPermission public
 *
 * @apiParam {String} projectName The project name
 * @apiParam {String} email Email of the owner
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const projectName = req.body.projectName
  const email = req.body.email

  if (!projectName || !email) {
    res.status(400).send('No project name')
    return
  }

  const apiToken = generateSlug(8)

  try {
    await prisma.project.create({
      data: {
        projectName,
        apiToken,
        owner: { connectOrCreate: { where: { email }, create: { email } } }
      }
    })
    res.status(200).send('Ok')
  } catch (err) {
    res.status(500).json({ err })
  }
}
export default handler
