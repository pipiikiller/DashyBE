import { array, object } from 'joi'
import { nullableString, requiredString } from '../schemaHelper'

export const AddUserRequestSchema = object({
  firstName: requiredString.min(1).max(255),
  lastName: requiredString.min(1).max(255),
  password: requiredString.min(1).max(255),
  email: requiredString.min(1).max(255),
  dob: requiredString.min(1).max(255),
  roles: array().default(["USER"])

}).required()

export const UpdateUserRequestSchema = object({
  firstName: nullableString.min(1).max(255),
  lastName: nullableString.min(1).max(255),
  password: nullableString.min(1).max(255),
  email: nullableString.min(1).max(255),
  dob: nullableString.min(1).max(255),
  roles: array()

}).required()
