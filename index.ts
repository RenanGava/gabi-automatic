import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { fileRouter } from "./src/routes/file";
import { AuthRouter } from "./src/routes/auth";
import { config } from "dotenv";
import { menssageRoute } from "./src/routes/messages";

const app = express();
config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  console.log(req.body);

  res.json(req.body);
  return;
});

//file routes
app.use("/file", fileRouter);
// auth routes
app.use("/auth", AuthRouter);
// WaWeb routes
app.use("/wweb", menssageRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // console.log(err);
    
    res.status(400).json({
      error: err.message,
    });

    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });

  next();
  return;
});

app.listen(8080, () => {
  console.log(`Server Is Running Port: ${8080}`);
});
