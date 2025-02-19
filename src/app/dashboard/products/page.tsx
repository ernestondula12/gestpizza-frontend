import { getCookieServer } from "@/lib/cookieServer"
import { FormProduct } from "./components/form"
import api from "@/services/api";



export default async function Product(){

    //Pegando o token do usuario
    const token = await getCookieServer();

    const response = await api.get("category", {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    console.log(response.data);

    return(
        <main>
            <FormProduct categories={response.data}/>
        </main>
    )
}