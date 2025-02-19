import { Orders } from "./components/orders";
//Vamos importar a nossa API
import api from "../../services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";

//Nossa função responsavel pela requisição de pedidos para mostrarmos no nosso dashboard
async function getoOrders(): Promise<OrderProps[] | []>{

    try{

          //Pegando o nosso token
        const token = await getCookieServer();

        //Fazendo a requisição para a nossa API
        const response = await api.get("/orders", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data || [];


    }catch(err){
        console.log(err);
        return [];
    }

}

 async function Dashboard() {

    const orders = await getoOrders();

    return (
        <>
            <Orders orders={orders}/>
        </>
    );
}

export default Dashboard;