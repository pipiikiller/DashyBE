import mongoose, { model } from "mongoose";
import bcrypt from 'bcrypt';
import { array } from "joi";

export enum ROLES {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength:1,
        maxLength: 255,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength:1,
        maxLength: 255,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },

    password: {
        type: String,
        trim: true,
        hide: true,
        select: false
    },
    dob: {
        type: String,
        required: true,
        match: /^\d{2}-\d{2}-\d{4}$/
    },
    roles: [
        {
            type: String,
            enum: ROLES
        }
    ]
        
},{
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

export interface IUser {
    firstName: String,
    lastName: String,
    password: String,
    email: String
    dob: String,
    roles: ['CLIENT' | 'CARER' | 'ADMIN']

}

export interface UserDocument extends IUser, mongoose.Document {
    createdAt: Date,
    updatedAt: Date
    comparePassword(password: String): Promise<boolean>
}

UserSchema.pre('save', async function(this:UserDocument, next) {
    if(!this.isModified("password")) return next()

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hashSync(this.password, salt)

    this.password = hash;

    return next()
})

UserSchema.methods.comparePassword = async function (password:String) {
    const user = this as UserDocument

    return bcrypt.compare(password, user.password).catch((e)=> false)
}

export default model<UserDocument>('Users', UserSchema);