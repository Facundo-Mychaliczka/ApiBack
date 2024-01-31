import { sendEmail } from "../mailer/mailer";
import User, { UserInterface } from "../models/user.model"


export const emailExist = async (email:string): Promise<void> => {

    const emailExist: UserInterface | null = await User.findOne({email});

    if (emailExist && emailExist.verified) {
        throw new Error(`El correo ${email} ya está registrado`)
    }
    if (emailExist && !emailExist.verified) {
        await sendEmail(email, emailExist.code as string)
        throw new Error(`Usuario ya registrado, se envió nuevamente el código de verificación a ${email}`)
    }
};