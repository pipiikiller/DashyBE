import { IProject, ProjectDocument } from "../models/project.model";
import { BaseService, IPager } from "./BaseService";

class ProjectService implements BaseService<ProjectDocument>{
    create = async (payload: any): Promise<ProjectDocument> => {

        return 
    };

    findAll = async (pager: IPager): Promise<[ProjectDocument]> => {
        return 
    }
    find = (id: String): Promise<ProjectDocument> => {
        return 
    }
    update= (id: String, payload: any) :Promise<ProjectDocument> => {
        return 
    }
    delete= (id: String) :void => {

    };


}

export default ProjectService