<?php


if($_SERVER['REQUEST_METHOD'] == "POST"){
//echo "pst";

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
//echo $_POST['id'];


//if (isset($_POST['id']) && isset($_POST['id']) != "") {
    require 'lib.php';

    $user_id = $_POST['id'];
///    echo "userId".$user_id;
//var_dump(file_get_contents('php://input'));

/////$json = json_decode(file_get_contents('php://input'), true);
//echo "json";
//echo $json;
//echo "jsonId";
//echo $json['id'];
//echo "post";
//var_dump( $_POST );

    $object = new CRUD();

    echo $object->Details($user_id);
//}
//echo "not userId";
}
else{
echo "not post";

}
?>
