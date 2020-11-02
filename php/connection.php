<?php
$servername = "remotemysql.com:3306";
$username = "nN3gpTO4n0";
$password = "mOlXuDZFaT";


echo '<script language="javascript">';
echo 'alert("message successfully sent")';
echo '</script>';
// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
$mensaje ="cosopum";
  die("Connection failed: " . $conn->connect_error);
  echo "<script type='text/javascript'>alert('$mensaje');</script>";
}

echo "<script type='text/javascript'>alert('$conn');</script>";
echo "Connected successfully";
?>