
import { NextFunction } from "express"
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req : any,res : any,next : NextFunction)=>{

const secret = 'secret_to_parse_and_create_token_ideally_passed_as_environment_variable'
const dummy_token = 'eyJhbGciOiJIUzI1NiJ9.cGllQXNzaWdu.YpUzXy2vBm5ADCGf_wcJPDOTHNhwGiJrtz-Lpcqg83A'

const check = jwt.verify(dummy_token,secret);
if(!check) res.status(403).send("unauthorized")

next();

}