<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Untitled Document</title>
</head>

<body>
<?php
$servername = "kanji3.db.11902129.hostedresource.com";
$username = "kanji3";
$password = "e5R%eL95Ef";

$dbname = "kanji3";

$link = mysql_connect($servername, $username, $password) or die( " Unable to connect to server ");

$query = "CREATE DATABASE IF NOT EXISTS $dbname";
if (mysql_query($query)) 
{
 echo "Database <b>$dbname</b> created successfully <br />";
} 
else 
{
 echo "Error in creating database: <br /><br />". mysql_error ();
}
?>
</body>
</html>