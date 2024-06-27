<?php
// URL da API
header("Access-Control-Allow-Origin: http://localhost:3000");
$url = "https://ourplanv9.kanbanize.com/api/v2/cards?board_ids=2&column_ids=17,18,19,20,21&lane_ids=4";
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
    echo 'Erro no cURL: ' . curl_error($ch);
} else {
    // Decodifica a resposta JSON
    $responseData = json_decode($response, true);

    // Exibe a resposta
    echo '<pre>';
    print_r($responseData);
    echo '</pre>';
}

// Fecha a sessão cURL
curl_close($ch);