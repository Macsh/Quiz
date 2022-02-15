<?php
$data = $_POST['data'];
file_put_contents('document.json', $data);
?>