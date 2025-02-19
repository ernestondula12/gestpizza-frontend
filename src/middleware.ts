import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServer";
import api from "./services/api";

export async function middleware(req: NextRequest){

    //Nome do path, todos os nomes que aparecem após a barra
    const {pathname} = req.nextUrl;

    //Verificando esses mesmos nomes
    if(pathname.startsWith("/_next") || pathname === "/"){
        return NextResponse.next();
    }

    const token = await getCookieServer();
    if(pathname.startsWith("/dashboard")){
        if(!token){
            return NextResponse.redirect(new URL("/", req.url))
        }

        const isValid = await validateToken(token);
        console.log(isValid);

        if(!isValid){
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    return NextResponse.next();

}

//Função para validar se o token é valido

export async function validateToken(token:string){
    if(!token) return false;


    try{

        await api.get("/me", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return true;

    }catch(error){
        console.log(error)
        return false;
    }
}