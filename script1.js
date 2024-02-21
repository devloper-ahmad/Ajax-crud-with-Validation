$(document).ready(function () {
    // click on add button
    $('.student_add_ajax').click(function (e) {
        e.preventDefault();
        // name validation
        var name_filter = /^[a-zA-Z ]*$/;
        var name = $('#name').val();
        if ($.trim(name).length == 0) {
            error_name = "Please enter name";
            $('#error_name').text(error_name);
        } else if (!(name_filter.test(name))) {
            error_name = "Only letters and whitespaces are allowed";
            $('#error_name').text(error_name);
        } else {
            error_name = "";
            $('#error_name').text(error_name);
        }
        // email validation
        var email_filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var email = $('#email').val();
        if ($.trim(email).length == 0) {
            error_email = "Please enter email";
            $('#error_email').text(error_email);
        } else if (!(email_filter.test(email))) {
            error_email = "Invalid Email Format";
            $('#error_email').text(error_email);
        } else {
            error_email = "";
            $('#error_email').text(error_email);
        }

        // phone validation
        var phone = $('#phone').val();
        if ($.trim(phone).length == 0) {
            error_phone = "Please enter phone";
            $('#error_phone').text(error_phone);
        } else {
            error_phone = "";
            $('#error_phone').text(error_phone);
        }
        var address = $('#address').val();
        if ($.trim(address).length == 0) {
            error_address = "Please enter your address";
            $('#error_address').text(error_address);
        } else {
            error_address = "";
            $('#error_address').text(error_address);
        }

        var checking_email = $('.checking_email').val();
        var checking_name = $('.checking_name').val();

        if (error_name != '' || error_email != '' || error_phone != '') {
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "main.php",
                data: {
                    "email_id": checking_email,
                    "name_id": checking_name,
                    'checking_add': true,
                    'name': name,
                    'email': email,

                    'gender': $('#gender').val(),
                    'address': $('#address').val(),
                    'phone': phone,
                },
                success: function (response) {
                    console.log(response);
                    // $('#Student_AddModal').modal('hide');
                    let data = $.parseJSON(response);
                    if (data.status == 100) {
                        $('.error-message').empty();
                        $('.error-message').append('\
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');
                    } else if (data.status == 300) {
                        $('.error-message').empty();
                        $('.error-message').append('\
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');
                    } else if (data.status == 200) {
                        $('#Student_AddModal').modal('hide');
                        // Clear input fields and error messages
                        $('#name').val('');
                        $('#email').val('');

                        $('#phone').val('');
                        $('#gender').val('');
                        $('#address').val('');
                        $('#error_name').text('');
                        $('#error_email').text('');
                        $('#error_phone').text('');
                        $('.message-show').text('');
                        $('.error-message').text('');

                        // $('.message-show').empty();
                        $('.message-show').append('\
                        <div class="alert alert-success alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');
                    } else if (data.status == 500) {
                        $('#Student_AddModal').modal('hide');
                        $('.message-show').empty();
                        $('.message-show').append('\
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');
                    }
                    $('.studentdata').html("");
                    getdata();
                    $('#name').val();
                    $('#email').val();

                    $('#gender').val();
                    $('#address').val();
                    $('#phone').val();

                }
            });
        }
    });




    // click on edit button
    $(document).on("click", ".editbtn", function () {
        var stud_id = $(this).closest('tr').find('.stud_id').text();
        // alert(stud_id);
        $.ajax({
            type: "POST",
            url: "main.php",
            data: {
                'checking_edit': true,
                'stud_id': stud_id,
            },
            success: function (response) {
                // console.log(response);
                $.each(response, function (key, studedit) {
                    // console.log(studedit['name']);
                    $('#edit_id').val(studedit['id']);
                    $('#edit_name').val(studedit['name']);
                    $('#edit_email').val(studedit['email']);
                    $('#edit_phone').val(studedit['phone']);
                    $('#edit_gender').val(studedit['gender']);
                    $('#edit_address').val(studedit['address']);
                });
                $('#StudentEditModal').modal('show');
            }
        });

    });

    // click on edit-data button
    $('.student_edit_ajax').click(function (e) {
        var id = $('#edit_id').val();
        e.preventDefault();
        // name validation
        var name_filter = /^[a-zA-Z ]*$/;
        var name = $('#edit_name').val();
        if ($.trim(name).length == 0) {
            error_edit_name = "Please enter name";
            $('#error_edit_name').text(error_edit_name);
        } else if (!(name_filter.test(name))) {
            error_edit_name = "Only letters and whitespaces are allowed";
            $('#error_edit_name').text(error_edit_name);
        } else {
            error_edit_name = "";
            $('#error_edit_name').text(error_edit_name);
        }

        //email validation
        var email_filter = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var email = $('#edit_email').val();
        if ($.trim(email).length == 0) {
            error_edit_email = "Please enter email";
            $('#error_edit_email').text(error_edit_email);
        } else if (!(email_filter.test(email))) {
            error_edit_email = "Invalid Email Format";
            $('#error_edit_email').text(error_edit_email);
        } else {
            error_edit_email = "";
            $('#error_edit_email').text(error_edit_email);
        }

        //phone validation
        var phone = $('#edit_phone').val();
        if ($.trim(phone).length == 0) {
            error_edit_phone = "Please enter phone";
            $('#error_edit_phone').text(error_edit_phone);
        } else {
            error_edit_phone = "";
            $('#error_edit_phone').text(error_edit_phone);
        }
        var address = $('#edit_address').val();
        if ($.trim(address).length == 0) {
            error_edit_phone = "Please enter phone";
            $('#error_edit_address').text(error_edit_address);
        } else {
            error_edit_address = "";
            $('#error_edit_address').text(error_edit_address);
        }
        var checking_edit_email = $('.checking_edit_email').val();
        var checking_edit_name = $('.checking_edit_name').val();


        if (error_edit_name != '' || error_edit_email != '' || error_edit_phone != '') {
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "main.php",
                data: {
                    "email_edit_id": checking_edit_email,
                    "name_edit_id": checking_edit_name,
                    'checking_edit_data': true,
                    'id': id,
                    'name': name,
                    'email': email,
                    'gender': $('#edit_gender').val(),
                    'address': $('#edit_address').val(),
                    'phone': phone,
                },
                success: function (response) {
                    // console.log(response);
                    let data = $.parseJSON(response);
                    //email already registered
                    if (data.status == 100) {
                        $('.error-message_update').empty();
                        $('.error-message_update').append('\
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');
                    }
                    //name unique
                    else if (data.status == 300) {
                        $('.error-message_update').empty();
                        // $('.error-message_update').remove();
                        $('.error-message_update').append('\
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');


                    } else if (data.status == 200) {
                        $('#StudentEditModal').modal('hide');

                        $('.message-show').empty();
                        // $(".message-show").remove();
                        $('.message-show').append('\
                        <div class="alert alert-success alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');
                        

                    } else if (data.status == 500) {
                        $('#StudentEditModal').modal('hide');
                        $('.message-show').text('');
                        $('.message-show').empty();
                        $('.message-show').append('\
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');
                    }
                    $('.studentdata').html("");
                    getdata();
                }
            });
        }
    });

    // click on delete button
    $(document).on("click", ".deletebtn", function () {
        var stud_id = $(this).attr('value');
        // alert(stud_id);
        $.ajax({
            type: "POST",
            url: "main.php",
            data: {
                'checking_delete': true,
                'stud_id': stud_id,
            },
            success: function (response) {
                let data = $.parseJSON(response);
                if (data.status == 200) {
                    // Remove existing alert messages
                    $('.message-show').empty();
                    $('.message-show').append('\
                        <div class="alert alert-success alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');
                } else if (data.status == 500) {
                    $('.message-show').append('\
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">\
                            <strong>Hey!</strong> ' + data.message + '.\
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                    ');
                }

                $('.studentdata').html("");
                getdata();
            },
            error: function (response) {

            }
        });

    });

     function getdata(page) {
        $.ajax({
            type: "GET",
            url: "main.php",
            data: {
                'fetch_data': true,
                'page': page,
            },
            success: function (response) {
                $('.studentdata').empty();
                $.each(response.records, function (key, value) {
                    $('.studentdata').append('<tr>' +
                        '<td class="stud_id">' + value['id'] + '</td>\
                            <td>' + value['name'] + '</td>\
                            <td>' + value['email'] + '</td>\
                            <td>' + value['gender'] + '</td>\
                            <td>' + value['address'] + '</td>\
                            <td>' + value['phone'] + '</td>\
                            <td>\
                            <a href="#" value="' + value['id'] + '" class="badge btn-dark editbtn"><i class="fa-solid fa-pen-to-square fs-5 me-3"></i></a>\
                            <a href="#" value="' + value['id'] + '" class="badge btn-danger deletebtn"><i class="fa-solid fa-trash fs-5"></i></a>\
                            </td>\
                        </tr>');
                });
                // Dynamically generate pagination links
                $('.pagination').empty();
                for (let i = 1; i <= response.totalPages; i++) {
                    $('.pagination').append('<li class="page-item"><a class="page-link pagination-link" data-page="' + i + '" href="#">' + i + '</a></li>');
                }
            }
        });
    }
    // Initial data load
    getdata(1);
    // Pagination click event
    $(document).on('click', '.pagination-link', function (e) {
        e.preventDefault();
        const page = $(this).data('page');
        getdata(page);
    });
});

