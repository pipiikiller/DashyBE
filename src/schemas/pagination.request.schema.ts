import { number, object } from 'joi'

export const paginationSchema = object({
  start: number().optional().min(0),
  limit: number().optional().min(1).max(200),
}).required()
