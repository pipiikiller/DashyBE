import jwt from 'jsonwebtoken'
import HttpException from '../exceptions/HttpException'

import authService from '../services/auth'

//TODO this middleware should be in the module.
export const authenticated = async (req, res, next) => {

  // const accessToken = req.headers['x-access-token'] as string
  // const refreshToken = req.headers['x-refresh-token'] as string

  try {
    const token = req.headers['Authorization'] as string
    const accessToken = token.substring(7)
  
    req.auth = authService.verifyAccessToken(accessToken)
  } catch (_) {

    next()
  }
}

export const refreshToken = async (req, res, next) => {
  const refreshToken = req.headers['x-refresh-token'] as string

  try {
    /**
     * Attempting to refresh token & refresh-token
     */
    const newTokens = await authService.refreshTokens(refreshToken)

    req.auth = jwt.decode(newTokens.accessToken)

    res.setHeader('x-access-token', newTokens.accessToken)
    res.setHeader('x-refresh-token', newTokens.refreshToken)
  } catch (error) {
     next(new AuthenticationError(error))
  }

}

export class AuthenticationError extends HttpException {
  constructor(error?: Error) {
    super(401, 'Authentication failed')

    console.warn(error)
  }
}

export default {
  authenticated,
  refreshToken
}
