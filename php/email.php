<?php

$data = json_decode(file_get_contents("php://input"));

if (isset($data->contact)) {
    echo json_encode(sendContact($data));
}

if (isset($data->project)) {
    echo json_encode(sendProject($data));
}

function sendProject($data)
{
    if (!isset($data->name) ||
        !isset($data->email) ||
        !isset($data->phone) ||
        !isset($data->address) ||
        !isset($data->zip) ||
        !isset($data->town) ||
        !isset($data->works))  {
        return false;
    }

    $name = filter_var($data->name, FILTER_SANITIZE_STRING);
    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    $phone = filter_var($data->phone, FILTER_SANITIZE_STRING);
    $address = filter_var($data->address, FILTER_SANITIZE_STRING);
    $zip = filter_var($data->zip, FILTER_SANITIZE_NUMBER_INT);
    $town = filter_var($data->town, FILTER_SANITIZE_STRING);
    $works = (array) $data->works;

    if (!$name || !$email || !$phone || !$address || !$zip || !$town || empty($works)) {
        return false;
    }

    $date = explode('/', $data->date, 3);

    if (checkdate($date[1], $date[0], $date[2])) {
        $date = $data->date;
        if (isset($data->hour) && preg_match('/^(((0|1)?[0-9])|(2[0-3]{1}))(h|H)?(:?[0-5]{1}[0-9]{1})?/', $data->hour)) {
            $hour = $data->hour;
            if (strpos($data->hour, ':')) {
                $hour = str_replace(':', 'h', $data->hour);
            } else if (strpos($data->hour, 'H')) {
                $hour = str_replace('H', 'h', $data->hour);
            } else if (!strpos($data->hour, 'h')) {
                $hour .= 'h';
            }
            $date .= ' à ' . $hour;
        }
    } else {
        $date = "N/C";
    }

    $object = "Demande d'étude et de bilan";

    $message = nl2br(filter_var($data->message, FILTER_SANITIZE_STRING));

    $worksHtml = '<ul>';

    foreach ($works as $work) {
        $worksHtml .= '<li>' . $work . '</li>';
    }

    $worksHtml .= '</ul>';

    $messageHtml = '
        <html>
            <head>
                <title>' . $object . '</title>
            </head>
            <body style="color:#000">
                <p>Tél : <strong>' . $phone . '</strong></p>
                <p>Adresse: <strong>' . $address . '<br>' . $zip . ' ' . $town . '</strong></p>
                <p>Date de rdv souhaité: <strong>' . $date  . '</strong></p>
                <h3 style="margin-top:10px;border-top:1px solid #DADADA;padding-top:10px">' . $object . '</h3>
                <p>Travaux souhaités:</p>
                ' . $worksHtml . '
                <p>Commentaire:</p>
                <p>' . $message . '</p>
            </body>
        </html>
    ';

    return sendMail($email, $name, $object, $messageHtml);
}

function sendContact($data)
{
    if (!isset($data->name) ||
        !isset($data->email) ||
        !isset($data->phone) ||
        !isset($data->object) ||
        !isset($data->message)) {
        return false;
    }

    $name = filter_var($data->name, FILTER_SANITIZE_STRING);
    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    $phone = filter_var($data->phone, FILTER_SANITIZE_STRING);
    $object = filter_var($data->object, FILTER_SANITIZE_STRING);
    $message = nl2br(filter_var($data->message, FILTER_SANITIZE_STRING));

    if (!$name || !$email || !$phone || !$object || !$message) {
        return false;
    }

    $messageHtml = '
        <html>
            <head>
                <title>' . $object . '</title>
            </head>
            <body style="color:#000">
                <p>Tél : <strong>' . $phone . '</strong></p>
                <h3 style="margin-top:10px;border-top:1px solid #DADADA;padding-top:10px">' . $object . '</h3>
                <p>' . $message . '</p>
            </body>
        </html>
    ';

    return sendMail($email, $name, $object, $messageHtml);
}

function sendMail($email, $name, $object, $messageHtml)
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
    $message.= $lineBreak."--".$boundary.$lineBreak;
    $message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".$lineBreak;
    $message.= "Content-Transfer-Encoding: 8bit".$lineBreak;
    $message.= $lineBreak.$messageHtml.$lineBreak;
    $message.= $lineBreak."--".$boundary."--".$lineBreak;
    $message.= $lineBreak."--".$boundary."--".$lineBreak;

    return mail('campanerjessy54@gmail.com', $object, $message, $header);
}
