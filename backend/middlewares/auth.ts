import type { Request, Response , NextFunction } from "express";
import  jwt, { type JwtPayload } from "jsonwebtoken";

export default  function Auth(req:Request, res:Response,next:NextFunction){
    const token  = req.headers.authorization?.split(" ")[1]
    if(token){
        const data =  jwt.verify(token, "hardikisacooldude.") as JwtPayload
        if(data){
            req.id = data.id
            next()

        }else {res.json({message:"invalid or expired token"})}

    }else {res.json({message:"token not provided"})}
   
}