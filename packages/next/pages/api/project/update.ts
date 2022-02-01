import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { isValidToken } from '@utils/token'

const prisma = new PrismaClient()

/**
 * @api {post} api/project/update Update Project
 * @apiDescription Update params of the project
 * @apiGroup project
 * @apiPermission private
 *
 * @apiParam {String} redirectUrl Update a redirect url (optional)
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiToken = req.headers['api-token'] || req.body.apiToken

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
