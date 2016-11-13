<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Untitled Document</title>
</head>

<body>


<html>
<head>
<title>Add New Record in MySQL Database</title>
</head>
<body>
<?php
if(isset($_POST['add']))
{
	
$dbhost = "kanji3.db.11902129.hostedresource.com";
$dbuser = "kanji3";
$dbpass = "e5R%eL95Ef";
$conn = mysql_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
  die('Could not connect: ' . mysql_error());
}

if(! get_magic_quotes_gpc() )
{

   $eng= addslashes ($_POST['eng']);
   $kan= addslashes ($_POST['kan']);
   $mem= addslashes ($_POST['mem']);
   $pro= addslashes ($_POST['pro']);
   $voc= addslashes ($_POST['voc']);
   $isR= addslashes ($_POST['isR']);
   $lev= addslashes ($_POST['lev']);
   $text2= addslashes ($_POST['text2']);

}
else
{
   $eng = $_POST['eng'];
   $kan = $_POST['kan'];
   $mem = $_POST['mem'];
   $pro = $_POST['pro'];
   $voc = $_POST['voc'];
   $isR = $_POST['isR'];
   $lev = $_POST['lev'];
   $text2 = $_POST['text2'];

}


$sql = "INSERT INTO kanjiTABLE1 ".
       "(eng, kan, mem, pro, voc, isR, lev, text2) ".
       "VALUES('$eng', '$kan', '$mem', '$pro', '$voc', '$isR', '$lev', '$text2')";
       
mysql_select_db('kanji3');
$retval = mysql_query( $sql, $conn );
if(! $retval )
{
  die('Could not enter data: ' . mysql_error());
}
echo "Entered data successfully\n";
mysql_close($conn);
}
else
{
?>


<form method="post" action="<?php $_PHP_SELF ?>">
<table width="400" border="0" cellspacing="1" cellpadding="2">

<tr>
<td width="100">English Meaning</td>
<td><input name="eng" type="text" id="eng"></td>
</tr>

<tr>
<td width="100">Kanji</td>
<td><input name="kan" type="text" id="kan"></td>
</tr>

<tr>
<td width="100">Pic Link</td>
<td><input name="text2" type="text" id="text2"></td>
</tr>

<tr>
<td width="100">Meme</td>
<td><input name="meme" type="text" id="meme"></td>
</tr>

<tr>
<td width="100">Pronunciation</td>
<td><input name="pro" type="text" id="pro"></td>
</tr>

<tr>
<td width="100">Is radical</td>
<td><input name="is" type="text" id="is"></td>
</tr>

<tr>
<td width="100">Level</td>
<td><input name="lev" type="text" id="lev"></td>
</tr>

<tr>
<td width="100">Context</td>
<td><input name="voc" type="text" id="voc"></td>
</tr>
<tr>
<td width="100"> </td>
<td> </td>
</tr>
<tr>
<td width="100"> </td>
<td>
<input name="add" type="submit" id="add" value="Add Kanji">
</td>
</tr>
</table>
</form>
<?php
}
?>
</body>
</html>
</body>
</html>