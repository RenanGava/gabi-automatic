import { Router } from "express";
import { FileController } from "../../controller/fileController";
import { passport } from "../../middleware/passport";
import uploadConfig from "../../middleware/multer";
import multer from "multer";

const fileRouter = Router();

const upload = multer(uploadConfig.upload("./tmp"));

fileRouter.post(
  "/send",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  new FileController().handle
);

export { fileRouter };
