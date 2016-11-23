<?php
/*
The behaviour has to be different on the basis
of the request method.
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require 'kdatabase.php';
/*
$delimiter = '/';
        $dbhost = "greatKanji.db.11902129.hostedresource.com";
        $dbuser = "greatKanji";
        $dbpass = "e5R%eL95Ef";
*/
//$validTables = array("kanji2","radicals");



        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      //  $sql = "SELECT * FROM radicals ORDER BY id ASC";
        //echo $sql;
      //  $q = $pdo->prepare($sql);
      //  $q->execute();
      //  $data = $q->fetchAll(PDO::FETCH_ASSOC);

        //encode to json & output
  // $callback = isset($_GET['callback'])?$_GET['callback']:'JSON_CALLBACK';



 //   echo $callback."(".json_encode($array).")";
        //$json = $data.substr(3, strlen($data)-1);
      //  $json = json_encode($data);
      //  echo $json;

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":
    //echo "get it mang";
    //break;
  //  }

       // echo "get";

        $url=strtok($_SERVER["REQUEST_URI"],'?');
        //$arr = explode("/", $url);

      //  $key = array_search('rest', $arr); //get arr values only after 'rest'
       //$table = $arr[$key+1];
        //echo "table: ".$table; //table name
       // $id = $arr[$key+2];  //id
        $sqlParams = "";
        parse_str($_SERVER['QUERY_STRING'], $queryParam);
        //echo ;
        //echo '<pre>'; print_r($queryParam); echo '</pre>';
/*
        if (in_array($table, $validTables)){
       // echo "get all";
        $i=0;
        $condition ="WHERE";
        if (!empty($queryParam)){
        foreach($queryParam as $key => $value) //each item in json string
        {
          //echo "key: ".$key." value: ".$value;
          if ($i==1) {
          $condition = "AND";
          }
          if (is_numeric($value)) {
           //echo "cond1";
           $sqlParams = $sqlParams." ".$condition." ".$key." = ".$value;
           }
           else {
           if (strpos($value, ';') !== FALSE) {
           //echo "cond2";
           $numArr=explode(";", $value);

           for ($j=1;$j<count($numArr);$j++){
           if (is_numeric($numArr[$j])) {
           if ($j!==1) {
           $bracket .=','.$numArr[$j];
           }
           else{
           $bracket .= $numArr[$j];
           }
           }
           }
           $sqlParams = $sqlParams." ".$condition." ".$key." IN (".$bracket.")";
           //WHERE id IN (1,2,3)"
           }
           else{
           //echo "cond3";
           $sqlParams = $sqlParams." ".$condition." '".$key."' = ".$value;
           }
           }


        }
        }
        */
      //  $sql = "SELECT * FROM ".$table." ".$sqlParams." ORDER BY id ASC";
       $sql = "SELECT * FROM radicals ORDER BY id ASC";
        //echo $sql;
        $q = $pdo->prepare($sql);
        $q->execute();
        $data = $q->fetchAll(PDO::FETCH_ASSOC);
      //  }
        //encode to json & output
  //$callback = isset($_GET['callback'])?$_GET['callback']:'JSON_CALLBACK';



 //echo $callback."(".json_encode($data).")";
        //echo "<br>";
        $json = json_encode($data);
        echo $json;

        break;

    case "PUT":
        echo "put";

        $arr = explode("/", $_SERVER['REQUEST_URI']);

        $key = array_search('rest', $arr); //get arr values only after 'rest'
        $table = $arr[$key+1]; //table name
        $id = $arr[$key+2];  //id

        if (is_int(intval($id)) && in_array($table, $validTables)){//valid call

        //get json from sent data
        $json = json_decode(file_get_contents('php://input'), true);

         //update each json value
         foreach($json as $key => $value) //each item in json string
        {
          if (is_numeric($value)) {
           $sql = "UPDATE ".$table." set ".$key." = ".$value." WHERE id = ". $id;
           }
           else {
           $sql = "UPDATE ".$table." set ".$key." = '".$value."' WHERE id = ". $id;
           }
           echo $sql;
          $q = $pdo->prepare($sql);
          $q->execute(array($value));
           echo "key: ".$key." value: ".$value;
        }

        }
        break;

    case "DELETE":
        echo "delete";
        $arr = explode("/", $_SERVER['REQUEST_URI']);

        $key = array_search('rest', $arr); //get arr values only after 'rest'
        $table = $arr[$key+1]; //table name
        $id = $arr[$key+2];  //id

        if (is_int(intval($id)) && in_array($table, $validTables)){//valid call
        $sql = "DELETE FROM ".$table."  WHERE id = ?";
        $q = $pdo->prepare($sql);
        $q->execute(array($id));

        }
        break;

    case "POST":
        echo "post";
        $arr = explode("/", $_SERVER['REQUEST_URI']);

        $key = array_search('rest', $arr); //get arr values only after 'rest'
        $table = $arr[$key+1]; //table name

        if (in_array($table, $validTables)){

        $json = json_decode(file_get_contents('php://input'), true);

         if ($table=="kanji2") { //for each table, need smthng like this
        echo 'kanji: '.$json['kanji'];
        echo 'onR: '.$json['onR'];
        echo 'romon: '.$json['romon'];
        echo 'kun: '.$json['kun'];
        echo 'romkun: '.$json['romkun'];
        echo 'kLevel: '.$json['kLevel'];
        echo 'meaning: '.$json['meaning'];
        echo 'meme: '.$json['meme'];
        echo 'numTimes: '.$json['numTimes'];
        echo 'correct: '.$json['correct'];
        echo 'image: '.$json['image'];
        echo 'suff: '.$json['suff'];
        echo 'radical: '.$json['radical'];
        echo 'radIndices: '.$json['radIndicies'];

            $kanji   = $json['kanji'];
            $onR      = $json['onR'];
            $romon   = $json['romon'];;
            $kun     = $json['kun'];
            $romkun  = $json['romkun'];
            $kLevel   = $json['kLevel'];
            $meaning = $json['meaning'];
            $meme = $json['meme'];
            $numTimes = $json['numTimes'];
            $correct = $json['correct'];
            $image = $json['image'];
            $suff = $json['suff'];
            $radical=$json['radical'];
            $radIndices=$json['radIndices'];
            $sql = "INSERT INTO kanji2 (kanji, onR, romon, kun, romkun, kLevel, meaning, meme, numTimes, radical, radIndices) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $q = $pdo->prepare($sql);
            $q->execute(array($kanji,$onR,$romon,$kun,$romkun,$kLevel,$meaning,$meme,$numTimes,$radical,$radIndices));
       }
       else if ($table=="radicals") {
       $radical = $json['radical'];
       $code  = $json['code'];

                   $sql = "INSERT INTO radicals (radical, code) values(?, ?)";
            $q = $pdo->prepare($sql);
            $q->execute(array($radical,$code));

       }

            echo "Entered data successfully\n";
      }
            break;

}
Database::disconnect();

?>
