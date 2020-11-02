<?php
$host         = "remotemysql.com:3306";
$username     = "nN3gpTO4n0";
$password     = "mOlXuDZFaT";
$dbname       = "nN3gpTO4n0";
$result_array = array();
/* Create connection */
$conn = new mysqli($host, $username, $password, $dbname);
/* Check connection  */
if ($conn->connect_error) {
    die("Connection to database failed: " . $conn->connect_error);
}
echo "<script type='text/javascript'>alert('$conn');</script>";
$conn->close();
?>