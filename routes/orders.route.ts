import {Router} from "express"
import { createOrder, getOrders } from "../controllers/orders.controller"
import jwtValidate from "../middlewares/jwtValidate"
import { collectErrors } from "../middlewares/collectErrors"
import { isVerified } from "../middlewares/verifyValidate"
import { check } from "express-validator"

const router = Router()

router.get(
    "/",
     [
        jwtValidate,
        collectErrors
     ]
    ,getOrders)


router.post(
    "/",
    [
        jwtValidate,
        isVerified,
        check("price", "El precio es obligatorio.").not().isEmpty(),
        check("shippingDetails", "Los detalles de envío obligatorio.").not().isEmpty(),
        check("items", "Los productos son obligatorios.").not().isEmpty(),
        collectErrors
    ],
    createOrder
)

export default router