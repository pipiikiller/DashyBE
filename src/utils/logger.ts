import winston from 'winston'
import expressWinston from 'express-winston'

const isProduction = process.env.NODE_ENV === 'production'

const transports: winston.transport[] = [new winston.transports.Console()]
const options = {
  transports
}

/**
 * All-purpose logger
 */
export const logger = winston.createLogger(options)

/**
 * Express request logger
 */
export const requestLogger = () => {
  return expressWinston.logger(options)
}
/**
 * Express error logger
 */
export const errorLogger = () => {
  return expressWinston.errorLogger(options)
}
