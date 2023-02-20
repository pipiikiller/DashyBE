import express from "express";
import authMiddleware from '../middlewares/auth'
import { paginationSchema } from "../schemas/pagination.request.schema";
import { validateRequestBody, validateRequestQuery } from "../middlewares/validation.middleware";
import { ProjectRequestSchema } from "../schemas/projects/project.requests.schema";


class ProjectController {

    public path = "api/v1/projects";
    public router = express.Router()

    constructor(){
        this.initRoutes()
    }

    public initRoutes(){
        this.router.get('/', [authMiddleware.authenticated, validateRequestQuery(paginationSchema)],this.getAll);
        this.router.get('/:id', authMiddleware.authenticated, this.getById);
        this.router.post('/', [validateRequestBody(ProjectRequestSchema), authMiddleware.authenticated], this.createProject);
        this.router.patch('/:id', [validateRequestBody(ProjectRequestSchema), authMiddleware.authenticated], this.updateProject);
        this.router.delete('/:id',authMiddleware.authenticated, this.deleteProject);
    }

    getAll = async (req: any, res: any, next: any) => {
        throw new Error("Method not implemented.");
    }

    getById = async (req: any, res: any, next: any) => {
        throw new Error("Method not implemented.");
    }

    createProject = async (req: any, res: any, next: any) => {
        throw new Error("Method not implemented.");
    }

    updateProject = async (req: any, res: any, next: any) => {
        throw new Error("Method not implemented.");
    }

    deleteProject = async (req: any, res: any, next: any) => {
        throw new Error("Method not implemented.");
    }
}


export default ProjectController;