import { ValidationError } from 'joi'

import HttpException from './HttpException'

export class ValidationException extends HttpException {
  constructor(error: ValidationError) {
    super(422, error.message)
  }
}

export default ValidationException
