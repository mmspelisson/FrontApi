
import axios from 'axios'
export default class Api {
    Workspace_id = 1
    board_id = 2
    apikey = 'fRhAgRxaX5Jib9zb4p29GKD4tomTrx6wdPTPo0iZ'

    // obter cartões
    static async getCards() {
        const data = null
        // let data = cards;

       axios.get('https://ourplanv9.kanbanize.com/api/v2/cards?board_ids=2', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://ourplanv9.kanbanize.com",
                "Access-Controll-Allow-Methods": "http://ourplanv9.kanbanize.com'",
                "Access-Control-Allow-Headers": "http://ourplanv9.kanbanize.com'",
                mode: 'cors',
                accept: 'application/json',
                apikey: 'fRhAgRxaX5Jib9zb4p29GKD4tomTrx6wdPTPo0iZ'
            }
        })  
            .then((response) => {
                data = response
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        }

    // p/ criar um cartão novo
    static async createCard(cardData) {
        let data = null;
        let myHeaders = new Headers();
        myHeaders.append("accept", " application/json");
        myHeaders.append("apikey", "fRhAgRxaX5Jib9zb4p29GKD4tomTrx6wdPTPo0iZ");

        let requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://ourplanv9.kanbanize.com/api/v2/cards", requestOptions)
            .then(response => response.json())
            .then(result => data = result)
            .catch(error => console.error('error', error));
        return data;
    }
}

// criar cardd com as especificações do título -- DEFINIR AS ESPECIFICAÇÕES
const newCardData = {
    "title": "Novo Cartão",
    "description": "Descrição do cartão",
};

