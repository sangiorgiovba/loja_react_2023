import React from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"MELHOR OFERTA - LOJA ONLINE"}>
      <h1>PAGINA HOME OU PRINCIPAL</h1>
     
    </Layout>
  );
};

export default HomePage;