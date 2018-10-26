/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).bind("ready",initCourseRegistration);
var modelType = "";
function initCourseRegistration(){
    
    getCoursesFromDatabase();
    
    createInstructionModelsSelector();
    $( "#dialogNewCourse" ).dialog({
      autoOpen: false,
      width:500,
      show: {
        effect: "slide",
        duration: 500
      },
      hide: {
        effect: "slide",
        duration: 500
      }
    });
    $( "#dialogAddNewCourse" ).dialog({
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
    
    $("#dialogModifyCourse").dialog({
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
    
 
    $( "#button_openDialogNewCourse" ).click(function() {
      $( "#dialogNewCourse" ).dialog( "open" );      
    });
    
    
    
    $("#button_saveNewCourse").click(function(){
        if (!$("#newCourseName").val()){
            alert("name is empty");
            return;
        }
        if(!$("#newCourseDescription").val()){
            alert("descripion is empty");
            return;
        }        
        createNewCourse();
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
        modifyCourse();
    });

}
function createInstructionModelsSelector(){
        getInstructionModelsFromXML();   

    }
    
    function getInstructionModelsFromXML(){
        $.ajax({
        type: "GET",
	url: "./resources/InstructionModels.xml",
	dataType: "xml",
	success: function(xml) {
           $(xml).find('instructionModel').each(function(){             
               $('#instructionModelContainer').append('<div class="im" id="im'+$(this).find("name").text()+'"><div id="'+$(this).find("type").text()+'" class="im_title">'+$(this).find("name").text()+'</div><div class="im_image"><img class="im_image_size" src="'+$(this).find("url").text()+'"/></div><div class="im_description small">'+$(this).find("description").text()+'</div></div>');
               $("#im"+$(this).find("name").text()).bind("click",{par:$(this).find("name").text(),par1:$(this).find("type").text()},openNewCourseForm);
        });
	}
        });
    }
function getCoursesFromDatabase(){
    $.ajax({
        type:"GET",
        url:"GetCoursesFromDatabaseServlet",
        async:false,
        success:function(xml){
            initCourseList();
            $(xml).find("course").each(function(){                
                $('#courseListTable').append('<tr id="course'+ $(this).find("id").text() +'"><td>'+$(this).find("id").text()+'</td><td>'+$(this).find("name").text()+'</td><td>'+$(this).find("goal").text()+'</td> <td>'+$(this).find("creationDate").text()+'</td><td>'+$(this).find("type").text()+'</td><td><div class="actionIcons ui-icon-pencil ui-icon" id="modifyCourse'+$(this).find("id").text()+'"></div><a href="'+$(this).find("type").text()+'.htm?id='+ $(this).find("id").text() +'&type='+$(this).find("type").text()+'"<div class="actionIcons ui-icon-folder-open ui-icon" id="openModelCourse'+$(this).find("id").text()+'"></a></div><div class="actionIcons ui-icon-trash ui-icon" id="deleteCourse'+$(this).find("id").text()+'"></div></td></tr>');
                $("#deleteCourse"+$(this).find("id").text()).bind("click",{par:$(this).find("id").text()},deleteCourse);
                $("#modifyCourse"+$(this).find("id").text()).bind("click",{par:$(this).find("id").text()},openModifyCourse);
                //$("#openModelCourse"+$(this).find("id").text()).bind("click",{par:$(this).find("id").text(),par2:$(this).find("type").text()},openModelCourse);

            });            
        }
    });
}

function initCourseList(){
    $("#courseListTable tbody").remove();
}

function openNewCourseForm(event){
    initNewCourseForm();
    $("#couseModelName").append(event.data.par);    
    $("#dialogAddNewCourse").dialog("open");
    modelType = event.data.par1;
}

function initNewCourseForm(){
    $("#couseModelName").empty();
    $("#newCourseName").val("");
    $("#newCourseDescription").val("");
}

function createNewCourse(){
    $.ajax({
        type:"POST",
        url:"AddCourseToDatabaseServlet",
        data:"courseName="+$("#newCourseName").val()+"&courseGoal="+$("#newCourseDescription").val()+"&courseType="+modelType,
        sync:false,
        success: function(){
           initCourseList();
           getCoursesFromDatabase();
           $("#dialogAddNewCourse").dialog("close");
           $("#dialogNewCourse").dialog("close");
        }
    });
}

function deleteCourse(event){
    var result = confirm("Want to delete?");
    if(result){
    $.ajax({
        type:"POST",
        url:"DeleteCourseFromDatabaseServlet",
        data:"courseId="+ event.data.par,
        sync:false,
        success: function(){
           initCourseList();
           getCoursesFromDatabase(); 
        }
    });     
    }        
}

function openModifyCourse(event){
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
    function modifyCourse(){
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

