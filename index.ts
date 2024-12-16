import express from "express";
import cors from "cors";
import { fileRouter } from "./src/routes/file";
import { AuthRouter } from "./src/routes/auth";
import { config } from "dotenv";
import { menssageRoute } from "./src/routes/messages";



const app = express();
config();

app.use(express.json());
app.use(cors());


//file routes
app.use("/file", fileRouter);
// auth routes
app.use("/auth", AuthRouter);
// WaWeb routes
app.use("/wweb", menssageRoute);

app.listen(3000, () => {
  console.log(`Server Is Running Port: ${3000}`);
});
