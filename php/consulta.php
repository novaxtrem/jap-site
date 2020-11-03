<?php
//Configuracion de la conexion a base de datos
$bd_host = "remotemysql.com:3306";
$bd_usuario = "nN3gpTO4n0";
$bd_password = "mOlXuDZFaT";
$bd_base = "nN3gpTO4n0";
$con = mysql_connect($bd_host, $bd_usuario, $bd_password);
mysql_select_db($bd_base, $con);
//consulta todos los empleados
$sql = mysql_query("SELECT * FROM usuarios", $con);
//muestra los datos consultados
echo "</p>Nombres - Departamento - Sueldo</p> \n";
while ($row = mysql_fetch_array($sql)) {
    echo "<p>" . $row['name'] . " - " . "</p> \n";
}
?>