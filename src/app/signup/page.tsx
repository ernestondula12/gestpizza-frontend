import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import api from "@/services/api";
import { redirect } from "next/navigation";

export default function SignUp() {

  async function  handleRegister(formData: FormData){

    //Tornando o formulario em um componente use server
    "use server"

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    if(name === '' || email === '' || password === ''){
      return console.log("Preencha todos os campos")
    }

    try{

        //Salvando os dados no banco de dados
        const response = await api.post('/users', {
            name,
            email,
            password
        })
  
  
    }catch(error){
      console.log(error)
    }

        redirect('/')  

    }

    return (
        <div className={styles.containerCenter}>
       
        <h1>Gest<span>Pizza</span></h1>
   
       <section className={styles.login}>
            <h1>Criando sua conta</h1>
         <form action={handleRegister}>
         <input 
             type="text"
             required
             name='name'
             placeholder="Digite seu nome"
             className={styles.input}
           />

           <input 
             type="email"
             required
             name='email'
             placeholder="Digite seu email..."
             className={styles.input}
           />
   
           <input 
             type="password"
             required
             name='password'
             placeholder="*********" 
             className={styles.input}
           />
   
           <button type="submit" className={styles.buttonLogin}>
             Acessar
           </button>
         </form>
         <Link href="/signup" className={styles.text}>
           <p>Não possui uma conta? Cadastre-se</p>
         </Link>
       </section>    
   
       </div>
    );
}