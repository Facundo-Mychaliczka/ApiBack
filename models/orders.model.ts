import { Types } from "mongoose";

interface ItemInterface {
    name: string;
    id: Number;
    value: Number;
    category: string;
    img: string
    garantía: string
}

export interface OrderInterface {
    createdAt: Date;
    user: Types.ObjectId;
    price: Number;
    items: ItemInterface[]
}