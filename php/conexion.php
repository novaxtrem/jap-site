


<?php
$dbhost = 'remotemysql.com:3306';
$dbuser = 'nN3gpTO4n0';
$dbpass = 'mOlXuDZFaT';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);

if (!$conn) {
    die('Could not connect: ' . mysqli_error());
    echo '<script type="text/JavaScript">prompt("not ok");</script>';
} else {
    echo 'Connected successfully' . $conn;
    echo '<script type="text/JavaScript">prompt("ok");</script>';
}

mysqli_close($conn);
?>