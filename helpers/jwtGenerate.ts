import jwt from "jsonwebtoken"

export const jwtGenerate = (id: string = ""): Promise<string> => {

    const payload = {id}

    return new Promise((res, rej) => {
        jwt.sign(
            payload,
            process.env.JWTPASS as string,
            {
                expiresIn: "30d"
            },
            (err: Error | null, token: string | undefined) => {
                if (err) {
                    console.log(err);
                    rej("No se pudo generar el JWT")
                } else {
                    res(token as string)
                }

            }
        )
    })
}