import { NextFunction, Request, Response } from 'express'

import HttpException from '../exceptions/HttpException'
import { logger } from '../utils/logger'

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = error.response?.status || error.status
    const message = error.response?.data || error.message || null

    logger.error(error)
    res.status(status).json({ message })
  } catch (error) {
    next(error)
  }
}

export default errorMiddleware
