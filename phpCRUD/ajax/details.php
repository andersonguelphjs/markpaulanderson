<?php

if($_SERVER['REQUEST_METHOD'] == "POST"){

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

    require 'lib.php';

    $user_id = $_POST['id'];
    $object = new CRUD();
    echo $object->Details($user_id);
}
else{
echo "not post: details";
}
?>
