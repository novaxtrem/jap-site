


<?php
         $dbhost = 'remotemysql.com:3306';
         $dbuser = 'nN3gpTO4n0';
         $dbpass = 'mOlXuDZFaT';
         $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
         
         if(! $conn ) {
            die('Could not connect: ' . mysqli_error());
            die ("<center>No se puede conectar con la base de datos\n</center>\n");
         }
         echo 'Connected successfully';
         mysqli_close($conn);
      ?>