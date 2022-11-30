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
    if (array_key_exists('Name', $data) &&
        array_key_exists('DescName', $data) &&
        array_key_exists('ID', $data) &&
        array_key_exists('Contacs', $data)) {
        $data['Name'] = filter_var($data['Name'], FILTER_SANITIZE_STRING);
        $data['DescName'] = filter_var($data['DescName'], FILTER_SANITIZE_STRING);

        if (!empty($data['Name']) && !empty($data['DescName']) && !empty($data['Contacs']) && is_numeric($data['ID']))  {
            return true;
        } else return false;
    } else return false;
}

$sql_cursor = sql_con();
if (enter_to_view_by_rank($sql_cursor, 1) && checkStructure()) {
    // global $smtp_host, $smtp_port, $smtp_login, $smtp_password;
    // $pasword = randomPassword();
    
    $stmt = $sql_cursor->prepare(
        "UPDATE clients SET Name = ?, DescName = ?, Contacs = ?; WHERE ID = ?"
    );
    $stmt->bind_param("ssbi", $data['Name'],$data['DescName'],$data['Contacs'],$data['ID']);
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