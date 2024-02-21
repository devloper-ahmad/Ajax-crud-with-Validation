<?php

include "header.php";

?>

<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
    <title>PHP - AJAX - CRUD</title>
</head>

<body>
    <!-- Add Modal -->
    <div class="modal fade Student_modal" id="Student_AddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width: 40%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Registration Form</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="error-message">
                    </div>
                    <!-- .................form field............ -->
                    <form name="form" class="post-form" method="POST">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" name="" id="name" class="checking_name">
                            <span id="error_name" style="color: red; margin-left : 137px;"></span>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="" class="checking_email">
                            <span id="error_email" style="color: red; margin-left : 137px;"></span>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="text" name="" id="phone">
                            <span id="error_phone" style="color: red; margin-left : 137px;"></span>
                        </div>
                    
                        <div class="form-group">
                            <label for="class">Gender:</label>
                            <select name="" id="gender" required>
                                <option value=""  >Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" name="" id="address"><span id="error_address" style="color: red; margin-left : 137px;"></span>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary student_add_ajax">Save</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Edit Modal -->
    <div class="modal fade Student_modal" id="StudentEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width: 40%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">EDIT Form</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="error-message_update">
                    </div>
                    <!-- .................form field............ -->
                    <form name="form" class="post-form" method="POST">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="hidden" name="" id="edit_id">
                            <input type="text" name="" id="edit_name" class="checking_edit_name">
                            <span id="error_edit_name" style="color: red; margin-left : 137px;"></span>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="edit_email" name="" class="checking_edit_email">
                            <span id="error_edit_email" style="color: red; margin-left : 137px;"></span>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="text" name="" id="edit_phone">
                            <span id="error_edit_phone" style="color: red; margin-left : 137px;"></span>
                        </div>
                        <div class="form-group">
                            <label for="class">Gender:</label>
                            <select name="" id="edit_gender">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" name="" id="edit_address">
                            <span id="error_edit_address" style="color: red; margin-left : 137px;"></span>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary student_edit_ajax">Update</button>
                </div>
            </div>
        </div>
    </div>
  
    
    <!-- home page -->
    <div class="container mt-5">
      
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                       
                            <button type="button" class="btn btn-black" style="background-color:black; color:white;" data-toggle="modal" data-target="#Student_AddModal">
                                Add data
                            </button>
                        
                    </div>
                    <div class="card-body" id="table-data">
                        <div class="message-show">
                        </div>
                        <table class="table table-bordered table-striped   table-hover">
                            <tr class="bg-dark text-white text-center">
                                <thead  class="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th class="action">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="studentdata">
                                </tbody>
                        </table>
                        <!-- pagination -->
                        <!-- <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">

                            </ul>
                        </nav> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="script1.js"></script>
</body>

</html>