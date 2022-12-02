<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
require '../Libs/cors.php';
require '../Libs/utilis.php';
require '../auth/Session.php';

header('Content-Type: application/json');

// $page = $_GET['ID'] ?? 0;

$sql_cursor = sql_con();
if (enter_to_view_by_rank($sql_cursor, 1)) {
    // $page = 25 * ($page > 0 ? $page - 1 : $page);
    $states = array();    
    $resoult = $sql_cursor->query("SELECT COUNT(*) as FullCount FROM events;");
    $resoult = $resoult->fetch_assoc();
    $states["FullCount"] = $resoult["FullCount"];
    $resoult = $sql_cursor->query("SELECT COUNT(*) as FullCount FROM events WHERE State = 1;");
    $resoult = $resoult->fetch_assoc();
    $states["Work"] = $resoult["FullCount"];
    $resoult = $sql_cursor->query("SELECT COUNT(*) as FullCount FROM events WHERE State = 2;");
    $resoult = $resoult->fetch_assoc();
    $states["Late"] = $resoult["FullCount"];
    $resoult = $sql_cursor->query("SELECT COUNT(*) as FullCount FROM events WHERE State = 3;");
    $resoult = $resoult->fetch_assoc();
    $states["End"] = $resoult["FullCount"];

    $years = array();
    $resoult = $sql_cursor->query("SELECT COUNT(*) as Stat FROM events GROUP BY EXTRACT(YEAR_MONTH FROM created) ORDER BY EXTRACT(YEAR_MONTH FROM created) DESC LIMIT 12;");
    while($row = $resoult->fetch_assoc()) {
        array_push($years, intval($row["Stat"]));
    }
    
    echo json_encode(array(
        'CODE' => 'OK',
        'Mess' => 'Pobrano dane',
        'Count' => $states,
        'States' => $years,
    ));
} else echo json_encode(array(
    'CODE' => 'NO',
    'Mess' => 'Nie masz dostepu!',
));
$sql_cursor->close();