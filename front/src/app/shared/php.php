<?php
// URL da API
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json"); // Set the content type to JSON

$url = "https://ourplanv9.kanbanize.com/api/v2/cards?board_ids=2&column_ids=17,18,19,20,21,31&lane_ids=4&fields=card_id,title,description,column_id,lane_id,workflow_id";

// API Key
$apiKey = "fRhAgRxaX5Jib9zb4p29GKD4tomTrx6wdPTPo0iZ";

// Inicializa a sessão cURL
$ch = curl_init($url);

// Configura as opções do cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "apikey: $apiKey",
    "Content-Type: application/json"
]);

// Executa a solicitação
$response = curl_exec($ch);

// Verifica se ocorreu algum erro
if (curl_errno($ch)) {
    // Cria uma resposta de erro JSON
    $errorResponse = [
        "error" => true,
        "message" => 'Erro no cURL: ' . curl_error($ch)
    ];
    echo json_encode($errorResponse);
} else {
    // Decodifica a resposta JSON
    $responseData = json_decode($response, true);

    // Exibe a resposta JSON
    echo json_encode($responseData);
}

// Fecha a sessão cURL
curl_close($ch);
?>
