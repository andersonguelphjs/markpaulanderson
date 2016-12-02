<?php
//if (isset($_POST['id']) && isset($_POST['id']) != "") {
if($_SERVER['REQUEST_METHOD'] == "POST"){
//echo "pst";

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
    require 'lib.php';
    $user_id = $_POST['id'];
//echo "user_id ".$user_id;
    $object = new CRUD();
    $object->Delete($user_id);
//}
}
else{
echo "not post";

}
?>
