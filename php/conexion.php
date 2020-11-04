


<?php
$dbhost = 'remotemysql.com:3306';
$dbuser = 'nN3gpTO4n0';
$dbpass = 'mOlXuDZFaT';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);

if (!$conn) {
    die('Could not connect: ' . mysqli_error());
} else {
    echo 'Connected successfully'. $conn ;
}

mysqli_close($conn);
?>