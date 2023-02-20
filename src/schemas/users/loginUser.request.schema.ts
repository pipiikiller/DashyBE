import { object, string } from 'joi'
const requiredString = string().trim().required()

export const loginUserSchema = object({
  email: requiredString.min(1).max(255),
  password: requiredString.min(1).max(255)
}).required()
