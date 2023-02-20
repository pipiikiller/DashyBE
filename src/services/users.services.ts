import { FilterQuery } from "mongoose";
import Users, { IUser, ROLES, UserDocument } from "../models/user.model";
import { logger } from "../utils/logger";
import { createTokens } from "./auth";

export type IUpdateUser = Pick<IUser, 'firstName' | 'lastName' | 'dob'>;

export namespace UserService {

  interface IPager {
    start?: number,
    limit?: number
  }
  
  const userSelectors = {
    id: true,
    firstName: true,
    lastName: true,
    dob: true,
    createdAt: true,
    updatedAt: true
  }
  
  export const createUser = async (createUserPayload: Readonly<IUser>) => {
    try {
  
        return Users.create(createUserPayload)
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  export const findUser = async (query: FilterQuery<UserDocument>, 
    options, withPassword = false) => {
      if(withPassword){
        return Users.findOne(query, null, options).select('+password')
      }
    return Users.findOne(query, null, options)
  }

  export const loginUser =async ({
    email,
    password
  }:{
    email: UserDocument['email'],
    password: UserDocument['password'],
  }) => {
    const user = await findUser({email}, {lean: false}, true)

    if(!user) {
      throw new Error('User does not exist')
    }

    const authenticated = await user.comparePassword(password)

    if(authenticated){
      return createTokens(user)
    }
  }

  export const findAllUsers = async (pager: IPager) => {
  
    try {
      
      const users = await Users.find({}).sort('-createdAt')
  
      if(!users){
        throw new Error('error finding users')
      }
  
      return users
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
  
  export const findUserById = async (id: Readonly<string>) => {
  
    try {
      const user = await findUser({id}, {lean: true}, false)
    
      if(!user){
        throw new Error('error finding a user')
      }
    
      return user
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
  
  // type IUpdateUser = Pick<ICreateUser, 'firstName' | 'lastName' | 'occupation' | 'age'>;
  
  export const updateUser = async (id: string, updateUserPayload: IUpdateUser) => {
  
    try {
      
      const user = await Users.findOneAndUpdate({
        _id: id
      }, updateUserPayload)
    
      if(!user){
        throw new Error('error finding a user')
      }
    
      return user
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  export const deleteUser = async (id: string) => {
    try {
      const deleted = await Users.deleteOne({
        _id: id
      })

      if(deleted){
        return true
      }
      return false
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
}

