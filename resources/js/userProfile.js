/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */$(document).bind("ready",initUserProfile);

function initUserProfile(){
    
    $.ajax({
        type:"GET",
        url:"GetSpecificUserFromDatabaseServlet",
        async:false,
        success:function(json){
            var user = json.user;
            setUserProfileForm(user);
        }
    });
    
    $("#saveProfileButton").bind("click",saveOrUpdateProfile);
}


function setUserProfileForm(user){
    $("#userNameProfile").val(user.userName);
    $("#firstNameProfile").val(user.firstName);
    $("#lastNameProfile").val(user.lastName);
    $("#streetProfile").val(user.street);
    $("#houseNumberProfile").val(user.houseNumber);
    $("#emailProfile").val(user.email);
    $("#zipcodeProfile").val(user.zipcode);
    $("#cityProfile").val(user.city);
    $("#countryProfile").val(user.country);
    $("#telephoneProfile").val(user.telephone);
    $("#mobilephoneProfile").val(user.mobilephone);
}

function saveOrUpdateProfile(){
    $.ajax({
        type:"POST",
        url:"SaveOrUpdateSpecificUserInDatabaseServlet",
        data:"userName="+$("#userNameProfile").val()+"&firstName="+$("#firstNameProfile").val()+"&lastName="+$("#lastNameProfile").val()+"&street="+$("#streetProfile").val()+"&houseNumber="+$("#houseNumberProfile").val()+"&zipcode="+$("#zipcodeProfile").val()+"&city="+$("#cityProfile").val()+"&country="+$("#countryProfile").val()+"&email="+$("#emailProfile").val()+"&telephone="+$("#telephoneProfile").val()+"&mobilephone="+$("#mobilephoneProfile").val(),
        async:false,
        success:function(json){
            var user = json.user;
            setUserProfileForm(user);
        }
    });
}



