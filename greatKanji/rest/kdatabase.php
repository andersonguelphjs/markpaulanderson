<?php
echo "db";
class Database
{

    private static $dbName = 'kanji';
    private static $dbHost = '50.62.209.157:3306';
    private static $dbUsername = 'markpaul1972';
    private static $dbUserPassword = 'REX1ABED3qUarr';
    private static $cont  = null;

    public function __construct() {
        die('Init function is not allowed');
    }

    public static function connect()
    {
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
