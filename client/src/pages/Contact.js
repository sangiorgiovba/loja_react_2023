import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";


const Contact = () => {
  return (
    <Layout title={"Contata_nos - Loja Online"}>
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="/images/contato.jpg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">CONTATE-NOS</h1>
        <p className="text-justify mt-2">
        qualquer consulta e informações sobre o produto, sinta-se à vontade para ligar a qualquer momento, estamos disponíveis 24 horas por dia, 7 dias por semana
        </p>
        <p className="mt-3">
          <BiMailSend /> : https://github.com/sangiorgiovba
        </p>
        <p className="mt-3">
          <BiPhoneCall /> : 1245254525
        </p>
        <p className="mt-3">
          <BiSupport /> : 1111111111111111 (ligação gratuita)
        </p>
      </div>
    </div>
  </Layout>
  );
};

export default Contact;