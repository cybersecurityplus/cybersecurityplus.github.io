<?php
header('content-type: application/json; charset=utf-8');
ini_set('display_errors', true);
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

$nome = isset($_POST['nome']) ? $_POST['nome'] : "Não preencheu o nome";
$email = isset($_POST['email']) ? $_POST['email'] : "Não preencheu o email";
$mensagem = isset($_POST['mensagem']) ? $_POST['mensagem'] : "Não preencheu a mensagem";
$empresa = isset($_POST['empresa']) ? $_POST['empresa'] : "Não preencheu a empresa";
$telefone = isset($_POST['telefone']) ? $_POST['telefone'] : "Não preencheu o telefone";

$arquivo = "Nome: $nome <br> Email: $email <br> Empresa: $empresa <br> Telefone: $telefone <br><br> Mensagem: $mensagem";

$emailenviar = "contato@cybersecurityplus.com.br";
$destino = $emailenviar;
$assunto = "Contato Site CyberSecurity";

// É necessário indicar que o formato do e-mail é html
$headers = 'MIME-Version: 1.1' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: ' . $nome . ' <' . $email . '>';

$enviaremail = mail($destino, $assunto, $arquivo, $headers);

if ($enviaremail) {
    $response = [
        "Success" => true,
        "Message" => "Mensagem enviada com sucesso!",
    ];
    echo json_encode($response);
} else {
    $response = [
        "Success" => false,
        "Message" => "Erro ao enviar o email.",
    ];
    echo json_encode($response);
}
