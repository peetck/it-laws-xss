<!-- <ul> -->
<?php

$handle = fopen("tokens.txt", "r");

$tokenArr = array();

if ($handle) {
    while (($line = fgets($handle)) !== false) {
        if (!in_array($line, $tokenArr)) {
            array_push($tokenArr, $line);
        }
        // echo "<li>" . $line . "</li>";
    }
    fclose($handle);
} else {
}
print_r($tokenArr)
?>

<!-- </ul> -->