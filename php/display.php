<?php
include "php/connection.php";
mysqli_select_db("samples", $con);
$result = mysqli_query("select * from usuarios", $con);
echo "<p>$result</p>";
while ($data = mysqli_fetch_row($result)) {

    // echo "<p>$data[0]</p>";

}
