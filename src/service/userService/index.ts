import { User } from '@prisma/client'
import { prisma } from '../../prisma/prisma'
import { hashSync } from 'bcryptjs'


interface IUser{
    name: string,
    email: string,
    password: string
}

export class UserService{
    

    public async createUser({ name, email, password }: IUser){

        const userAlreadyExists = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("User Exists")
        }

        const createUser = await prisma.user.create({
            data:{
                name,
                email,
                password: hashSync(password, 8)
            }
        })
        return createUser
    }
}