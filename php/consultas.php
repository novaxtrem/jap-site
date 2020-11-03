<?php
 

$hostname='remotemysql.com:3306';
$username='nN3gpTO4n0';
$password='mOlXuDZFaT';
$database='nN3gpTO4n0';

$conexion = mysqli_connect($hostname, $username, $password,$database) 
or die("Ha sucedido un error inexperado en la conexion de la base de datos");

//generamos la consulta
$sql = "SELECT * FROM usuarios";
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if (!$result = mysqli_query($conexion, $sql)) {
    die();
}

$usuarios = array(); //creamos un array

while ($row = mysqli_fetch_array($result)) {
    $id = $row['id'];
    $nombre = $row['name'];
    $apellido = $row['last_name'];
    $edad = $row['age'];
    $imagenPerfil = $row['image_profile'];
    $telefono = $row['phone_num'];
    $email = $row['email'];

    $usuarios[] = array('id' => $id, 'name' => $nombre, 'last_name' => $apellido, 'age' => $edad,
        'image_profile' => $imagenPerfil, 'phone_num' => $telefono, 'email' => $email);

}

//desconectamos la base de datos
//$close = mysqli_close($conexion) or die("Ha sucedido un error inexperado en la desconexion de la base de datos");

//Creamos el JSON
$json_string = json_encode($usuarios);
echo $json_string;
?>