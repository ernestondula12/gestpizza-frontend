"use client"

import styles from './styles.module.scss';
import { useFormStatus } from 'react-dom';

interface PropsName {
    name: string
}

export function Button({ name }: PropsName){
    //Controlando a action do formulario ate que se satisfaça o objetivo
    const { pending } = useFormStatus();
    return(

        <button type='submit' disabled={pending} className={styles.button}>
            {pending ? "Carregando..." : name }
        </button>
    )
}