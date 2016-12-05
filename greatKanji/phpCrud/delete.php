<?php

//for json
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
//$_SERVER['REQUEST_METHOD'] = "POST";

if($_SERVER['REQUEST_METHOD'] == "POST"){
require 'kdatabase.php';
$payload = json_decode(file_get_contents('php://input'), true);
$table = test_input($payload['table']);
$id = test_input($payload['id']);
//$payload = array("table"=>"radicals","id"=>"504");
//$table = test_input($payload['table']);
//$id = test_input($payload['id']);
//$table = "radicals";
$sql = "DELETE FROM ".$table."  WHERE id = ".$id;
//$pdo = Database::connect('greatKanji','localhost','root','');
$pdo = Database::connect('kanji','localhost','root','rootPass');
$q = $pdo->prepare($sql);
$q->execute();
}
else{
echo "not post: delete";
}
?>
