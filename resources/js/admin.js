/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).bind("ready",initUserRegistration);
function initUserRegistration(){
  
    $( "#dialogAddNewUser" ).dialog({
      autoOpen: false,
      width:400,
      show: {
        effect: "slide",
        duration: 500
      },
      hide: {
        effect: "slide",
        duration: 500
      }
    });
    
 
    $( "#button_openDialogNewUser" ).click(function() {
      $( "#dialogAddNewUser" ).dialog("option","title","Add new user");
      $( "#dialogAddNewUser" ).dialog( "open" );      
    });
    
    
    
    $("#button_saveNewUser").click(function(){
        if (!$("#emailTextField").val()){
            alert("name is empty");
            return;
        }
        if(!$("#FirstNameTextField").val()){
            alert("first name is empty");
            return;
        }
        if(!$("#LastNameTextField").val()){
            alert("last name is empty");
            return;
        }  
        createNewUser();
    });
    
    $("#button_saveModifiedCourse").click(function(){
        if (!$("#modifyCourseName").val()){
            alert("name is empty");
            return;
        }
        if(!$("#modifyCourseDescription").val()){
            alert("descripion is empty");
            return;
        }  
        if(!$("#modifyId").html()){
            alert("There is no id attached");
            return;
        }
    });
    getUsersFromDatabase();
}


function getUsersFromDatabase(){
    $.ajax({
        type:"GET",
        url:"GetUsersFromDatabaseServlet",
        async:false,
        success:function(json){
            initUserList();
            for(var i = 1; i < json.users.length; i++){
                $('#userListTable').append('<tr id="user'+ json.users[i].id +'"><td>'+json.users[i].id+'</td><td>'+json.users[i].firstName+'</td><td>'+json.users[i].lastName+'</td> <td>'+json.users[i].username+'</td>\n\
                    <td>\n\
                        <i id="changeAuthorisation'+json.users[i].id+'" class="action iconGood fa fa-user fa-lg" aria-hidden="true"></i>&nbsp;\n\
                        <i id="changPasswordUser'+ json.users[i].id +'" class="action fa fa-key fa-lg" aria-hidden="true"></i>\n\
                        <i id="deleteUser'+ json.users[i].id +'" class="action fa fa-trash fa-lg" aria-hidden="true"></i>&nbsp;\n\
                        <i id="accessUser'+ json.users[i].id +'" class="action '+setColorIcon(json.users[i].enabled)+' fa fa-eye fa-lg" aria-hidden="true"></i>&nbsp;\n\
                </td></tr>');
                $("#deleteUser"+json.users[i].id).bind("click",{par:json.users[i].id},deleteUser);
                $("#changeAuthorisation"+json.users[i].id).bind("click",{par:json.users[i].id},changeAuthorisation);
                $("#accessUser"+json.users[i].id).bind("click",{par:json.users[i].id},changeAccess);

            }
                      
        }
    });
}
function changeAccess(event){
    $.ajax({
        type:"POST",
        url:"ChangeAccessInDatabaseServlet",
        data:"userId="+ event.data.par,
        async:false,
        success: function(){
           location.reload(); 
        }
    });  
}

function changeAuthorisation(event){
    $.ajax({
        type:"POST",
        url:"ModifyUserAuthorisationFromDatabaseServlet",
        data:"userId="+ event.data.par,
        async:false,
        success: function(){
           location.reload(); 
        }
    });  
}

function setColorIcon(value){
    if (value === 1){
        return "iconGood";
    }
    else{
        return "iconBad";
    }
}


function removeUserFromDatabase(event){
    var result = confirm("Want to delete?");
    if(result){
    $.ajax({
        type:"POST",
        url:"DeleteUserFromDatabaseServlet",
        data:"userId="+ event.data.par,
        async:false,
        success: function(){
           location.reload(); 
        }
    });  
}
}

function initUserList(){
    $("#userListTable tbody").remove();
}

function openNewUserForm(event){
    initNewCourseForm(event);
    $("#dialogAddNewCourse").dialog("open");
}

function initNewUserForm(event){
    $("#userModelName").append(event.data.par);    
    $("#Name").empty();
    $("#FirstNameTextField").val("");
    $("#LastNameTextField").val("");
    $("#emailTextField").val("");

}

function createNewUser(){
    $.ajax({
        type:"POST",
        url:"AddNewUserToDatabaseServlet",
        data:"firstName="+$("#FirstNameTextField").val()+"&lastName="+$("#LastNameTextField").val()+"&email="+$("#emailTextField").val()+"&status="+$("input[name=statusNewUser]:checked").val()+"&userType="+parseInt($("#userType").find("option:selected").attr("name")),
        async:false,
        success: function(){
           initCourseList();
           getUsersFromDatabase();
           $("#dialogAddNewUser").dialog("close");
        }
    });
}

function deleteUser(event){
    var result = confirm("Want to delete?");
    if(result){
    $.ajax({
        type:"POST",
        url:"DeleteUserFromDatabaseServlet",
        data:"userId="+ event.data.par,
        sync:false,
        success: function(){
           initCourseList();
           getCoursesFromDatabase(); 
        }
    });     
    }        
}

function openModifyUser(event){
    $("#dialogModifyCourse").dialog("open");
    $.ajax({
        type:"GET",
        url:"GetCourseFromDatabaseServlet",
        data:"courseId="+ event.data.par,
        sync:false,
        success: function(xml){
            $("#modifyId").html($(xml).find("id").text());
            $("#modifyCourseName").val($(xml).find("name").text());
            $("#modifyCourseDescription").val($(xml).find("goal").text());
        }
    });
}
    function modifyUser(){
    $.ajax({
        type:"POST",
        url:"ModifyCourseToDatabaseServlet",
        data:"courseId="+$("#modifyId").html()+"&courseName="+$("#modifyCourseName").val()+"&courseGoal="+$("#modifyCourseDescription").val(),
        sync:false,
        success: function(){
           initCourseList();
           getCoursesFromDatabase();
           $("#dialogModifyCourse").dialog("close");
        }
    });

    
}

