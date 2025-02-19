## Getting Started

### Primeiramente criamos o projeto next
```bash 
npx create-next-app@latest frontend
```

### Depois instalamos o sass usando o comando para instalação do SASS
```bash
npm install sass
```
### Depois trabalhamos no global.scss para reset e cores principais a serem usadas no projeto

### Colocamos a cor de fundo no nosso home onde temos a nossa tela de login
```scss
body{
    background: var(--dark-700);
}
```
### Importamos a nossa logo no arquivo page.tsx para podermos usar a nossa logo no formulario login
```tsx
import logoImg from '@/assets/logo.svg'
```

### Importamos o nosso componente de imagem que veio padrão do nextjs e ela que vai nos permitir trabalhar na nossa imagem logo
```tsx
import Image from 'next/image'
```
### Colocamos a nossa imagem logo no nosso componente de imagem 
```tsx
<Image src={logoImg} alt="Logo da pizzaria" width={190} height={60} />
```
### Criamos o nosso formulario de login no arquivo page.tsx
```tsx
<form>
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
``` 
### Avançamos para estilização da nossa tela de login que esta na page.tsx e colocamos todo formulario no centro e definimos uma cor de fundo
```scss
.containerCenter{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--dark-900);
}
```
### Criamos o nosso componente de signup no arquivo signup.tsx
```tsx
export default function SignUp() {
    return (
        <div>
        <Image 
        src={logoImg} 
        alt="Logo da pizzaria" 
        width={190} height={60} 
        />
   
   
       <section className={styles.login}>
         <form>
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
             Cadastrar
           </button>
         </form>
         <Link href="/" className={styles.text}>
           <p>Já possui uma conta? Faça login!</p>
         </Link>
       </section>
        </div>
    )
}
``` 
### Depois avançamos para instalação do axios para fazer a requisição de login e signup
```bash
npm install axios
```
### Criamos o nosso serviço de api no arquivo api.ts
```tsx
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333",
});

export default api;
``` 
### Criamos a nossa função handleRegister no arquivo signup.tsx para cadastrar o usuário no banco de dados e tornamos o formulario em um componente use server e fazemos a requisição para o backend em u bloco try catch e redirecionamos para a tela de login
```tsx
"use server"  

async function handleRegister(formData: FormData){
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    try{

    const response = await api.post('/users', {
        name,
        email,
        password
    })
       console.log(response.data)

    }catch(error){
      console.log(error)
    } 

    redirect('/')
}
``` 
### Criamos a nossa função handleLogin no arquivo page.tsx para fazer a requisição de login e tornamos o formulario em um componente use server e fazemos a requisição para o backend em u bloco try catch e redirecionamos para a tela de home
```tsx
"use server"

async function handleLogin(formData: FormData){
    const email = formData.get('email')
    const password = formData.get('password')

    try{
        const response = await api.post('session', {
            email,
            password
        })
        console.log(response.data)
    }catch(error){
      console.log(error)
    }
}
```
### Criamos a nossa pagina dashboard no arquivo dashboard.tsx e após o usuario logar redirecionamos para a pagina dashboard
```tsx
redirect('/dashboard')
``` 

### Trabalhamos na questão de verificar se o token do usuario existe e se não existe redirecionamos para a pagina de login
```tsx
if(!response.data.token){
  redirect('/')
}
```
### Trabalhamos na questão de importar os nossos cookies
```
importação do cookies
import {cookie} from 'next/headers'

```
### Salvamos o token do usuario no cookie do navegador
```
Primeiro é verificar se existe o token
if(!response.data.token){
  return
}

tempo de duração do token
const expressTime = 60 * 60 * 24 * 30 * 1000;
const cookieStore = await cookies();
cookieStore.set("session", response.data.token, {
  maxAge: expressTime,
  path: "/",
  httpOnly: false,
  secure: process.env.NODE_ENV === "production"
})

```

### Criamos um novo arquivo chamado middleware para proteger rotas privadas

```
export function middleware(req: NextRequest){

}
```

### Instalamos uma bilioteca auxiliar para cookies no next
```
npm install cookies-next
```

### Criamos uma pasta lib onde contem dois arquivos que são: cookieServer.ts onde podemos controlar cookies do lado do servidor e arquivo cookieClient onde e quando queremos usar cookies do lado do cliente

```
Código do primeiro arquivo que é o do cookieServer

import { cookies } from 'next/headers'

export async function getCookieServer(req: nextRequest){
  const cookieServer = await cookies();
  cookieServer.get("session")?.value

  return token || null;

}

arquivo cookieClient 
import { getCookie } from 'cookie-next'

export function getCookieClient(){
  const token = getCookie("session");

  return token;
}

```

### Posteriormente criamos uma função que valida token do usuario e ver se o mesmo pode ter acesso ao dashboard

```
export async function validateToken(token:string){
    if(!token) return false;


    try{

        await api.get("/me", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return true;

    }catch(error){
        console.log(error)
        return false;
    }
}
```

### Trabalhamos na criação do header do dashboard

### Instalamos uma bilioteca react para trabalharmos com icones
```
npm install lucide-react
```

### Trabalhamos na funcionalidade do logout pois com essa funcionalidade criamos uma função para assim trabalhar nesse quisito:

```
const router = useRouter()
async function handleLogout(){
  deleteCookie("session", {path: "/"})

  router.replace("/")
}
```

### Trabalhamos na questão de criar um novo usuario e gerar um token para o usuario

### Aqui está o código para gerar um token JWT para o usuário após autenticação:
```
import { sign } from 'jsonwebtoken'

// Generate token after creating user
const token = sign(
  {
    name: user.name,
    email: user.email
  },
  process.env.JWT_SECRET,
  {
    subject: user.id,
    expiresIn: '30d'
  }
)
``` 

### Trabalhamos na questão de cadastrar um novo produto com upload de imagens

### Instalamos uma biblioteca para alertas e mensagens de aviso caso o usuario é logado, autenticado com sucesso e caso der erro nesse processo essa é bilioteca é o sonner
```
npm install sonner
```

### Avançamos no processo de criação do modal, quando um produto for clicado ele vai mostrar o nosso modal
```

```
