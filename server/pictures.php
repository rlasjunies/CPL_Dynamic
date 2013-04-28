<?php

/*
$files = array();

$dir = opendir('pictures');
while ($file = readdir($dir)) {
    if ($file == '.' || $file == '..') {
        continue;
    }

    $files[] = $file;
}

header('Content-type: application/json');
echo json_encode($files);
*/
echo json_encode(glob("pictures/*.{jpg,png,jpeg}", GLOB_BRACE));
?>

