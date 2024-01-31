import { NextFunction, Request, Response } from "express";

export const isVerified = (req: Request, res: Response, next: NextFunction) => {

    const { verified } = req.body.userConfirmed;
    

    if (!verified) {
        res.status(401).json({
            msg: "El usuario no está verificado."
        })
        return
    }

    next();
}