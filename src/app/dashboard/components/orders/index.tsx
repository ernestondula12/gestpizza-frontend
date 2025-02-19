
"use client"
import { use } from 'react';
import styles from './styles.module.scss';
import { RefreshCcw } from 'lucide-react';
import { OrderProps } from '@/lib/order.type';
//Vamos importar o nosso modal
import { ModalOrder } from '../modal';
//Vamos importar o nosso contexto
import { OrderContext } from '@/providers/order';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Props{
    orders: OrderProps[]
}

export function Orders({orders}: Props){

    const { isOpen, onRequestOpen } = use(OrderContext);
    const router = useRouter();


     async function handleDetailOrder(order_id: string){
        await onRequestOpen(order_id);
    }

    //Criando a nossa função para recarregar a página
    function handleRefresh(){
        router.refresh();
        toast.success("Pedidos atualizados com sucesso!");
    }

    return(
        <>
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <h1>Ultimos Pedidos</h1>
                <button onClick={handleRefresh}>
                    <RefreshCcw size={24} color='#3fffa3'/>
                </button>
            </section>

            <section className={styles.listOrders}>

            {/*Verificando se não existe nenhum dados no array e emitir um alerta*/}
            {orders.length === 0 && (
                <div className={styles.noData}>
                    <span>Nenhum pedido aberto no momento</span>
                </div>
            )}

               {orders.map( order => (
                 <button 
                 key={order.id}
                 className={styles.orderItem}
                 onClick={() => handleDetailOrder(order.id)}
                 >
                 <div className={styles.tag}></div>
                 <span>Mesa {order.table}</span>
             </button>
               ))}
            </section>
        </main>

        {/* Vamos adicionar o nosso modal aqui */}
        {isOpen && <ModalOrder />}
    </>
    )
}