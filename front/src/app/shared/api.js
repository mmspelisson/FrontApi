export default class Api {
    Workspace_id = 3
    board_id = 4
    apikey = 'UBRUGGZpWklIbgQQqeWCGgTTN8fpRYTPUZGsesko'
    static async getCards() {
        const data = null
        await fetch(`https://empresadamilenam.kanbanize.com/api/v2/cards?board_ids=${4}`, {
            method: 'GET',
            'content-type': 'application/json',
            apikey: 'UBRUGGZpWklIbgQQqeWCGgTTN8fpRYTPUZGsesko',
        })
            .then((response) => response.json())
            .then((result) => data = result)
            .catch((error) => console.error(error))
        return data

    }
}


// class Card {
//     Workspace_id = 3
//     // column = backlog

//     apikey = 'UBRUGGZpWklIbgQQqeWCGgTTN8fpRYTPUZGsesko'
//     static async postCards() {
//         const data = null 
//         await fetch (`https://empresadamilenam.kanbanize.com/api/v2/cards=${1}`,)
//             method: 'POST'
//     }
// }

