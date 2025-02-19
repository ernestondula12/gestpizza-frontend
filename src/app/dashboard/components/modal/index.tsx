"use client"

//Chamando o nosso use
import { use } from 'react';
//Vamos importar o csss
import styles from './style.module.scss';
import { X } from 'lucide-react';
//Vamos chamar o nosso contetxto
import { OrderContext } from '@/providers/order';
import { calculateTotal } from '@/lib/helper';


export function ModalOrder(){

    const { onRequestClose, order, finishOrder } = use(OrderContext);


    //Nesta parte criamos a nossa função concluir pedido
     async function handleFinishOrder(){
        await finishOrder(order[0].order.id);
    }

    return(
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color='#ff3f4b'/>
                </button>
                <article className={styles.container}>
                    <h2>Detalhes do pedido</h2>

                    <span className={styles.table}>
                        Mesa <b>{order[0].order.table}</b>
                    </span>
                    {order[0].order.name && (
                        <span className={styles.name}>
                           <b>{order[0].order.name}</b>
                        </span>
                    )}

                   {order.map(item => (
                    <section className={styles.item} key={item.id}>
                         <span>
                            Quantidade: {item.amount} - <b>{item.product.name}</b> - Kz {parseFloat(item.product.price) * item.amount}
                         </span>
                         <span className={styles.description}>
                            {item.product.description}
                        </span>
                     </section>
                   ))}

                   <h3 className={styles.total}>Valor Total: Kz {calculateTotal(order)}</h3>

                    <button className={styles.buttomCl} onClick={handleFinishOrder}>
                        Concluir pedido
                    </button>   

                </article>
            </section>
        </dialog>
    )
}