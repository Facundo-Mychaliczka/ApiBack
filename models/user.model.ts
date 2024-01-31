import { Model, Schema, model } from "mongoose";

export interface UserInterface {
    nombre: string;
    email: string;
    password: string;
    code?: string;
    verified?: boolean;
};

const UserSchema = new Schema<UserInterface>({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio."]
    },
    email: {
        type: String,
        required: [true, "El email es obligarotio."]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligarotia."]
    },
    code: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    }

});

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, code, ...user} = this.toObject();
    return user
}

const User: Model<UserInterface> = model<UserInterface>("User", UserSchema);

export default User