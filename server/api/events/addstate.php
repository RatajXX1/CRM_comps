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
    if (array_key_exists('EventID', $data) &&
        array_key_exists('Type', $data) &&
        array_key_exists('Title', $data) &&
        array_key_exists('EComment', $data)) {
        $data['Title'] = filter_var($data['Title'], FILTER_SANITIZE_STRING);
        $data['EComment'] = filter_var($data['EComment'], FILTER_SANITIZE_STRING);
        if (!empty($data['EventID']) && !empty($data['Title']) && !empty($data['EComment']))  {
            return true;
        } else return false;
    } else return false;
}

$sql_cursor = sql_con();
if (enter_to_view_by_rank($sql_cursor, 1) && checkStructure()) {
    // global $smtp_host, $smtp_port, $smtp_login, $smtp_password;
    // $pasword = randomPassword();
    $stmt = $sql_cursor->prepare(
        "INSERT INTO events_state ( EventID, Type, Title, EComment) values (?, ?, ?, ?);"
    );
    $stmt->bind_param("iiss", $data['EventID'],$data['Type'],$data['Title'],$data['EComment']);
    // $stmt->execute();
    $stmt->execute();
    $stmt->close();

    echo json_encode(array(
        'CODE' => 'OK',
        'Mess' => 'Konto stworzone!',
    ));
} else echo json_encode(array(
    'CODE' => 'NO',
    'Mess' => 'Nie masz dostepu!',
));
$sql_cursor->close();