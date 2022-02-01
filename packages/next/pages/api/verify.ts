import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { isValidToken } from '@utils/token'

const prisma = new PrismaClient()

/**
 * @apiDefine private Private
 *
 *
 * Access to this api is private. It needs a token
 *
 * @apiHeader {String} apiToken The apiToken.
 * @apiParam {String} apiToken The apiToken.
 * @apiQuery {String} apiToken The apiToken.
 *
 * @apiError Unauthorized Not allowed to use this api
 */

/**
 * @apiDefine verify Verify
 *    Verifying User in Whitelist
 */

/**
 * @api {get} api/verify Verify (Get)
 * @apiDescription Check if someone has been invited to a project
 *
 * If you are using get, don't send a param (duh)
 *
 * @apiGroup verify
 * @apiPermission private
 * @apiUse private
 *
 * @apiQuery {String} email The email that should be verified
 */

/**
 * @api {post} api/verify Verify (Post)
 * @apiDescription Check if someone has been invited to a project
 *
 * if you are using post, don't send a query (duh)
 *
 * @apiGroup verify
 * @apiPermission private
 * @apiUse private
 *
 * @apiParam {String} email The email that should be verified
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = (req.body.email || req.query.email) as string | undefined

  const apiToken =
    req.headers['api-token'] || req.body.apiToken || req.query.apiToken
  try {
    isValidToken(apiToken)

    if (!email) {
      res.status(400).send('No Email sent')
      return
    }
    const domainRegex = /@(\w+.*)/.exec(email)

    const domain = domainRegex ? domainRegex[0].slice(1) : null

    const valid = await prisma.project.findUnique({
      where: { apiToken },
      include: { whitelist: { where: { OR: [{ email }, { domain: domain }] } } }
    })

    if (
      valid &&
      (valid?.whitelist[0].email === email ||
        valid.whitelist[0].domain === domain)
    ) {
      res.status(200).send('Ok')
      return
    }
  } catch (err) {
    res.status(400).json({ err })
  }
}

export default handler
