
<?php
$dbhost = 'https://remotemysql.com';
$dbuser = 'nN3gpTO4n0';
$dbpass = 'mOlXuDZFaT';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    echo '<script type="text/JavaScript">prompt("not ok");</script>';
} else {
  
    echo '<script type="text/JavaScript">prompt("Connected successfully");</script>';
}

mysqli_close($conn);
?>