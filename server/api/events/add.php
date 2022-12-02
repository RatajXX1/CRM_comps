<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
require '../config.php';
require '../Libs/cors.php';
require '../Libs/utilis.php';
require '../auth/Session.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

function checkStructure() {
    global $data;
    if (array_key_exists('ClientID', $data) &&
        array_key_exists('title', $data) &&
        array_key_exists('description', $data)) {
        $data['title'] = filter_var($data['title'], FILTER_SANITIZE_STRING);


        if (!empty($data['ClientID']) && !empty($data['title']) && !empty($data['description']))  {
            return true;
        } else return false;
    } else return false;
}

$sql_cursor = sql_con();
if (enter_to_view_by_rank($sql_cursor, 1) && checkStructure()) {
    // global $smtp_host, $smtp_port, $smtp_login, $smtp_password;
    // $pasword = randomPassword();
    if (array_key_exists('ETA', $data)) {
        $stmt = $sql_cursor->prepare(
            "INSERT INTO events (ClientID, title, description, ETA) values (?, ?, ?, ?);"
        );
        $stmt->bind_param("isss",$data['ClientID'],$data['title'],$data['description'],$data['ETA']);
        // $stmt->execute();
        $stmt->execute();
        $stmt->close(); 
    } else {
        $stmt = $sql_cursor->prepare(
            "INSERT INTO events ( State, ClientID, title, description) values (1, ?, ?, ?);"
        );
        $stmt->bind_param("iss", $data['ClientID'],$data['title'],$data['description']);
        // $stmt->execute();
        $stmt->execute();
        $stmt->close();
    }

    echo json_encode(array(
        'CODE' => 'OK',
        'Mess' => 'Konto stworzone!',
    ));
} else echo json_encode(array(
    'CODE' => 'NO',
    'Mess' => 'Nie masz dostepu!',
));
$sql_cursor->close();