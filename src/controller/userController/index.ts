import { Request, Response } from "express";
import { UserService } from "../../service/userService";




export class UserController{

    async createController(req: Request, res: Response){

        const { name, email, password } = req.body

        const userService = new UserService()
        
        const user = await userService.createUser({ name, email, password })
        res.status(201).json({
            createdUser: user
        })

        return;
    }
}