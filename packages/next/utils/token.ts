export const isValidToken = (token: string | string[] | undefined) => {
  if (!token) {
    throw new Error('No token')
  } else if (typeof token !== 'string') {
    throw new Error('Invalid token type')
  }
}
