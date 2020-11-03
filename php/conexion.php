
<?php
	function Conectar()
	{
		$conexion = null;
		$host = 'remotemysql.com:3306';
		$user = 'nN3gpTO4n0';
		$pwd = 'mOlXuDZFaT';
		$db = 'nN3gpTO4n0';

		try {
			$conexion = new PDO('mysql:host=' . $host . ';dbname=' . $db, $user, $pwd);
		} catch (PDOException $e) {
			echo '<p>No se puede conectar a la base de datos !!</p>';
			exit;
		}
		return $conexion;
	}
?>