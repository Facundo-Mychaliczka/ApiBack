import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import User, { UserInterface } from "../models/user.model"

const jwtValidate = async (req:Request, res: Response, next: NextFunction) => {
    const token = req.headers["xtoken"] as string

    if (!token) {
        res.status(401).json({
            msg: "Falta el campo xtoken en la petición."
        })
        return
    }

    try {
        const clave = process.env.JWTPASS as string;
        const payload = jwt.verify(token, clave) as JwtPayload;
        const {id} = payload
        
        const userConfirmed: UserInterface | null = await User.findById(id)

        if (!userConfirmed) {
            res.status(404).json({
                msg: "Usuario no encontrado en la DB"
            });
            return
        }

        req.body.userConfirmed = userConfirmed

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Falta el campo x-token en la petición."
        });


    }

}

export default jwtValidate