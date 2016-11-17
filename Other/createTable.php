<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Untitled Document</title>
</head>

<body>


<?php

// Make a MySQL Connection

$dbhost = "kanji3.db.11902129.hostedresource.com";
$dbuser = "kanji3";
$dbpass = "e5R%eL95Ef";

mysql_connect($dbhost, $dbuser, $dbpass) or die(mysql_error());
mysql_select_db("kanji3") or die(mysql_error());

// Create a MySQL table in the selected database
mysql_query("CREATE TABLE kanjiTABLE1 (
id INT NOT NULL AUTO_INCREMENT, 
PRIMARY KEY(id),
eng TEXT(255), 
kan TEXT(255), 
mem TEXT(8160), 
voc TEXT(8160), 
pro TEXT(255), 
isR INT, 
ind INT, 
lev INT, 
num1 INT, 
num2 FLOAT(8,2), 
num3 FLOAT(8,2), 
text1 TEXT(255), 
text2 TEXT(8160), 
text3 TEXT(8160), 
age INT)")
 or die(mysql_error());  

echo "Table Created!";

?>

</body>
</html>