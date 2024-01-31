import mongoose from "mongoose"

export const dbConection = async (): Promise<void> => {
    try {

        const dbURL= process.env.DB_URL;
        if (!dbURL) {
            throw new Error("La URL no está correnctamente definida en las variables de entorno")
        }

        await mongoose.connect(dbURL)
    } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la DB.")
        
    }
}