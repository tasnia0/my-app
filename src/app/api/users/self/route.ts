import { getTokenData } from "@/helpers/getTokenData"
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){

    try{
        //retrieve userID
        const userId= await getTokenData(request);
        
        //find user based on ID without password
        const user= await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"User found",
            data: user

        })

    }
    catch(error:any){
        return NextResponse.json({error: error.message},{status:400})
    }
}