
"use client";

import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { ButtonNav } from "../../components/ButtonNav";

export default function Test() {

    const [isEditing, setIsEditing] = useState(false);
  
    const toggleEditing = () => {
        setIsEditing(!isEditing);
      };
    
      const handleSave = async (data: any) => {
        console.log("Salvar:", data);
        // Adicione aqui a lógica para persistir as alterações no banco
        reset(currentContact.id);
        setIsEditing(false);
      };
    
      const handleDelete = async () => {
        console.log("Excluir");
        console.log("clicou ");
        // Adicione aqui a lógica para excluir do banco
      };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <p>teste</p>
 <section>

 </section>
     <form action="">
            <ButtonNav
              width="20.4rem"
              height="4.8rem"
              type="submit"
              text={isEditing ? "Salvar" : "Editar"}
              background="color-color-primary-disable"
              textcolor="white"
              hover="color-grey-2"
            />

            <ButtonNav
              width="9.8rem"
              height="4.8rem"
              type="button"
              text="Excluir"
              background="color-grey-1"
              textcolor="color-grey-0"
              hover="color-grey-2"
              onClick={() => setIsDeleting(tecnologyToEdit)}
            />

     </form>
    </main>
  );
}
