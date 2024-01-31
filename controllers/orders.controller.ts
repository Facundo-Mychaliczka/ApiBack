import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Order, { OrderInterface } from "../models/orders.model";

export const getOrders = async (req: Request, res: Response) => {
    
    const userId: ObjectId = req.body.userConfirmed._id;

    const consult = {user: userId};

    const orders = await Order.find(consult)

    res.status(200).json({
        data: [
            ...orders
        ]
    })

}

export const createOrder = async (req: Request, res: Response) => {

    const userId: ObjectId = req.body.userConfirmed._id

    const orderData: OrderInterface = req.body


    const data = {
        ...orderData,
        user: userId,
        createdAt: new Date(),
        status: "pending"
    }

    const order = new Order(data);

    await order.save();

    res.status(201).json({
        order
    })

}