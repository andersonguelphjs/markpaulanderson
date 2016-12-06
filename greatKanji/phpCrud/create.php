<?php

// for json

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// $_SERVER['REQUEST_METHOD'] = "POST";

if ($_SERVER['REQUEST_METHOD'] == "POST")
	{
	require 'kdatabase.php';
  require 'helperFunctions.php';

	$payload = json_decode(file_get_contents('php://input') , true);

	// $payload = array("table"=>"radicals","radical"=>"hey","code"=>"ho","meaning"=>"lets","similar"=>"go");

	$table = test_input($payload['table']);

	// $table = "radicals";

	$fields = "(";
	$valueQs = "(";
	$valueArr = [];
	foreach($payload as $key => $value)
		{
		if ($key != "table")
			{
			$v = test_input($value);
			if (!empty($valueArr))
				{
				$fields.= ", " . $key;
				$valueQs.= ", ?";
				}
			  else
				{
				$fields.= $key;
				$valueQs.= "?";
				}

			array_push($valueArr, $v);
			}
		}

	$fields.= ")";
	$valueQs.= ")";
	$sql = "INSERT INTO " . $table . " " . $fields . " values" . $valueQs;

	// $pdo = Database::connect('greatKanji','localhost','root','');

	$pdo = Database::connect('kanji', 'localhost', 'root', 'rootPass');
	$q = $pdo->prepare($sql);
	$q->execute($valueArr);
	}
  else
	{
	echo "not post: update";
	}

?>
