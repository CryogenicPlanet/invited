import { NextApiRequest, NextApiResponse } from 'next'
import { generateSlug } from 'random-word-slugs'

import { PrismaClient } from '@prisma/client'
import { isValidToken } from '@utils/token'

const prisma = new PrismaClient()

/**
 * @api {get} api/invite/createMulti Create an Invite (Get)
 * @apiDescription Create a new Invite and return a slug
 *
 * If you are using get, don't send a param (duh)
 *
 * @apiGroup invite
 * @apiPermission private
 *
 * @apiParam  {String} prefix Name prefix
 *
 * @apiParam  {Number} uses Number of uses
 *
 * @apiSuccess {String} slug Returns a slug
 *
 */

/**
 * @api {post} api/invite/createMulti Create an Invite (Post)
 * @apiDescription Create a new Invite and return a slug
 *
 * if you are using post, don't send a query (duh)
 *
 * @apiGroup invite
 * @apiPermission private
 *
 * @apiParam  {String} prefix Name prefix
 *
 * @apiParam  {Number} uses Number of uses
 *
 * @apiSuccess {String} slug Returns a slug
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiToken =
    req.headers.apiToken || req.body.apiToken || req.query.apiToken

  const prefix = req.body.prefix || req.query.prefix

  const uses = parseInt((req.body.uses || req.query.uses) as string)

  console.log({ apiToken, prefix, uses })

  try {
    isValidToken(apiToken)

    if (!uses || !prefix) {
      res.status(400).json({ msg: 'Bad request, invalid props' })
    }

    const slug = `${prefix}-${generateSlug(2)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`

    console.log({ slug })

    await prisma.project.update({
      where: { apiToken },
      data: {
        InviteLinks: {
          create: {
            slug,
            remaining: uses
          }
        }
      }
    })

    res.status(200).json({ slug })
  } catch (err) {
    console.log(err)
    res.status(400).json({ err })
  }
}

export default handler
