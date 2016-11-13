<?php 
$decoded = base64_decode($_POST['json'])
$jsonFile = fopen('http://blueandwhitedisease.com/myson.json','w+');
fwrite($jsonFile,$decoded);
fclose($jsonFile);
?>