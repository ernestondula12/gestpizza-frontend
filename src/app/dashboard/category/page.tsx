import styles from './styles.module.scss'
import { Button } from '../components/button'
//Importamos a nossa API
import api from '@/services/api';
//Importando o nosso cookie para servidor
import { getCookieServer } from '@/lib/cookieServer';
import { redirect } from 'next/navigation';

export default function Category(){

    async function handleRegisterCategory(formData: FormData){
        "use server"

        const name = formData.get("name");
        
        if(name == '' || name == null){
            return;

        }

        const data = {

            name: name
        }

        //Pegando o token do usuario
        const token = await getCookieServer();
        
        try{
            
             await api.post("/category", data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })


        }catch(error){
            console.log(error)
            return;
        }

        redirect("/dashboard")
    }

    return(
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form 
            action={handleRegisterCategory}
            className={styles.form}
            >
                <input
                    type="text" 
                    name='name'
                    placeholder='Digite uma categoria'
                    required
                    className={styles.input}
                />
                <Button name='Cadastrar'/>
            </form>
        </main>
    )
}