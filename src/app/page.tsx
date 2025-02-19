
import styles from './page.module.scss'
import logoImg from '/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import api from '@/services/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


export default function Home() {

  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get('email');
    const password = formData.get('password');


    //Verificando se os campos estão preenchidos
    if(email === '' || password === '' ){
      return;
    }

    try{

       const response = await api.post('/session', {
          email,
          password
        })

        //Verificar se tem token do usuario
        if(!response.data.token){
          return;
        }

        console.log(response.data)
        const expressTime = 60 * 60 * 24 * 30 * 1000
        const cookieStore = await cookies();

        cookieStore.set("session", response.data.token, {
          maxAge:expressTime,
          path: "/",
          httpOnly: false,
          secure: process.env.NODE_ENV === "production"
        })

    }catch(error){
      console.log(error)
    }

    redirect('/dashboard');

  }

  return (
    <>
    <div className={styles.containerCenter}>
    <h1>Gest<span>Pizza</span></h1>


    <section className={styles.login}>
      <form action={handleLogin}>
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
    </>
  )

}