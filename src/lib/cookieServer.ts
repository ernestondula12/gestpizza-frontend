import { cookies } from "next/headers";

export async function getCookieServer(){
    const cookieServer = await cookies();
    const token = cookieServer.get("session")?.value

    return token || null;
}