import React from 'react';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CardModal = ({ isOpen, onRequestClose, title }) => {
    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Detalhes do Cartão"
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    maxWidth: '70%', 
                    width: 'auto', 
                    maxHeight: '90%', 
                    overflowY: 'auto', 
                    border: 'none',
                },
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#151F6D' }}>
                    {title}
                </Typography>
            </div>

            <div className="descricao">
                <p><strong>Descrição:</strong></p>
            </div>

            <Button
                onClick={onRequestClose}
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none', width: '100%', marginTop: '20px' }}
            >
                Fechar
            </Button>
        </Modal>
    );
}

export default CardModal;
