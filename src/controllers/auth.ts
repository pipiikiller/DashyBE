import * as express from "express";
import { NextFunction, Request, Response } from "express";
import authService from '../services/auth';

class AuthenticationController {
    public path = "/api/auth";
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post('/authenticate', this.authenticate);
    }

    authenticate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accessCode, apiKey } = req.body
            const token = await authService.signIn(accessCode, apiKey)

            res.json(token)
        } catch (error) {
            next(error);
        }
    }

}

export default AuthenticationController;

