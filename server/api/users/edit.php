<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
require '../Libs/cors.php';
require '../Libs/utilis.php';
require '../auth/Session.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

function checkStructure() {
    global $data;
    if (array_key_exists('Login', $data) &&
        // array_key_exists('Password', $data) &&
        array_key_exists('Rank', $data) &&
        array_key_exists('Email', $data) &&
        array_key_exists('ID', $data) ) {

        $data['Login'] = filter_var($data['Login'], FILTER_SANITIZE_STRING);
        // $data['Password'] = filter_var($data['Password'], FILTER_SANITIZE_STRING);
        $data['Email'] = filter_var($data['Email'], FILTER_SANITIZE_EMAIL);
        if (is_numeric($data['Rank']) && is_numeric($data['ID']) && !empty($data['Login']))  {
            return true;
        } else return false;
    } else return false;
}

$sql_cursor = sql_con();
if (enter_to_view_by_rank($sql_cursor, 1) && checkStructure()) {

    if (array_key_exists("Password", $data)) {
        $data['Password'] = filter_var($data['Password'], FILTER_SANITIZE_STRING);
        $sql_cursor->query(
            "Update Users SET Login = '{$data['Login']}', Password = '{$data['Password']}', Email = '{$data['Email']}', Rank_type = {$data['Rank']} WHERE ID = {$data['ID']};"
        );
    } else {
        $sql_cursor->query(
            "Update Users SET Login = '{$data['Login']}', Email = '{$data['Email']}', Rank_type = {$data['Rank']} WHERE ID = {$data['ID']};"
        );
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