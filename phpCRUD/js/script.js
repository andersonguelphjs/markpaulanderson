// Add Record
function addRecord() {
    // get values
    var first_name = $("#first_name").val();
    first_name = first_name.trim();
    var last_name = $("#last_name").val();
    last_name = last_name.trim();
    var email = $("#email").val();
    email = email.trim();
    var obj = {
        first_name: first_name,
        last_name: last_name,
        email: email
    };

    if (first_name == "") {
        alert("First name field is required!");
    }
    else if (last_name == "") {
        alert("Last name field is required!");
    }
    else if (email == "") {
        alert("Email field is required!");
    }
    else {
        // Add record
        $.ajax({
                type: "POST",
                url: "ajax/create.php",
                data: JSON.stringify(obj),
                success: function (data, status) {
                    // close the popup
                    console.log("data "+data+" status "+status);
                    console.dir(data);
                    $("#add_new_record_modal").modal("hide");

                    // read records again
                    readRecords();

                    // clear fields from the popup
                    $("#first_name").val("");
                    $("#last_name").val("");
                    $("#email").val("");
                  }
          });
      //  });
        /*
        $.post("ajax/create.php", {
            first_name: first_name,
            last_name: last_name,
            email: email
        }, function (data, status) {
            // close the popup
            console.log("data "+data+" status "+status);
            console.dir(data);
            $("#add_new_record_modal").modal("hide");

            // read records again
            readRecords();

            // clear fields from the popup
            $("#first_name").val("");
            $("#last_name").val("");
            $("#email").val("");
        });
        */
    }
}
/*
function GetUserDetails(id) {
    // Add User ID to the hidden field
    $("#hidden_user_id").val(id);
    console.log("ed "+id);
    $.ajax({
        url: "ajax/details.php", // you can use this
        type: 'POST',
        data: {
                id: id
            },
        success: function (data, status) {
                    // PARSE json data
                    console.log("data"+data);
                    console.dir(data);
                    var user = JSON.parse(data);
                    // Assign existing values to the modal popup fields
                    $("#update_first_name").val(user.first_name);
                    $("#update_last_name").val(user.last_name);
                    $("#update_email").val(user.email);
                  }
    });

  };
*/
function GetUserDetails(id) {
    // Add User ID to the hidden field
    $("#hidden_user_id").val(id);
    //console.log("ed "+id);
    var obj = {
            id: id
        };
      //  console.log("obj "+JSON.stringify(obj));
      /*
    $.post("ajax/details.php",
        "id="+id,
        function (data, status) {
            // PARSE json data
            console.log("data"+data);
            console.dir(data);
            var user = JSON.parse(data);
            // Assign existing values to the modal popup fields
            $("#update_first_name").val(user.first_name);
            $("#update_last_name").val(user.last_name);
            $("#update_email").val(user.email);
        }
    );
    */
    $.ajax({
            type: "POST",
            url: "ajax/details.php",
            data: JSON.stringify(obj),
            success: function(data, status){
              // PARSE json data
              console.log("data"+data);
              console.dir(data);
              var user = JSON.parse(data);
              // Assign existing values to the modal popup fields
              $("#update_first_name").val(user.first_name);
              $("#update_last_name").val(user.last_name);
              $("#update_email").val(user.email);
            }
    });


    // Open modal popup
    $("#update_user_modal").modal("show");
}



 // READ records
function readRecords() {
    $.get("ajax/read.php", {}, function (data, status) {
        $(".records_content").html(data);
    });
}
function UpdateUserDetails() {
    // get values
    var first_name = $("#update_first_name").val();
    first_name = first_name.trim();
    var last_name = $("#update_last_name").val();
    last_name = last_name.trim();
    var email = $("#update_email").val();
    email = email.trim();

    if (first_name == "") {
        alert("First name field is required!");
    }
    else if (last_name == "") {
        alert("Last name field is required!");
    }
    else if (email == "") {
        alert("Email field is required!");
    }
    else {
        // get hidden field value
        var id = $("#hidden_user_id").val();
        var obj = {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email
            };
        // Update the details by requesting to the server using ajax
        /*
        $.post("ajax/update.php", {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email
            },
            function (data, status) {
                // hide modal popup
                console.log("data "+data+" status "+status);
                console.dir(data);
                $("#update_user_modal").modal("hide");
                // reload Users by using readRecords();
                readRecords();
            }
        );
        */
        $.ajax({
                type: "POST",
                url: "ajax/update.php",
                data: JSON.stringify(obj),
                success: function (data, status) {
                    // hide modal popup
                    console.log("data "+data+" status "+status);
                    console.dir(data);
                    $("#update_user_modal").modal("hide");
                    // reload Users by using readRecords();
                    readRecords();
                }
          });
    }
}
function DeleteUser(id) {
    var conf = confirm("Are you sure, do you really want to delete User?");
    if (conf == true) {
      var obj = {id:id};
      /*
        $.post("ajax/delete.php", {
                id: id
            },
            function (data, status) {
                // reload Users by using readRecords();
                console.log("data "+data+" status "+status);
                console.dir(data);
                readRecords();
            }
        );
        */
        $.ajax({
                type: "POST",
                url: "ajax/delete.php",
                data: JSON.stringify(obj),
                success: function (data, status) {
                    // reload Users by using readRecords();
                    console.log("data "+data+" status "+status);
                    console.dir(data);
                    readRecords();
                }
          });
    }
}

$(document).ready(function () {
    // READ records on page load
    readRecords(); // calling function
});
