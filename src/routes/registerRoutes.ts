import express, { Router } from "express";
import { registerUser } from "../controllers/registerControllers";

const registerRouter = Router();

registerRouter.post("/", registerUser)

export default registerRouter