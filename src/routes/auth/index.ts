import { Router } from "express";
import { passport } from "../../middleware/passport";
import { UserController } from "../../controller/userController";

const AuthRouter = Router();

AuthRouter.get('/', passport.authenticate('local', { session: false }), (req, res) =>{
    res.json(req.user)
    return
});

AuthRouter.post(
  "/create/user",
  new UserController().createController
);

export { AuthRouter };
