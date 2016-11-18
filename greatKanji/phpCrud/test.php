<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//$conn = null;
//$actual_link = "http://$_SERVER['HTTP_HOST']$_SERVER[REQUEST_URI]";
//echo $actual_link;
//if ($_SERVER['HTTP_HOST'] == "localhost"){
//$get_string = "pg_id=2&parent_id=2&document&video";

//parse_str($_SERVER[REQUEST_URI], $get_array);
//echo $_SERVER['HTTP_HOST'];
//print_r($get_array);
//echo $get_array;
$host = $_SERVER['HTTP_HOST'];

//$conn = new mysqli("localhost", "root", "rootPass", "test");
$conn = new mysqli("localhost", "root", "", "greatKanji");
//}
//if ($_SERVER['HTTP_HOST'] != "localhost"){
$outp = "";
if ($host == "localhost"){
//$result = $conn->query("SELECT myInt, myVarChar, myText FROM myTest");
$result = $conn->query("SELECT id, radical, code FROM radicals");

while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Name":"'  . $rs["id"] . '",';
    $outp .= '"City":"'   . $rs["radical"]        . '",';
    $outp .= '"Country":"'. $rs["code"]     . '"}';
}
$outp .= ',{"Name":"http://",';
$outp .= '"City":"'   . $_SERVER['HTTP_HOST']        . '",';
$outp .= '"Country":"'. $_SERVER['REQUEST_URI']     . '"}';
$outp ='{"records":['.$outp.']}';
//$outp ='{"records":['.$outp.',{"Name":,'."$_SERVER['HTTP_HOST']","City",'."$_SERVER['HTTP_HOST'].","Country":'.$_SERVER['HTTP_HOST'].'}]}';
$conn->close();


}
else{
  $outp ='{"records":[';
    $outp .= '{"Name":"http://",';
    $outp .= '"City":"'   . $_SERVER['HTTP_HOST']        . '",';
    $outp .= '"Country":"'. $_SERVER[REQUEST_URI]     . '"}]}';
  //  $outp ='{"records":['.$outp.']}';
//echo('{"Name",'.$_SERVER['HTTP_HOST'].',"City",'.$_SERVER['HTTP_HOST'].',"Country":'.$_SERVER['HTTP_HOST'].'}');
}
echo($outp);
?>
