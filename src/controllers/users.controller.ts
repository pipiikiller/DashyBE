import * as express from "express";
import { Request, Response } from "express";
import { validateRequestBody, validateRequestQuery } from "../middlewares/validation.middleware";
import { UpdateUserRequestSchema, AddUserRequestSchema } from "../schemas/users/user.requests.schema";
import { createUserLimiter } from "../middlewares/rateLimiter";
import { paginationSchema } from "../schemas/pagination.request.schema";
import { UserService } from "../services/users.services"
import authMiddleware from '../middlewares/auth'
import { loginUserSchema } from "../schemas/users/loginUser.request.schema";


class UserDataController {
  public path = "/api/v1/users";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/', [authMiddleware.authenticated,validateRequestQuery(paginationSchema)],this.getAll);
    this.router.get('/:id', authMiddleware.authenticated, this.getById);
    this.router.post('/', [validateRequestBody(AddUserRequestSchema), createUserLimiter, authMiddleware.authenticated], this.createUser);
    // this.router.post('/', [validateRequestBody(userRequestSchema), createUserLimiter], this.createUser);
    this.router.post('/login', [validateRequestBody(loginUserSchema)], this.loginUser);
    this.router.patch('/:id', [validateRequestBody(UpdateUserRequestSchema), createUserLimiter, authMiddleware.authenticated], this.updateUser);
    this.router.delete('/:id',authMiddleware.authenticated, this.deleteUser);
  }

  getAll = async (req: Request, res: Response) => {

    try {

      const users = await UserService.findAllUsers(req.query)

      res.json(users);
    } catch (error) {
      res.json(error)
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const users = await UserService.findUserById(id)

      res.json(users);
    } catch (error) {
      res.json(error)
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const payload = req.body
      const token = await UserService.loginUser({
        email: payload.email,
        password: payload.password
      })

      res.json(
        {
          accessToken : token.accessToken,
          refreshToken: token.refreshToken
        }
      )
    } catch (error) {
      res.json(error)
    }
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const payload = req.body
      const user = await UserService.createUser(payload)

      res.json(user);
    } catch (error) {
      res.json(error)
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const payload = req.body
      const id = req.params.id
      const user = await UserService.updateUser(id, payload)

      res.json(user);
    } catch (error) {
      res.json(error)
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const payload = req.params.id
      const deleted = await UserService.deleteUser(payload)

      res.json({
        deleted
      });
    } catch (error) {
      res.json(error)
    }

    return 
  };
}

export default UserDataController;

