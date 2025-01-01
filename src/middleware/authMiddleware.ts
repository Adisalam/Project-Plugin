import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface UserData {
    id: string;
    name: string
}

interface ValidationRequest extends Request {
    userData: UserData;
}

const accesValidation = (req: Request, res: Response, next: NextFunction) => {

    const validationReq = req as ValidationRequest;
    const {authorization} = validationReq.headers;


    if(!authorization) {
        return res.status(401).json({
            message: "token diperlukan"
        })
    }
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET!;

    try{
        const jwtDecode = jwt.verify(token, secret);

        if(typeof jwtDecode !== "string"){
            validationReq.userData = jwtDecode as UserData;
        }
        
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    next()
}

export default accesValidation;