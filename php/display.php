<?php
include "php/connection.php";
mysqli_select_db("samples", $con);
$result = mysqli_query("select * from usuarios", $con);

echo "<table border='1' >
<tr>
<td> <b>Roll No</b></td>
<td><b>Name</b></td>
<td><b>Address</b></td>
<td><b>Stream</b></td></td>
<td><b>Status</b></td>";

while ($data = mysqli_fetch_row($result)) {
    echo "<tr>";
    echo "<td>$data[0]</td>";
    echo "<td>$data[1]</td>";
    echo "<td>$data[2]</td>";
    echo "<td>$data[3]</td>";
    echo "<td>$data[4]</td>";
    echo "</tr>";
}
echo "</table>";
?>