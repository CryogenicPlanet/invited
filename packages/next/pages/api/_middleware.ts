import type { NextRequest } from 'next/server'

import { isPreflight } from '@utils/preflight'

export function middleware(req: NextRequest) {
  if (isPreflight(req.method)) {
    return new Response('Ok')
  }
}
