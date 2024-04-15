import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken";
connect()

export async function POST(request: NextRequest){
    try{
        //get data from request
        const reqBody= await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);

        //check if user exists based on email
        const user= await User.findOne({email})

        //if email is incorrect
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }

        //check if password exists, bcrypt compares user password to database
        const validPassword = await bcryptjs.compare(password,user.password)

        //if password is incorrect
        if(!validPassword){
            return NextResponse.json({error: "Invalid password. Please try again"},{status:500})
        }

        //create token data
        const tokenData={
            id: user._id,
            username: user.username,
            emai: user.email

        }

        //generate token
        const token =await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: "1h"})

        //store in user cookie
        const response = NextResponse.json({
            message:"Login successful",
            success: true,

        })
        //access user cookie
        response.cookies.set("token",token,{
            httpOnly:true
        
        })
        return response;
    }
    catch(error:any){
        return NextResponse.json({error: error.message}, {status:500})

    }
}