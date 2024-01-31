import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth.controller";
import {check} from "express-validator"
import { collectErrors } from "../middlewares/collectErrors";
import { emailExist } from "../helpers/validationDB";

const router = Router()

router.post(
    "/register",
    [
        check("nombre", "El campo Nombre es obligatorio.").not().isEmpty(),
        check("email", "El email es obligatorio.").isEmail(),
        check("email").custom(emailExist),
        check("password", "El campo password es obligarotio").not().isEmpty(),
        check("password", "El password debe ser de 6 caracteres mínimo.").isLength({
            min: 6
        }),
        collectErrors
    ],
    register
);

router.post(
    "/login",
    [
        check("email", "El mail es inválido.").isEmail(),
        check("email", "El mail es obligatorio.").not().isEmpty(),
        check("password", "El campo password es obligarotio.").not().isEmpty(),
        check("password", "El password debe ser de 6 caracteres mínimo.").isLength({
            min: 6
        }),
        collectErrors
    ],
    login
)

router.patch(
    "/verify",
    [
        check("email", "El mail es inválido.").isEmail(),
        check("email", "El mail es obligatorio.").not().isEmpty(),
        check("code").not().isEmpty(),
        collectErrors
    ],
    verifyUser
)



export default router