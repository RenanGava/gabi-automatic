import * as PassportJWT from "passport-jwt";

const JWTStrategy = PassportJWT.Strategy;
const ExtractJwt = PassportJWT.ExtractJwt;

const ExtractJwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const configPassPortJWT = new JWTStrategy(
  { ...ExtractJwtOptions},
  (payload, done) => {
    done(false, payload)
  }
);
