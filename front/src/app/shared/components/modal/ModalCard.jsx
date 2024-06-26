import React from 'react';
import Modal from 'react-modal';

const CardModal = ({ isOpen, onRequestClose, demanda }) => {
    if (!demanda) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Detalhes da Demanda"
            ariaHideApp={false}
        >
            <h2>Detalhes da Demanda</h2>
            <div>
                <p><strong>ID:</strong> {demanda.id}</p>
                <p><strong>Solicitante:</strong> {demanda.solicitante}</p>
                <p><strong>Tipo:</strong> {demanda.tipo}</p>
                <p><strong>Descrição:</strong> {demanda.descricao}</p>
                <p><strong>Prioridade:</strong> {demanda.prioridade}</p>
            </div>
            <button onClick={onRequestClose}>Fechar</button>
        </Modal>
    );
}

export default CardModal;
