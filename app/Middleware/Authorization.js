import jwt from "jsonwebtoken"
import process from "process"
import dotenv from "dotenv"
dotenv.config({
    silent: process.env.NODE_ENV === 'production'
});
export default async (req, res, next) => {
    try {
        const {authorization} = req.headers
        const temp = authorization.split(" ")
        if(temp.length == 2 && temp[0] == 'Bearer') {
            const token = temp[1]
            const decoded = await jwt.verify(token, process.env.JWT_KEY)
            req.userData = decoded
            next()
        }
        else {
            return res.status(401).json({
                status: 401,
                message: 'Format token is wrong !!!',
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            message: 'Authorize failed !!!',
            error
        })
    }
}