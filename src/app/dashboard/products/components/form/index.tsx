"use client"

import { ChangeEvent, useState } from "react"
import styles from "./styles.module.scss"
import { UploadCloud } from "lucide-react"
import Image from "next/image"
import { Button } from "@/app/dashboard/components/button"
import api from "@/services/api"
import { getCookieClient } from "@/lib/cookieClient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CategoryProps{
    id: string,
    name: string
}

interface Props{
    categories: CategoryProps[]
}

export function FormProduct({categories}: Props){

    const router = useRouter();
    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("");

    async function handleRegisterProduct(formData: FormData){
        const categoryIndex = formData.get("category");
        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");

        //Verifica se o usuario preencheu os campos corretamente

        if(!categoryIndex || !name || !price || !description || !image){
            toast.warning("Preencha todos os campos corretamente");
            return;
        }

      //Cadastrando no banco de dados
      const data = new FormData();

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[Number(categoryIndex)].id);
      data.append("file", image);

      //Chamamos a nossa função responsavel pelo componente do client
      //Ela pega o token do usuario a partir do componente do client
      const token = await getCookieClient();

      await api.post("/product", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Erro ao cadastrar produto");
      })

      toast.success("Produto cadastrado com sucesso");
      router.push("/dashboard");

    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        //Verifica se o usuario selecionou um arquivo
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0];
           
            if(image.type !== "image/png" && image.type !== "image/jpeg" && image.type !== "image/jpg"){
                toast.warning("Formato de imagem inválido");
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }
    }



    return(
       <main className={styles.container}>
            <h1>Novo Produto</h1>


            <form className={styles.form} action={handleRegisterProduct}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color="#fff"/>
                    </span>

                    <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg"
                    required
                    onChange={handleFile}
                    />

                    {previewImage && (
                        <Image 
                            alt="Imagem do preview"
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}
                </label>
                <select name="category">
                    {categories.map((category, index) => (
                        <option key={category.id} value={index} >
                            {category.name}
                        </option>
                    ))}
                </select>
                
                <input 
                    type="text" 
                    name="name"
                    placeholder="Digite o nome do produto"
                    required
                    className={styles.input}
                    />
                    
                    <input 
                    type="text" 
                    name="price"
                    placeholder="Digite o preço do produto..."
                    required
                    className={styles.input}
                    />

                    <textarea 
                    name="description" 
                    className={styles.input} 
                    placeholder="Digite a descrição do produto...">
                    </textarea>
                    <Button name="Cadastrar Produto" />
            </form>
       </main>
    )
}
