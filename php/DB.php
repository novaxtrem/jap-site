<?php

class DB{
    private static $instance = null;
    private $conn;

    private $host = 'remotemysql.com:3306';
    private $user ='nN3gpTO4n0';
    private $pass = 'mOlXuDZFaT';
    private $name = 'nN3gpTO4n0';

    private function __construct(){
        $this->conn = new PDO("mysql:host={$this->host};
                               dbname={$this->name}", 
                               $this->user, 
                               $this->pass,
                               array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"))
                               or die("Error al establecer la conexion");
    }

    public static function getInstance(){
        if (!self::$instance) {
            self::$instance = new DB();
        }
        return self::$instance;
    }

    public function getConnection(){
        return $this -> conn;
    }

}


?>