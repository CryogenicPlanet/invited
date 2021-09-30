import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { isValidToken } from '@utils/token'

const prisma = new PrismaClient()

/**
 * @apiDefine whitelist Whitelist
 *    Handling direct interaction with the whitelist
 */

/**
 * @api {post} api/whitelist Update Whitelist
 * @apiDescription Update whitelist with emails
 * @apiGroup whitelist
 * @apiPermission private
 * @apiUse private
 *
 * @apiParam {String[]} emails The list of emails to add to the whitelist
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const emails = req.body.emails as string[] | undefined

  const apiToken = req.headers.apiToken || req.body.apiToken
  try {
    isValidToken(apiToken)

    if (!emails) {
      res.status(400).send('No Emails found')
      return
    }

    await prisma.whitelist.createMany({
      data: emails.map((email) => ({
        Project: { connect: { apiToken } },
        email
      }))
    })

    res.status(200).send('Ok')
    return
  } catch (err) {
    res.status(400).json({ err })
  }
}

export default handler
