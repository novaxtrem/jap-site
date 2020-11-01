<?php
$servername = "https://remotemysql.com/";
$username = "nN3gpTO4n0";
$password = "mOlXuDZFaT";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
