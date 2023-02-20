import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import path from 'path'
import App from './app'
import PingController from './controllers/ping'
import UserDataController from './controllers/users.controller'
import cors from './middlewares/cors'
import validateEnv from './utils/validateEnv'
import AuthenticationController from './controllers/auth'
import { errorLogger, requestLogger } from './utils/logger'
import errors from './middlewares/error'
import mongoose from 'mongoose'
import ProjectController from './controllers/projects.controller'

const app = new App({
  port: 8080,
  controllers: [
    new PingController(),
    new UserDataController(),
    new AuthenticationController(),
    new ProjectController()
  ],
  middleWares: [
    requestLogger(),
    errorLogger(),
    errors,
    cors(),
    express.static(path.join(__dirname, 'build')),
    express.json(),
    express.urlencoded({ extended: true }),
  ],
});

mongoose.connect('mongodb://localhost:27017/dashy-mongo', () => {
  console.log('Connected to mongo db')
})


validateEnv()
app.listen()