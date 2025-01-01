import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const User = prisma.user;

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const hashesPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            data: {
                name: name,
                email: email,
                password: hashesPassword
            }
        })
        res.status(201).send({
            data: result,
            message: "User succesfully for register"
        })
    } catch (error) {
        res.status(500).send({
            message: "error register user"
        })
    }
}