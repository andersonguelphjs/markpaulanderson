<?php
/*
The behaviour has to be different on the basis
of the request method.
specify table &table=kanji
specify
http://localhost/greatKanji/phpCrud/pdo.php?&table=kanji2&in=2241;153$key=id

//use
http://localhost/greatKanji/phpCrud/pdo.php?&table=kanji2&contains=man;officer&column=meaning;meaning&andOr=AND

//put
//http://localhost/greatKanji/phpCrud/pdo.php?&table=radicals

//delete, update
http://localhost/greatKanji/phpCrud/pdo.php?&table=radicals&id=" + id
*/
//for json
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require 'kdatabase.php';

$pdo = Database::connect();
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

parse_str($_SERVER['QUERY_STRING'], $queryParam);
$id = $queryParam['id'];
$table = $queryParam['table'];

//we may have multiple conditions in a query (usuallly sepearated by ;)
//so return something that can be consumed by SQL
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


//return an and, or, contains query
function parseQueryParamContains($str, $column, $andOr, $delim){

  if (strpos($str, $delim) != FALSE) { //is there more than one
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
     $query = $column." LIKE '%".$str."%'";
   }

   return $query;

}


switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":
    //default will get allows

//http://localhost/greatKanji/phpCrud/pdo.php?&table=kanji2&in=2241;153$key=id
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

    $sql = "SELECT * FROM ".$table." ".$condition." ORDER BY id ASC";
      //echo $sql;
        $q = $pdo->prepare($sql);
        $q->execute();
        $data = $q->fetchAll(PDO::FETCH_ASSOC);

        $json = json_encode($data);
        echo $json;
        break;

    case "PUT": //update
        //get json from sent data
          $json = json_decode(file_get_contents('php://input'), true);
          $sql = "UPDATE ".$table." SET ";

           $i =0;
           foreach($json as $key => $value) //each item in json string
          {
            if ($i !==0){
            $sql.=", ".$key." = '".$value."'";
            }
            else{
              $sql.=$key." = '".$value."'";
            }
            $i+=1;
          }
          $sql.=" WHERE id = ".$id;
//UPDATE settings SET postsPerPage = $postsPerPage, style= $style WHERE id = '1'
      $q = $pdo->prepare($sql);
      $q->execute();
        break;

    case "DELETE":
        //echo "delete";
        $sql = "DELETE FROM ".$table."  WHERE id = ".$id;
        $q = $pdo->prepare($sql);
        $q->execute();
        break;

    case "POST": //new itesm
       $json = json_decode(file_get_contents('php://input'), true);

       $fields = "(";
       $valueQs = "(";
       $valueArr = [];
       $i=0;
       foreach($json as $key => $value){
          if ($i !==0){
            $fields .= ", ".$key;
            $valueQs .= ", ?";
          }
          else{
            $fields .= $key;
            $valueQs .= "?";
          }
          array_push($valueArr, $value);
          $i+=1;
       }
       $fields .= ")";
       $valueQs .= ")";

       $sql = "INSERT INTO ".$table." ".$fields." values".$valueQs;
       $q = $pdo->prepare($sql);
       $q->execute($valueArr);
            break;

}
Database::disconnect();
?>
