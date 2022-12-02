<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
require '../Libs/cors.php';
require '../Libs/utilis.php';
require '../auth/Session.php';

header('Content-Type: application/json');

$page = $_GET['query'] ?? 0;

$sql_cursor = sql_con();
if (enter_to_view_by_rank($sql_cursor, 1)) {
    // $page = 25 * ($page > 0 ? $page - 1 : $page);
    $resoult = $sql_cursor->query("SELECT ID,Name,DescName FROM clients limit 5 WHERE Name like '%$page%' or DescName like '%$page%' ;");
    $users = array();
    while ($row = $resoult->fetch_assoc()) {
        $users[] = array(
            'ID' => $row['ID'],
            'Namop' => $row['DescName'],
            'tittle' => $row['Name'],
            'Type' => 1,
        );
    }
    $resoult = $sql_cursor->query("SELECT ID,title FROM events limit 5 WHERE title like '%$page%';");
    while ($row = $resoult->fetch_assoc()) {
        $users[] = array(
            'ID' => $row['ID'],
            'tittle' => $row['title'],
            'Type' => 2,
        );
    }
    echo json_encode(array(
        'CODE' => 'OK',
        'Mess' => 'Pobrano dane',
        'Users' => $users
    ));
} else echo json_encode(array(
    'CODE' => 'NO',
    'Mess' => 'Nie masz dostepu!',
));
$sql_cursor->close();