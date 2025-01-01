import express, {Router} from "express";
import { loginUser } from "../controllers/loginController";

const loginRouter = Router();

loginRouter.post("/", loginUser);

export default loginRouter;
