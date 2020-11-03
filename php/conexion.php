<?php
/* La conexion con MySQLi */
$servername = "remotemysql.com:3306";
$username = "nN3gpTO4n0";
$password = "mOlXuDZFaT";
$dbname = "nN3gpTO4n0";
$conn = mysqli_connect($servername, $username, $password, $dbname) or die("Conexion fallida: " . mysqli_connect_error());
// Imprime si existe algun error
if (mysqli_connect_errno()) {
    printf("La conexion ha fallado: %s\n", mysqli_connect_error());
    exit();
}
?>