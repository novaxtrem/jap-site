<?php
//Configuracion de la conexion a base de datos
$bd_host = "remotemysql.com:3306"; 
$bd_usuario = "nN3gpTO4n0"; 
$bd_password = "mOlXuDZFaT"; 
$bd_base = "nN3gpTO4n0"; 

$con = mysql_connect($bd_host, $bd_usuario, $bd_password); 

mysql_select_db($bd_base, $con); 

//consulta todos los empleados

$sql=mysql_query("SELECT * FROM usuarios",$con);

//muestra los datos consultados

while($fila=$resultado -> fetch_array()){
	$categorias[] = array_map('utf8_encode', $fila);
}

echo json_encode($categorias);
$resultado -> close();


?>