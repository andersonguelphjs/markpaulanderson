<?php

class Database
{

/* web *//*
    private static $dbName = 'kanji2';
    private static $dbHost = 'localhost:3306';
    private static $dbUsername = 'markpaul1972';
    private static $dbUserPassword = 'REX1ABED3qUarr';
*/

    /*home*
    private static $dbName = 'greatKanji';
    private static $dbHost = 'localhost';
    private static $dbUsername = 'root';
    private static $dbUserPassword = '';
*/
/*work */
/*
    private static $dbName = 'kanji';
    private static $dbHost = 'localhost';
    private static $dbUsername = 'root';
    private static $dbUserPassword = 'rootPass';
    */
    private static $dbName = '';
    private static $dbHost = '';
    private static $dbUsername = '';
    private static $dbUserPassword = '';

    private static $cont  = null;

    public function __construct() {
        die('Init function is not allowed');
    }

    public static function connect($n, $h, $u, $p)
    {
      Database::$dbName = $n;
      Database::$dbHost = $h;
      Database::$dbUsername = $u;
      Database::$dbUserPassword = $p;
       // One connection through whole application
       if ( null == self::$cont )
       {
        try
        {
          self::$cont =  new PDO( "mysql:host=".self::$dbHost.";"."dbname=".self::$dbName, self::$dbUsername, self::$dbUserPassword,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); //utf8 allows Japanese
        }
        catch(PDOException $e)
        {
          die($e->getMessage());
        }
       }
       return self::$cont;
    }

    public static function disconnect()
    {
        self::$cont = null;
    }
}

?>
