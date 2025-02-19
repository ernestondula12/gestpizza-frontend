"use client"

import {createContext, ReactNode, useState} from "react"
//importando a nossa API
import api from '@/services/api';
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

//Criando a nossa interface do dados a serem mostrados no nosso modal
export interface OrderItemProps{
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    product:{
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        category_id: string;
    };
    order:{
        id: string;
        table: string;
        name: string | null;
        draft: string;
        status: string;
    }
}



type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
   
}

//Criando a tipagem
type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({children}: OrderProviderProps){

    const [isOpen, setIsOpen] = useState(false)
    const [order, setOrder] = useState<OrderItemProps[]>([])
    const router = useRouter();

   async function onRequestOpen(order_id: string){
        //console.log(order_id);

        const token = getCookieClient();

        //Fazendo a requsição para a nossa API
        const response = await api.get(`/order/detail`, {
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                order_id: order_id
            }
        });


        setOrder(response.data)
        setIsOpen(true);
    }

    function onRequestClose(){
        setIsOpen(false);
    }

    //Função para conclusão do pedido
    async function finishOrder(order_id: string){
        const token = getCookieClient();

      const data = {
        order_id: order_id
      }

      //Requisição
      try{

        await api.put(`/order/finish`, data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

      }catch(err){
        console.log(err);
        toast.error("Erro ao concluir pedido");
        return;
      }

      toast.success("Pedido concluido com sucesso");
      router.refresh();
      setIsOpen(false);

    }

    return(
        <OrderContext.Provider value={{isOpen, onRequestOpen, onRequestClose, finishOrder, order}}>
            {children}
        </OrderContext.Provider>
    )
}