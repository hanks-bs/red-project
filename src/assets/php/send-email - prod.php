<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/src/Exception.php';
require './phpmailer/src/PHPMailer.php';
require './phpmailer/src/SMTP.php';

//CONFIG
$smtpUsername = "formularz@redprojectsbemiddeling.nl";
$smtpPassword = '412uq0aiaj*z';

$user_message = "Complete";

$emailTo = "info@redprojectsbemiddeling.nl";
$emailToName = "Formularz kontaktowy";

$subject = "Formularz kontaktowy";
$fullname = $_POST["name"];
$message = $_POST["message"];
$phone = $_POST["phone"];
$email = $_POST["email"];


$messageToSend = "<b>Imie i nazwisko:</b> $fullname <br>"
    ."<b>Email:</b> $email <br>"
    ."<b>Numer telefonu:</b> $phone <br>"
    ."<b>Wiadomość:</b> $message";


$emailFrom = 'formularz@redprojectsbemiddeling.nl';
$emailFromName = $fullname;


$mail = new PHPMailer;
$mail->isSMTP(); 
$mail->SMTPDebug = 0; // 0 = off (for production use) - 1 = client messages - 2 = client and server messages
$mail->Host = "scytale.kylos.pl"; // use $mail->Host = gethostbyname('smtp.gmail.com');
$mail->Port = 587; // TLS only
$mail->SMTPSecure = 'tls'; // ssl is depracated
$mail->SMTPAuth = true;
$mail->Username = $smtpUsername;
$mail->Password = $smtpPassword;
$mail->CharSet = "UTF-8";
$mail->setFrom($emailFrom, $emailFromName);
$mail->addAddress($emailTo, $emailToName);
$mail->Subject = $subject;
$mail->msgHTML($messageToSend); //$mail->msgHTML(file_get_contents('contents.html'), __DIR__); //Read an HTML message body from an external file, convert referenced images to embedded,
$mail->AltBody = 'HTML messaging not supported';
if(!$mail->send() && $user_message=="Complete"){
    $user_message = "Error";
    echo "Mailer Error: " . $mail->ErrorInfo;
}else{
    $user_message = "Complete";
}



print_r($user_message);