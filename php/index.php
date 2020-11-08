<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

$token = $_GET["token"];

$file = fopen("tokens.txt", "a");
echo fwrite($file, $token . "\n");
fclose($file);
