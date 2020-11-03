<?php 
	require('php/conexion.php');
	$con = Conectar();
	$SQL = 'SELECT * FROM usuarios';
	$stmt = $con->prepare($SQL);
	$result = $stmt->execute();
	$rows = $stmt->fetchAll(\PDO::FETCH_OBJ);
	echo(json_encode($rows));
?>