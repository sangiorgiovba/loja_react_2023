import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
        <h1 className='text-center'>TODOS OS DIREITOS RESERVADOS &copy; SANGIORGIOVBA@GMAIL.COM</h1>
        <p className='text-center mt-3'>
          <Link to="/about">Sobre Nos</Link> | <Link to="/contact">Contato</Link> |  <Link to="/policy">Politicas da Loja</Link>
        </p>
    </div>

  );
};

export default Footer;