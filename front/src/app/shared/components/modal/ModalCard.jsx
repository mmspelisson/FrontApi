import React from 'react'
import Modal from 'react-modal'

const CardModal = ({ isOpen, onRequestClose, demanda }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Detalhes da Demanda"
            ariaHideApp={false}
        >
            <h2>Detalhes da Demanda</h2>
            <div>
                {/* <p><strong>Título:</strong> {demanda.title}</p>
                <p><strong>Quem solicitou:</strong> {demanda.requestedBy}</p>
                <p><strong>Tipo:</strong> {demanda.type}</p>
                <p><strong>Descrição:</strong> {demanda.description}</p> */}
            </div>
            <button onClick={onRequestClose}>Fechar</button>
        </Modal>
    );
}

export default CardModal