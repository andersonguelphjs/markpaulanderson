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

 $table  = 'kanjiTABLE1';
 $column = 'pic'
 $add = mysql_query("ALTER TABLE $table ADD $column VARCHAR( 255 ) NOT NULL");

</body>
</html>