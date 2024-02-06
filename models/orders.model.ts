import { Model, Schema, Types, model } from "mongoose";


interface ItemInterface {
    name: string;
    id: Number;
    value: Number;
    image: string
    garantía: string,
    quantity: number
}
export interface ShippingDetailsInterface {
	name: string;
    surname: string;
	cellphone: string;
	location: string;
	address: string;
}

export interface OrderInterface {
    createdAt: Date;
    user: Types.ObjectId;
    price: Number;
    items: ItemInterface[];
    shippingDetails: ShippingDetailsInterface;
    status: String
}


const OrderSchema = new Schema<OrderInterface>({
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    items: {
        type: [{
            name: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            },
            garantía: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
    shippingDetails: {
		name: {
			type: String,
			required: true,
		},
        surname: {
            type: String,
            required: true,
        },
		cellphone: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		}
    },
    status: {
        type: String,
        required: true
    },
})

const Order: Model<OrderInterface> = model<OrderInterface>("Order", OrderSchema)

export default Order;
