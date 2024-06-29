
import axios from 'axios'
export default class Api {
    Workspace_id = 1
    board_id = 2
    apikey = 'fRhAgRxaX5Jib9zb4p29GKD4tomTrx6wdPTPo0iZ'

    // carregar a board
    static async getCards() {
        return axios.get('http://localhost/php.php')
            .catch((error) => {
                console.log(error);
            });
    }

    // criar um card novo - Não esquecer de passar parâmetros de dados
    static async createCard(cardData) {
        let data = null;
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("accept", " application/json");
        myHeaders.append("apikey", "fRhAgRxaX5Jib9zb4p29GKD4tomTrx6wdPTPo0iZ");

        let requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(cardData),
            redirect: 'follow'
        };

        try {
            const response = await fetch('http://localhost/enviar.php', requestOptions);
            const result = await response.json();
            data = result;
        } catch (error) {
            console.error('Erro', error);
        }
        return data;
    }
}
