import React from "react";
import { TextField } from "@mui/material";
import { signIn, getSession } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      
    <div className="flex items-center justify-center h-screen">
      <div className="w-full h-3/4 flex items-center justify-center border-2 border-indigo-600 rounded-lg">
        <div className="bg-cyan-200 w-1/2 h-full flex items-end justify-end">
          <Image
            src="/machu.png"
            alt="Mi Imagen de login"
            className="w-full h-auto"
            width={500}
            height={500}
          />
        </div>
        <div className=" w-1/2 h-full flex items-center justify-center">
          <div className="m-6 flex flex-col items-center w-full">
            <span className="text-gray-700 text-4xl mb-4 font-black">
              TRADECUS TOURS
            </span>
            <span className="text-gray-700 text-2xl mb-4 font-bold">
              Inicio de sesión
            </span>
            <form action="" className="flex flex-col items-center w-full">
              <TextField
                id="username"
                label="Nombre de usuario"
                variant="outlined"
                margin="normal"
                required
                fullWidth
              />
              <TextField
                id="password"
                label="Contraseña"
                type="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
              />
              <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Iniciar sesión
              </button>
            </form>

            <div
              className="flex items-center justify-center mt-6 text-indigo-600 border-2 border-indigo-600 bg-slate-50 hover:bg-indigo-600 hover:text-slate-50 rounded-md"
              onClick={() => signIn("google")}
            >
              <Image
                src="/google.png"
                alt="Icono de Google"
                className="w-6 h-6  mr-2 ml-4"
                width={24}
                height={24}
              />

              <button className="  font-bold py-2 px-4 rounded">
                Iniciar sesión con Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
