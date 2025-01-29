import { Router } from "express";
import { MenssageController } from "../../controller/messageController";
import { passport } from "../../middleware/passport";

const menssageRoute = Router();

menssageRoute.post(
  "/conect/wahtsapp",
  passport.authenticate("jwt", { session: false }),
  new MenssageController().handleConect
);

menssageRoute.post(
  "/make/wahtsapp",
  passport.authenticate("jwt", { session: false }),
  new MenssageController().handleMakeMessages
);

menssageRoute.post(
  "/send/wahtsapp",
  passport.authenticate("jwt", { session: false }),
  new MenssageController().handleSendMessages
);

export { menssageRoute };
