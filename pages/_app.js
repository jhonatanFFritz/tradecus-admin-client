import React, { useEffect } from "react";
import { useRouter } from "next/router";
import App from "next/app";

import "../styles/globals.css";
import Layout from "../components/Layout";
import { SessionProvider, getSession } from "next-auth/react";

function MyApp({ Component, pageProps, session }) {
  
  const router = useRouter();
  const excludedPaths = ["/login"]; // Rutas que no serán envueltas por el layout

  // Verificar si la ruta actual se encuentra en las rutas excluidas
  const isExcludedPath = excludedPaths.includes(router.pathname);

  useEffect(() => {
    if (!isExcludedPath && !session) {
      router.push('/login');
    }
  }, [router, session, isExcludedPath]);// si cambia el router o la session o la isExcludedPath  se ejecuta el useEffect 
  

  // Si la ruta está excluida, renderizar solo el componente de la página actual
  if (isExcludedPath) {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  // Si la ruta no está excluida, envolver el componente en el layout principal
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const session = await getSession(appContext.ctx);
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, session };
};

export default MyApp;
