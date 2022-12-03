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
    $resoult = $sql_cursor->query("SELECT ID,Name,DescName,created,Contacs FROM clients WHERE Name like '%$page%' or DescName like '%$page%'  limit 5;");
    $users = array();
    while ($row = $resoult->fetch_assoc()) {
        $users[] = array(
            'ID' => $row['ID'],
            'Namop' => $row['DescName'],
            'tittle' => $row['Name'],
            'Type' => 1,
            'dates' => $row['created'],
            'Contacs' => $row['Contacs']
        );
    }
    $resoult = $sql_cursor->query("SELECT ID,title FROM events WHERE title like '%$page%'  limit 5;");
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