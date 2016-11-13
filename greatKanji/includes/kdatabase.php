<?php
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
          self::$cont =  new PDO( "mysql:host=".self::$dbHost.";"."dbname=".self::$dbName, self::$dbUsername, self::$dbUserPassword);
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
}//- See more at: http://www.startutorial.com/articles/view/php-crud-tutorial-part-1#sthash.KzLKJTw2.dpuf
?>
