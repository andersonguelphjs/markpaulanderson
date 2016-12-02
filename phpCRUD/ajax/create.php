<?php

if($_SERVER['REQUEST_METHOD'] == "POST"){

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
    require("lib.php");

    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $object = new CRUD();

    $object->Create($first_name, $last_name, $email);
}
else{
echo "not post: create";
}
?>
