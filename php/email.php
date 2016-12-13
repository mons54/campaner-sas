<?php

$data = json_decode(file_get_contents("php://input"));

if (isset($data->contact) &&
    isset($data->name) &&
    isset($data->email) &&
    isset($data->phone) &&
    isset($data->object) &&
    isset($data->message)) {
    echo json_encode(sendMailContact($data->name, $data->email, $data->phone, $data->object, $data->message));
}

function sendMailContact($name, $email, $phone, $object, $message)
{
    $name = filter_var($name, FILTER_SANITIZE_STRING);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $phone = filter_var($phone, FILTER_SANITIZE_STRING);
    $object = filter_var($object, FILTER_SANITIZE_STRING);
    $message = nl2br(filter_var($message, FILTER_SANITIZE_STRING));

    if (empty($name) ||
        empty($email) ||
        empty($phone) ||
        empty($object) ||
        empty($message)) {
        return false;
    }

    $messageText = $message;

    $messageHtml = '
        <html>
            <head>
                <title>' . (string) $object . '</title>
            </head>
            <body style="color:#000">
                <p>Tél : <strong>' . (string) $phone . '</strong></p>
                <h3 style="margin-top:10px;border-top:1px solid #DADADA;padding-top:10px">' . $object . '</h3>
                <p>' . $message . '</p>
            </body>
        </html>
    ';

    return sendMail($email, $name, $object, $messageText, $messageHtml);
}

function sendMail($email, $name, $object, $messageText, $messageHtml)
{
    $lineBreak = "\n";

    $boundary = "-----=" . md5(rand());

    $header = "From: \"".$name."\"<".$email.">".$lineBreak;
    $header.= "Reply-to: \"".$name."\"<".$email.">".$lineBreak;
    $header.= "MIME-Version: 1.0".$lineBreak;
    $header.= "Content-Type: multipart/alternative;".$lineBreak." boundary=\"".$boundary."\"".$lineBreak;

    $message = $lineBreak."--".$boundary.$lineBreak;
    $message.= "Content-Type: text/plain; charset=\"ISO-8859-1\"".$lineBreak;
    $message.= "Content-Transfer-Encoding: 8bit".$lineBreak;
    $message.= $lineBreak.$messageText.$lineBreak;
    $message.= $lineBreak."--".$boundary.$lineBreak;
    $message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".$lineBreak;
    $message.= "Content-Transfer-Encoding: 8bit".$lineBreak;
    $message.= $lineBreak.$messageHtml.$lineBreak;
    $message.= $lineBreak."--".$boundary."--".$lineBreak;
    $message.= $lineBreak."--".$boundary."--".$lineBreak;

    return mail('campanerjessy54@gmail.com', $object, $message, $header);
}
