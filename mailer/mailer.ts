import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

const password = process.env.EMAILPASS


const transporter = nodemailer.createTransport({
    service: 'gmail',
    // TUVE QUE AGREGAR EL TLS PORQUE ME TIRABA ERROR DE SELF-SIGN
    tls: {
        rejectUnauthorized: false
    },
    //----//
    auth: {
        user: 'facundomychaliczka@gmail.com',
        pass: password,
    },
    from: 'facundomychaliczka@gmail.com'
});

export const sendEmail = async (to: string, code: string): Promise<void> => {

    const mailOptions = {
        from: '"AorusPage" facundomychaliczka@gmail.com',
        to,
        subject: "Código de verificacion de Aorus",
        text:` 
            Llegó tu código de verificación.
            Recordá que esta no es la página oficial de Aorus, es un proyecto realizado en particular.
            Código:
            ${code}
        `,
    }

    try {
        
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado.");
        
    } catch (error) {
        console.error("Error al enviar el correo electrónico", error);
    }

}