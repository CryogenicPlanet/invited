import jwt from 'jsonwebtoken'

type Payload = { projectId: string }

const createProjectJWT = (projectId: string) => {
  return jwt.sign({ projectId }, process.env.JWT_SECRET || '')
}

const verifyJWT = (token: string | string[] | undefined): Payload => {
  try {
    if (token && typeof token === 'string') {
      const payload = jwt.verify(token, process.env.JWT_SECRET || '') as Payload
      return payload
    } else {
      throw new Error('Invalid token')
    }
  } catch (err) {
    throw new Error(err)
  }
}

export { createProjectJWT, verifyJWT }
