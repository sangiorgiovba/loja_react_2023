import React from 'react';
import Layout from '../components/Layout/Layout';

const Policy = () => {
  return (
    <Layout title={"Politicas - Loja Online"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/politicas.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Se você é desenvolvedor, sabe que um bom hardware é essencial para o serviço fluir. Sendo assim, como desenvolvedor, sempre busquei máquinas que tivessem um hardware robusto e confiável
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;