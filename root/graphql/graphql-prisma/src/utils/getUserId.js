import jwt from 'jsonwebtoken'

const getUserId = (request) => {
  const header = request.request.headers.authorization

  if (!header) {
    throw new Error('Authentication required')
  }

  const token = header.replace('Bearer ', '')
  const decoded = jwt.verify(token, 'token_secret')

  return decoded.userId
}

export { getUserId as default }