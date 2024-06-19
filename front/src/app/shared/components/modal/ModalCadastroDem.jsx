import React, { useEffect } from 'react';

const modalStyles = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    transition: 'opacity 0.5s ease-in-out',
};

const hiddenStyles = {
    opacity: 0,
    visibility: 'hidden',
};

const visibleStyles = {
    opacity: 1,
    visibility: 'visible',
};

function ModalCadastroDemanda({ show, onClose }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    const modalStyle = show ? visibleStyles : hiddenStyles;

    return (
        <div style={{ ...modalStyles, ...modalStyle }}>
            Você cadastrou essa demanda com sucesso!
        </div>
    );
}

export default ModalCadastroDemanda
