<?php
include 'conexion.php';

/*$mimiatura = $_POST['mimiatura'];
$tituloCategoria = $_POST['titulo-categoria'];
$articulosCategoria = $_POST['articulos-categoria'];
$descripcionCategoria = $_POST['descripcion-categoria'];
*/

	$consultoCategorias = "SELECT * FROM `usuarios`";
	$resultado = $conexion -> query($consultoCategorias);
	
	while($fila=$resultado -> fetch_array()){
		$categorias[] = array_map('utf8_encode', $fila);
	}

	echo json_encode($categorias);
	$resultado -> close();

?>
