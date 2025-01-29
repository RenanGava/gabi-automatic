import { Passport } from "passport";
import { configPassPortLocal } from "../Config/Passport/PassportLocal";
import { configPassPortJWT } from "../Config/Passport/PassportJWT";


const passport = new Passport();



// metodo login para gerar jwt
passport.use(configPassPortLocal);

// metodo jwt
passport.use(configPassPortJWT);

export { passport };
