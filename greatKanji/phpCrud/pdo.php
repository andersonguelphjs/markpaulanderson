<?php
/*
The behaviour has to be different on the basis
of the request method.
specify table &table=kanji
specify
http://localhost/greatKanji/phpCrud/pdo.php?&table=kanji2&in=2241;153$key=id


*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require 'kdatabase.php';

        $pdo = Database::connect();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      parse_str($_SERVER['QUERY_STRING'], $queryParam);

//we may have multiple conditions in a query (usuallly sepearated by ;)
//so return something that can be conumed by SQL
function parseQueryParamSingleField($param, $seperator, $delim, $queryParam){

if (array_key_exists($param,$queryParam) ) {
   if (strpos($queryParam[$param], $delim) !== FALSE) { //is there more than one
     $numArr=explode($delim, $queryParam[$param]);
     for ($j=0;$j<count($numArr);$j++){
       if (is_numeric($numArr[$j])) {
         if ($j!==0) {
         $bracket .=$seperator.$numArr[$j];
         }
         else{
         $bracket .= $numArr[$j];
         }
       }
     }
     return $bracket;
   }
}
return $queryParam[$param];
}

function parseQueryParamContains($str, $column, $andOr, $delim){

//echo $delim.$str.$column;
   if (strpos($str, $delim) != FALSE) { //is there more than one
  //   echo "multiople";
  $strArr=explode($delim, $str);
   $columnArr=explode($delim, $column);
     for ($j=0;$j<count($strArr);$j++){
       if ($j!==0) {
        $query .= " ".$andOr." ".$columnArr[$j]." LIKE '%".$strArr[$j]."%'";
      }
      else{
      $query = $columnArr[$j]." LIKE '%".$strArr[$j]."%'";
      }
     }
   }
   else {
  //   echo "just one";
     $query = $column." LIKE '%".$str."%'";
   }

   return $query;

}


switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":
    //default will get allows

  //prioritize 'in'
        if (array_key_exists("in",$queryParam) ) {
          $nums = parseQueryParamSingleField('in',',',';',$queryParam);
          $condition = "WHERE id in (".$nums.")";
        }

         else if (array_key_exists("contains",$queryParam) AND array_key_exists("column",$queryParam)) {

          $contains = $queryParam['contains'];
          $column = $queryParam['column'];
          if (array_key_exists("andOr",$queryParam) ){
           $andOr = $queryParam['andOr'];
          }
          else{
              $andOr='AND';
          }
        //  echo "conatins1 ".$contains." key ".$key;
         $values = parseQueryParamContains($contains, $column, $andOr, ";");
      //   echo "v1 ".$values;
          $condition = "WHERE ".$values;

         }

    $sql = "SELECT * FROM ".$queryParam['table']." ".$condition." ORDER BY id ASC";
      //echo $sql;
        $q = $pdo->prepare($sql);
        $q->execute();
        $data = $q->fetchAll(PDO::FETCH_ASSOC);

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
