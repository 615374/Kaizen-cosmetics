import React from 'react';

export default function MayoristaBanner({ setPage }) {
  return (
    <div 
      className="mayorista-marquee" 
      onClick={() => setPage && setPage('mayorista')} 
      style={{ cursor: 'pointer' }}
    >
      <div className="marquee-content">
        <span>¿Sos revendedor o trenzadora? Solicitá tu cuenta MAYORISTA y accedé a un precio exclusivo 😎</span>
        <span>¿Sos revendedor o trenzadora? Solicitá tu cuenta MAYORISTA y accedé a un precio exclusivo 😎</span>
        <span>¿Sos revendedor o trenzadora? Solicitá tu cuenta MAYORISTA y accedé a un precio exclusivo 😎</span>
        <span>¿Sos revendedor o trenzadora? Solicitá tu cuenta MAYORISTA y accedé a un precio exclusivo 😎</span>
      </div>
    </div>
  );
}