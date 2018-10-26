/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).bind("ready",init);
function init(){
  
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
      $( "#dialogAddNewUser" ).dialog("option","title","Sign Up");
      $( "#dialogAddNewUser" ).dialog( "open" );      
    });
    
    
    
    $("#button_saveSignUp").click(function(){
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
        if(!$("#password1TextField").val()){
            alert("password field is not empty");
        }
        signUp();
    });   
    
}



function signUp(){
    $.ajax({
        type:"POST",
        url:"SignUpServlet",
        data:"firstName="+$("#FirstNameTextField").val()+"&lastName="+$("#LastNameTextField").val()+"&email="+$("#emailTextField").val()+"&password="+$("#password1TextField").val(),       
        async:false,
        success: function(){           
           $("#dialogAddNewUser").dialog("close");
           alert("U kreeg een email met een link. Gelieve deze eerst te bevestigen");
        }
    });
}

