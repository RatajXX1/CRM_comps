<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
require '../Libs/cors.php';
require '../Libs/utilis.php';
require '../auth/Session.php';

header('Content-Type: application/json');

$page = $_GET['page'] ?? 0;
// filtes
$qury = $_GET['query'] ?? NULL;
$client = $_GET['client'] ?? NULL;
$state = $_GET['state'] ?? NULL;
$from = $_GET['from'] ?? NULL;
$to = $_GET['to'] ?? NULL;

function isFilter() {
    global $qury, $client, $state, $from, $to;
    if (
        $qury != NULL ||
        $client != NULL ||
        $state != NULL ||
        $from != NULL ||
        $to != NULL
        ) return true;
    else return false;
}

function SearchQuery() {
    global $qury, $client, $state, $from, $to;
    $Search = "";

    if ($qury != NULL) {
        if ($Search != "") $Search .= " AND ";
        $Search .= " events.title like '%$qury%' ";
    }

    if ($client != NULL) {
        if ($Search != "") $Search .= " AND ";
        $Search .= " events.ClientID = $client ";
    }

    if ($state != NULL) {
        if ($Search != "") $Search .= " AND ";
        $Search .= " events.State = $state ";
    }

    if ($from != NULL && $to != NULL) {
        if ($Search != "") $Search .= " AND ";
        $Search .= " events.created between '$from' and '$to'";
    }


    return $Search;
}

$sql_cursor = sql_con();
if (enter_to_view_by_rank($sql_cursor, 2) && is_numeric($page)) {
    $page = 25 * ($page > 0 ? $page - 1 : $page);
    $resoult = $sql_cursor->query("UPDATE events SET State = 2 WHERE ETA < NOW():");
    if (isFilter())
        $resoult = $sql_cursor->query("SELECT events.ID,events.State,clients.DescName,events.title,events.created,events.ETA FROM events JOIN clients ON clients.ID = events.ClientID WHERE ". SearchQuery() ." order by events.ID asc limit 25 offset $page;");
    else $resoult = $sql_cursor->query("SELECT events.ID,events.State,clients.DescName,events.title,events.created,events.ETA FROM events JOIN clients ON clients.ID = events.ClientID order by events.ID asc limit 25 offset $page;");
    if ($resoult->num_rows > 0) {
        $users = array();
        while ($row = $resoult->fetch_assoc()) {
            $users[] = array(
                'ID' => $row['ID'],
                'dates' => $row['created'],
                'eta' => $row['ETA'],
                'tittle' => $row['title'],
                'DescName' => $row['DescName'],
                'Type' => $row['State'],
            );
        }
        echo json_encode(array(
            'CODE' => 'OK',
            'Mess' => 'Pobrano dane',
            'Users' => $users,
            "Queyr" => SearchQuery(),
        ));
    } else echo json_encode(array(
        'CODE' => 'OK',
        'Mess' => 'Brak użytkownikow!',
        "Queyr" => SearchQuery(),
    ));
} else echo json_encode(array(
    'CODE' => 'NO',
    'Mess' => 'Nie masz dostepu!',
));
$sql_cursor->close();