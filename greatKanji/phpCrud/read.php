<?php

// for json

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");



// $_SERVER['REQUEST_METHOD'] = "POST";

if ($_SERVER['REQUEST_METHOD'] == "POST")
	{
	require 'kdatabase.php';
  require 'helperFunctions.php';
	$payload = file_get_contents("php://input");
	$_POST = json_decode($payload, true);
	$condition = "";
	$table = test_input($_POST['table']);
	$table = test_input("radicals");
	$sql = "SELECT * FROM " . $table . " " . $condition . " ORDER BY id ASC";

	// echo "table $table sql $sql";
	// $pdo = Database::connect('greatKanji','localhost','root','');

	$pdo = Database::connect('kanji', 'localhost', 'root', 'rootPass');
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$q = $pdo->prepare($sql);
	$q->execute();
	$data = $q->fetchAll(PDO::FETCH_ASSOC);
	$json = json_encode($data);
	echo $json;

	// */

	}
  else
	{
	echo "not post: read";
	}
