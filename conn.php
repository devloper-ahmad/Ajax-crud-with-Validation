<?php

$con = mysqli_connect("localhost", "root", "", "ajax crud");

if (!$con) {
    die('Connection Failed' . mysqli_connect_error());
}
