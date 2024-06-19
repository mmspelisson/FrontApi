//Carrega os cards na board --- NÃO ESQUECER DE MUDAR A BOARD E O WORKSPACE
export default class Api {
    Workspace_id = 3
    board_id = 4
    apikey = 'UBRUGGZpWklIbgQQqeWCGgTTN8fpRYTPUZGsesko'

    // obter cartões
    static async getCards() {
        const data = null
        await fetch(`https://empresadamilenam.kanbanize.com/api/v2/cards?board_ids=${4}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                apikey: 'UBRUGGZpWklIbgQQqeWCGgTTN8fpRYTPUZGsesko',
            },
        })
            .then((response) => response.json())
            .then((result) => data = result)
            .catch((error) => console.error(error));
        return data;
    }

    // p/ criar um cartão novo
    static async createCard(cardData) {
        let data = null;
        await fetch('https://empresadamilenam.kanbanize.com/api/v2/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': this.apikey,
                'accept': 'application/json',
            },
            body: JSON.stringify(cardData),
        })
            .then((response) => response.json())
            .then((result) => data = result)
            .catch((error) => console.error(error));
        return data;
    }
}

// criar cardd com as especificações do título DEFINIR AS ESPECIFICAÇÕES
const newCardData = {
    "title": "Novo Cartão",
    "description": "Descrição do cartão",
};

// criando novo card
Api.createCard(newCardData).then((response) => {
    console.log("Novo Card Criado:", response);
});
