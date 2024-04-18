import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";
//token is stored in the user's cookies
export const getTokenData =(request: NextRequest)=>{
    try{
        //encoded token
        const token = request.cookies.get("token")?. value || '';

        //decode token and extract info
        const decodedToken:any=jwt.verify(token,process.env.TOKEN_SECRET!);
        return decodedToken.id; 

    }

    catch(error:any){
    throw new Error(error.message);

    }

}