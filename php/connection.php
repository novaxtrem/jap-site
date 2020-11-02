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

$sql ="SELECT * from usuarios";
$result = $conn->query($sql);
/* If there are results from database push to result array */
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
}
/* send a JSON encded array to client */
header('Content-type: application/json');
echo json_encode($result_array);
$conn->close();
?>