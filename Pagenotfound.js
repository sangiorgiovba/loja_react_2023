import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout title={"Pagina nao encontrada"}>
    <div className="errop">
      <h1 className="errop-title">404</h1>
      <h2 className="errop-heading">Ops! Página não encontrada</h2>
      <Link to="/" className="errop-btn">
       Voltar
      </Link>
    </div>
  </Layout>
  );
};

export default Pagenotfound;

