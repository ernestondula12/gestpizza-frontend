"use client"
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
//So podemos usar o useRouter dentro do componente definido como useclient
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


export function Header(){

    const router = useRouter();

    async function handleLogout(){

        deleteCookie("session", {path: "/"});
        toast.success("Deslogado com sucesso");

        router.replace("/");
    }   

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                  <h2>Gest<span>Pizza</span></h2>
                </Link>


                <nav>
                    <Link href="/dashboard/category">
                        Categorias
                    </Link>
                    <Link href="/dashboard/products">
                        Produtos
                    </Link>

                    <form action={handleLogout}>
                        <button type='submit'>
                            <LogOutIcon size={24} color='#fff'/>
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}