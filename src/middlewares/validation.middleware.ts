import { string } from 'joi'
import { ObjectSchema } from 'joi'
import ValidationException from '../exceptions/ValidationException'
import { logger } from '../utils/logger'


export const validateRequestBody = <T>(schema: ObjectSchema<T>) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      stripUnknown: true
    })

    if (error) {
      return next(new ValidationException(error))
    }

    req.body = value as T

    next()
  }
}

export const isValidSchema = <T>(schema: ObjectSchema<T>, payload: any) => {
  const { error } = schema.validate(payload, {
    stripUnknown: true
  })

  if (error) {
    logger.error(error?.message)
    throw error
  }

  return true
}

export const validateRequestQuery = <T>(schema: ObjectSchema<T>) => {
  return async (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      stripUnknown: true
    })

    if (error) {
      return next(new ValidationException(error))
    }

    req.query = value as T

    next()
  }
}

export const nullableString = string().trim()

export const requiredString = string().trim().required()

