import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(){
    const cookieStore = cookies();
    const cookieName = process.env.CAR_TOKEN_NAME || "refreshToken";
    const credential = (await cookieStore).get(cookieName);

    if(!credential){
        return NextResponse.json({
            message: "Credential not found"
        },{
            status: 404
        })
    }

    const refreshToken = credential.value;
    if(refreshToken){
        (await cookieStore).delete(cookieName);
        return NextResponse.json({
            message: "Logout Successfully"
        },{
            status: 200
        })
    }
    return NextResponse.json({
        message: "Refresh token value not found"
    },{
        status: 404
    })
}