<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
$url = "https://ourplanv9.kanbanize.com/api/v2/cards";
$apiKey = "fRhAgRxaX5Jib9zb4p29GKD4tomTrx6wdPTPo0iZ";

// Recebendo os dados do corpo da requisição
$data = json_decode(file_get_contents('php://input'), true);

$cardData = array(
    "column_id" => 17,
    "title" => isset($data['tipo']) ? $data['tipo'] : '',
    "description" => isset($data['descricao']) ? $data['descricao'] : '',
    "lane_id" => 4 
);

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "apikey: $apiKey",
    "Content-Type: application/json"
));
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($cardData));

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Erro no cURL: ' . curl_error($ch);
} else {
    $responseData = json_decode($response, true);
    echo json_encode($responseData); // Retornando a resposta do Kanbanize
}

curl_close($ch);
?>
