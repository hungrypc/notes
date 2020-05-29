import jwt from 'jsonwebtoken'

function generateToken(userId) {
  return jwt.sign({ userId }, 'token_secret', { expiresIn: '7 days' })
}

export { generateToken as default }