import { string } from "joi"

export const nullableString = string().trim()
export const requiredString = string().trim().required()