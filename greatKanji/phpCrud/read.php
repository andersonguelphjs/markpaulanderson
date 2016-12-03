<?php
/*
The behaviour has to be different on the basis
of the request method.
specify table &table=kanji
specify
http://localhost/greatKanji/phpCrud/pdo.php?&table=kanji2&in=2241;153$key=id

//use
http://localhost/greatKanji/phpCrud/pdo.php?&table=kanji2&contains=man;officer&column=meaning;meaning&andOr=AND

//put
//http://localhost/greatKanji/phpCrud/pdo.php?&table=radicals

//delete, update
http://localhost/greatKanji/phpCrud/pdo.php?&table=radicals&id=" + id
*/
//for json
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$_SERVER['REQUEST_METHOD'] = "POST";
if($_SERVER['REQUEST_METHOD'] == "POST"){
require 'kdatabase.php';
$payload = file_get_contents("php://input");
$_POST = json_decode($payload, true);
$condition = "";

$table = $_POST['table'];
$table = "radicals";
$sql = "SELECT * FROM ".$table." ".$condition." ORDER BY id ASC";
//echo "table $table sql $sql";
$pdo = Database::connect();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $q = $pdo->prepare($sql);
    $q->execute();
    $data = $q->fetchAll(PDO::FETCH_ASSOC);

    $json = json_encode($data);
    echo $json;
    //*/

}
else{
echo "not post: update";
}
