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

if($_SERVER['REQUEST_METHOD'] == "POST"){
require 'kdatabase.php';
$payload = file_get_contents("php://input");
$_POST = json_decode($payload, true);
$table = test_input($_POST['table']);
$id = test_input($_POST['id']);
$sql = "";

 $i =0;
 foreach($_POST as $key => $value) //each item in json string
{
  $v = test_input($value);
  if ($key !="id" && $key !="table"){
  if ($sql=""){
  $sql.=", ".$key." = '".$v."'";
  }
  else{
    $sql.=$key." = '".$v."'";
  }
  }
  $i+=1;
}

$sql= "UPDATE ".$table." SET ".$sql." WHERE id = ".$id;

//$pdo = Database::connect('greatKanji','localhost','root','');
$pdo = Database::connect('kanji','localhost','root','rootPass');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$q = $pdo->prepare($sql);
$q->execute();
}
else{
echo "not post: update";
}
?>
