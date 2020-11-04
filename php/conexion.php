
<?php
$dbhost = 'remotemysql.com:3306';
$dbuser = 'nN3gpTO4n0';
$dbpass = 'mOlXuDZFaT';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    echo '<script type="text/JavaScript">prompt("not ok");</script>';
}
echo "Connected successfully";
echo '<script type="text/JavaScript">prompt("ok");</script>';

mysqli_close($conn);
?>