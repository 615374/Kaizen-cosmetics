import React, { useState } from 'react';

export default function MayoristaForm() {
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', email: '', telefono: '', password: '', mensaje: ''
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('enviando');
    try {
      const resp = await fetch('https://kris-fathomless-horrifyingly.ngrok-free.dev/api/mayorista/solicitud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (resp.ok) {
        setStatus('exito');
        setFormData({ nombre: '', apellido: '', email: '', telefono: '', password: '', mensaje: '' });
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="mayorista-container">
       <div className="mayorista-marquee">
          <div className="marquee-content">
             <span>¿Sos revendedor o trenzadora? Solicitá tu cuenta MAYORISTA y accedé a un precio exclusivo 😎</span>
             <span>¿Sos revendedor o trenzadora? Solicitá tu cuenta MAYORISTA y accedé a un precio exclusivo 😎</span>
             <span>¿Sos revendedor o trenzadora? Solicitá tu cuenta MAYORISTA y accedé a un precio exclusivo 😎</span>
             <span>¿Sos revendedor o trenzadora? Solicitá tu cuenta MAYORISTA y accedé a un precio exclusivo 😎</span>
          </div>
       </div>
      
      <div className="form-wrapper">
        <h1>Solicitar cuenta mayorista</h1>
        <p className="subtitle">
          Usted solicitará una cuenta mayorista para poder acceder a nuestra lista de productos mayoristas.
          Esta solicitud será revisada a la brevedad y será notificado por email cuando la verificación haya concluido.
        </p>

        <form onSubmit={handleSubmit} className="mayorista-form">
          <div className="form-grid">
            <div className="input-group">
              <label>Nombre</label>
              <input type="text" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Apellido</label>
              <input type="text" required value={formData.apellido} onChange={e => setFormData({...formData, apellido: e.target.value})} />
            </div>
            <div className="input-group">
              <label>E-mail</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Teléfono</label>
              <input type="tel" required value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Repetir contraseña</label>
              <input type="password" required />
            </div>
          </div>

          <div className="input-group full-width">
            <label>Mensaje (Opcional)</label>
            <textarea value={formData.mensaje} onChange={e => setFormData({...formData, mensaje: e.target.value})} />
          </div>

          <button type="submit" className="btn-mayorista" disabled={status === 'enviando'}>
            {status === 'enviando' ? 'Enviando...' : 'Solicitar cuenta'}
          </button>

          {status === 'exito' && <p className="msg-success">¡Solicitud enviada! Nos contactaremos pronto.</p>}
        </form>
      </div>
    </div>
  );
}