<?php

$hostname = 'remotemysql.com:3306';
$username = 'nN3gpTO4n0';
$password = 'mOlXuDZFaT';
$database = 'nN3gpTO4n0';

header('Content-Type: text/txt; charset=utf-8');
$conexion = mysqli_connect($hostname, $username, $password, $database) or
die("Problemas con la conexión");

$query = "'SELECT * FROM USUARIOS'";

$registros = mysqli_query($conexion, $query) or
die("Problemas en el select" . mysqli_error($conexion));

while ($reg = mysqli_fetch_array($registros)) {
    $vec[] = $reg;
}

$cad = json_encode($vec);
echo $cad;
?>