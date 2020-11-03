<?php
include 'php/bd.php';

$conn = DB::getInstance() -> getConnection();
$regists = $conn -> prepare("select * from usuarios;");
$regists->setFetchMode(PDO::FETCH_ASSOC);
$regists->execute();

while ($regist = $regists->fetch()) {
    echo "CI: ".$regist['id']."<br>";
    echo "Nombre: ".$regist['name']."<br>";
    echo "Apellido: ".$regist['last_name']."<br>";
    echo "Email: ".$regist['email']."<br><hr>";
}

?>