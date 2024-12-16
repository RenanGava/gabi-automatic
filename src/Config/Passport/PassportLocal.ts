import * as PassportLocal from "passport-local";
import { prisma } from "../../prisma/prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

const LocalStrategy = PassportLocal.Strategy;

export const configPassPortLocal = new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
  
      const user = await prisma.user.findUnique({
        where:{
          email
        },
      })
      if(!user){
        return done(undefined, false, {message: "User Not Exist!"})
      }

      const verifyPassword = await compare(password, user.password)

      
      if(verifyPassword){

        const userData = {
          id: user.id,
          name: user.name,
          email: user.email
        }
        return done(undefined, {
          userData,
          token: sign(userData, process.env.JWT_SECRET, {
            expiresIn: '1h'
          })
        })
      }
      return done(undefined, false, {message: "User or Password incorrect!"})

    }
  )