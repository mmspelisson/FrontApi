//Carrega os cards na board
export default class Api {
    Workspace_id = 3
    board_id = 4
    apikey = 'UBRUGGZpWklIbgQQqeWCGgTTN8fpRYTPUZGsesko'

    //Método para obter cartões
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

// Método para criar um cartão novo
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

// uso do método createCard
const newCardData = {
"title": "Novo Cartão",
"description": "Descrição do cartão"
};

// Criar um novo card
Api.createCard(newCardData).then((response) => {
console.log("Novo Card Criado:", response);
});

