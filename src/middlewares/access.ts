import HttpException from '../exceptions/HttpException'
import { NextFunction, Request, Response } from 'express'

const ACCESS_CODE = process.env.ACCESS_CODE

const access = () => (req: Request, res: Response, next: NextFunction) => {

  const session = req.get('x-accesscode')
  const apiKey = req.get('x-api-key')


  if (session === ACCESS_CODE) {
    next()
  } else {
    next(new HttpException(404, 'Access denied'))
  }
}

export default access
