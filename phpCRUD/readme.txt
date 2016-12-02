install bitnami stack

http://www.itechempires.com/2016/07/pdo-crud-operations-using-php-bootstrap/
open php myadmin
create database 'myDatabase'

then go to 'sql' panel to create a table

CREATE TABLE  `users` (
`id` INT( 11 ) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`first_name` VARCHAR( 40 ) NOT NULL ,
`last_name` VARCHAR( 40 ) NOT NULL ,
`email` VARCHAR( 50 ) NOT NULL
) ENGINE = MYISAM ;

create folder and file
ajax/db_connection.php
