<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
require '../Libs/cors.php';
require '../Libs/utilis.php';
require '../auth/Session.php';

header('Content-Type: application/json');

$page = $_GET['ID'] ?? 0;

$sql_cursor = sql_con();
if (enter_to_view_by_rank($sql_cursor, 1) && is_numeric($page) && $page != 0) {
    // $page = 25 * ($page > 0 ? $page - 1 : $page);
    
    $resoult = $sql_cursor->query("SELECT * FROM events JOIN clients ON clients.ID = events.ClientID WHERE events.ID = $page;");
    if ($resoult->num_rows > 0) {
        $users = $resoult->fetch_assoc();
        $resoult = $sql_cursor->query("SELECT * FROM events_state WHERE EventID = $page;");
        $states = array();
        while($row = $resoult->fetch_assoc() ) {
            array_push($states, $row);
        }
        echo json_encode(array(
            'CODE' => 'OK',
            'Mess' => 'Pobrano dane',
            'Event' => $users,
            'States' => $states,
        ));
    } else echo json_encode(array(
        'CODE' => 'OK',
        'Mess' => 'Brak użytkownikow!',
    ));
} else echo json_encode(array(
    'CODE' => 'NO',
    'Mess' => 'Nie masz dostepu!',
));
$sql_cursor->close();