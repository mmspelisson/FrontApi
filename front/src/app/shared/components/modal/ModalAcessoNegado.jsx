import React from 'react';

const ModalAcessoNegado = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Desculpe, somente o administrador pode acessar essa tela!</h2>
        <p style={styles.message}>Entre na tela de controle de demandas ou cadastro de demandas.</p>
        <button style={styles.closeButton} onClick={onClose}>Voltar</button>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    margin: '0 0 10px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    margin: '0 0 20px',
    fontSize: '18px',
    color: '#666',
  },
  closeButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#151F6D',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default ModalAcessoNegado;
