<?php
include "conn.php";


//Insert data
if (isset($_POST['checking_add'])) {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $gender = $_POST["gender"];
    $address = $_POST["address"];


    //Check email and name existance
    $check_name = $_POST["name_id"];
    $check_email = $_POST["email_id"];
    $checkuser = "SELECT id, email, name FROM ajaxx WHERE email = '$check_email' OR name = '$check_name'";
    $r = mysqli_query($con, $checkuser);
    $count = mysqli_num_rows($r);

    if ($count > 0) {
        $data = mysqli_fetch_assoc($r);
        if ($data['name'] == $check_name) {
            echo $return = json_encode(array('status' => 300, 'message' => "Name must be Unique"));
        } else if ($data['email'] == $check_email) {
            echo $return = json_encode(array('status' => 100, 'message' => "Email already registered"));
        }
    } else {
        $sql = "INSERT INTO ajaxx (name, email, phone , gender, address) VALUES ('$name','$email','$phone' , '$gender','$address')";

        $query_run = mysqli_query($con, $sql);
        if ($query_run) {
            echo $return = json_encode(array('status' => 200, 'message' => "Successfully Stored"));
        } else {
            echo $return = json_encode(array('status' => 500, 'message' => "Something Went Wrong!"));
        }
    }
}
//edit data
if (isset($_POST['checking_edit'])) {
    $stud_id = $_POST['stud_id'];
    $result_array = [];

    $query = "SELECT * FROM ajaxx WHERE id='$stud_id' ";
    $query_run = mysqli_query($con, $query);

    if (mysqli_num_rows($query_run) > 0) {
        foreach ($query_run as $row) {
            array_push($result_array, $row);
        }
        header('Content-type: application/json');
        echo json_encode($result_array);
    } else {
        echo $return = "No Record Found.!";
    }
}
//edit_data data
if (isset($_POST['checking_edit_data'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $gender = $_POST['gender'];
    $address = $_POST['address'];

    //For email already exits
    $check_name = $_POST["name_edit_id"];
    $check_email = $_POST["email_edit_id"];
    $checkuser = "SELECT id, email, name FROM ajaxx WHERE (email = '$check_email' OR name = '$check_name') AND id != '$id'";
    $r = mysqli_query($con, $checkuser);
    $count = mysqli_num_rows($r);
    if ($count > 0) {
        $data = mysqli_fetch_assoc($r);
        if ($data['name'] == $check_name) {
            echo $return = json_encode(array('status' => 300, 'message' => "Name must be Unique"));
        } else if ($data['email'] == $check_email) {
            echo $return = json_encode(array('status' => 100, 'message' => "Email already registered"));
        }
    } else {
        $query = "UPDATE `ajaxx` SET `name`='$name',`email`='$email' , `phone`='$phone', `gender`='$gender',`address`='$address' WHERE id = '$id'";
        $query_run = mysqli_query($con, $query);
        if ($query_run) {
            echo $return = json_encode(array('status' => 200, 'message' => "Successfully Updated"));
        } else {
            echo $return = json_encode(array('status' => 500, 'message' => "Something Went Wrong!"));
        }
    }
}
//delete data
if (isset($_POST['checking_delete'])) {
    $stud_id = $_POST['stud_id'];


    $query = "DELETE FROM ajaxx WHERE id='$stud_id' ";
    $query_run = mysqli_query($con, $query);

    if ($query_run) {
        echo $return = json_encode(array('status' => 200, 'message' => "Data deleted Successfully"));
    } else {
        echo $return = json_encode(array('status' => 500, 'message' => "Something wrong!"));
    }
}
//fetch data

// Fetch data with pagination
if (isset($_GET['fetch_data'])) {
    $recordsPerPage = 50;
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $start = ($page - 1) * $recordsPerPage;

    $query = "SELECT * FROM ajaxx LIMIT $start, $recordsPerPage";
    $query_run = mysqli_query($con, $query);
    $result_array = [];

    if (mysqli_num_rows($query_run) > 0) {
        foreach ($query_run as $row) {
            array_push($result_array, $row);
        }
        $totalRecordsQuery = mysqli_query($con, "SELECT COUNT(id) as total FROM ajaxx");
        $totalRecords = mysqli_fetch_assoc($totalRecordsQuery)['total'];
        $totalPages = ceil($totalRecords / $recordsPerPage);

        header('Content-type: application/json');
        echo json_encode(['records' => $result_array, 'totalPages' => $totalPages]);
    } else {
        echo $return = "<h4>No Record Found</h4>";
    }
}
