import { array, object } from 'joi'
import { nullableString, requiredString } from '../schemaHelper'

const UserSchema = object({
    _id: requiredString,
})

export const ProjectRequestSchema = object({
  name: requiredString.min(1).max(255),
  address: requiredString.min(1).max(255),
  postcode: requiredString.min(1).max(255),
  clientIds: array().items(UserSchema).optional(),
  employeeIds: array().items(UserSchema).optional()
}).required()

// export const updateRequestSchema = object({
//   firstName: nullableString.min(1).max(255),
//   lastName: nullableString.min(1).max(255),
//   password: nullableString.min(1).max(255),
//   email: nullableString.min(1).max(255),
//   dob: nullableString.min(1).max(255),
//   roles: array().items(UserSchema)

// }).required()

