import mongoose, { model } from "mongoose";
import { IUser } from "./user.model";

const strDefaultRequired = {
    type: String,
    required: true,
    trim: true,
    minLength:1,
    maxLength:1
}
export const ProjectSchema = new mongoose.Schema({
    name: strDefaultRequired,
    address: strDefaultRequired,
    postcode: strDefaultRequired,
    clientIds: [String],
    employeesIds: [String]
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

export interface IProject {
    name: String,
    address: String,
    postcode: String
    clientIds?: [String],
    employeesIds?: [String],
    clients: [IUser],
    employees: [IUser]
}

export interface ProjectDocument extends IProject, mongoose.Document {
    createdAt: Date,
    updatedAt: Date
}

export default model<ProjectDocument>('Projects', ProjectSchema)