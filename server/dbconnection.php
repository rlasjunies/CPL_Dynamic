<?php
  
function getConnection() {
    $dbhost="localhost";
    $dbuser="cpairela_cpl";
    $dbpass="V#8K6#6Kx{*G";
    $dbname="cpairela_cpl";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}
 
?>