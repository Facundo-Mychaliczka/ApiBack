import { Request, Response } from "express"
import User, { UserInterface } from "../models/user.model"
import bcryptjs from "bcryptjs"
import randomstring from "randomstring"
import { sendEmail } from "../mailer/mailer"
import { jwtGenerate } from "../helpers/jwtGenerate"

export const register = async (req: Request, res: Response) =>{
    const {nombre, email, password }: UserInterface = req.body

    const user = new User({nombre, email, password});

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    const newCode = randomstring.generate(7);

    user.code = newCode

    await user.save();

    await sendEmail(email, newCode)

    res.status(201).json({
        user
    })
    
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password}: UserInterface = req.body

    try {
        const user = await User.findOne({email})
        if (!user) {
            res.status(404).json({
                msg: "No se encontró el usuario."
            });
            return;
        };

        const passwordValidate = bcryptjs.compareSync(password, user.password)

        if (!passwordValidate) {
            res.status(401).json({
                msg: "Contraseña incorrecta."
            });
            return;
        };

        const token = await jwtGenerate(user.id)


        res.status(202).json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor."
        })
    }
}


export const verifyUser = async (req: Request, res: Response) => {

    const {email, code} = req.body

    try {
        const user = await User.findOne({email})
        if (!user) {
            res.status(404).json({
                msg: "No se encontró el usuario."
            });
            return;
        }
        if (user.verified) {
            res.status(400).json({
                msg: "Usuario ya verificado."
            })
            return;
        }
        if (code !== user.code) {
            res.status(401).json({
                msg: "Codigo ingresado incorrecto."
            })
            return
        }

        await User.findOneAndUpdate(
            {email},
            {verified: true}
        );

        res.status(200).json({
            msg: "Usuario verificado correctamente.",
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor."
        })
        
    }

}