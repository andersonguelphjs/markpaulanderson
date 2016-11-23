
<?php

$handle = curl_init();
curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
//curl_setopt($ch, CURLOPT_URL,'http://localhost/devDocs/greatKanji/phpCrud/pdo.php?&foo=yes');
curl_setopt($handle, CURLOPT_URL,'http://markpaulanderson.com/greatKanji/phpCrud/pdo.php?&foo=yes');
$content = curl_exec($handle);

//$response = curl_exec($handle);

/* Check for 404 (file not found).*/
//$httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);

//echo $httpCode;
//echo "content";
echo $content;

curl_close($handle);
