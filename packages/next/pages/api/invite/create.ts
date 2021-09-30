import { NextApiRequest, NextApiResponse } from 'next'
import { generateSlug } from 'random-word-slugs'

import { PrismaClient } from '@prisma/client'
import { isValidToken } from '@utils/token'

const prisma = new PrismaClient()

/**
 * @apiDefine invite Invite
 *    Handling requests related to the invites
 */

/**
 * @api {get} api/invite/create Create an Invite (Get)
 * @apiDescription Create a new Invite and return a slug
 *
 * If you are using get, don't send a param (duh)
 *
 * @apiGroup invite
 * @apiPermission private
 *
 * @apiSuccess {String} slug Returns a slug
 */

/**
 * @api {post} api/invite/create Create an Invite (Post)
 * @apiDescription Create a new Invite and return a slug
 *
 * if you are using post, don't send a query (duh)
 *
 * @apiGroup invite
 * @apiPermission private
 *
 * @apiSuccess {String} slug Returns a slug
 */
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
