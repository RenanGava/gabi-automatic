import { Router } from "express";
import { MenssageController } from "../../controller/messageController";
import { passport } from "../../middleware/passport";

const menssageRoute = Router();

menssageRoute.get(
  "/conect/wahtsapp",
  passport.authenticate("jwt", { session: false }),
  new MenssageController().handleConect
);

menssageRoute.get(
  "/make/wahtsapp",
  passport.authenticate("jwt", { session: false }),
  new MenssageController().handleMakeMessages
);

menssageRoute.get(
  "/send/wahtsapp",
  passport.authenticate("jwt", { session: false }),
  new MenssageController().handleSendMessages
);

export { menssageRoute };
