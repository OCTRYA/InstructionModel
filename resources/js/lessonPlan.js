/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).bind("ready",main);
var selectedLessonPlanActivity = 0;
function main(){
  $("#saveOrUpdateLessonPlanActivityFormButton").click(saveOrUpdateLessonPlanActivity);
  $("#saveModifyLessonPlanGeneralInformation").click(saveModifyGeneralLessonPlanWindow);
  $("#lessonPlanGeneralInformationModel").on('shown.bs.modal',function(){
      $("#lessonPlanGeneralInformationTitle").val($("#title").html());
      $("#lessonPlanGeneralInformation_aim").val($("#lessonPlan_aim p").html());      
      $("#lessonPlanGeneralInformationEntryBehaviour").val($("#entryBehaviour p").html());
      $("#lessonPlanGeneralInformationTargetAudience").val($("#targetAudience p").html());
  });
  $("#makePdfButton").click(function(){
      alert("test1");
      $.ajax({
        type:"POST",
        url:"CreateLessonPlanPdfServlet",
        async:true,
        success:function(){
            alert("test2");
        }
      });
  });
  initialize();
  var lessonPlan = new LessonPlan(); 
   
  $( ".lessonPlanActivityLines" ).sortable().droppable().on('sortreceive', function(event, ui){
      $.ajax({
        type:"POST",
        url:"ModifyLessonPlanActivityServlet",
        data:"targetCategory=" + getCategoryValueByName($(ui.helper).parent().attr("id")) +"&lessonPlanActivity="+($(ui.helper).attr("id")).substr(14)+"&targetPosition="+findIndexLessonPlanActivityLine($(ui.helper).parent(),$(ui.helper)),
        async:true,        
        success: function(){
        }   
        });
        
        
  });

}

function findIndexLessonPlanActivityLine(container,lpa){
    return $(container).children().index(lpa);
}



function initialize(){
    getLessonPlanFromDatabase();
}

//DATABASE HANDLERS


function getLessonPlanFromDatabase(){
    var id = getUrlParameter('id');
    var type = getUrlParameter('type');
    var course = {};
    $.ajax({
        type:"GET",
        url:"GetLessonPlanFromDatabaseServlet",
        data:"courseId=" + id + "&type="+type,
        async:true,        
        success: function(json){
            course = json.course;
            $("#title").html(course.name);
            $("#lessonPlan_aim p").html(course.goal);
            $("#entryBehaviour p").html(course.entryBehaviour);
            $("#targetAudience p").html(course.targetAudience);
            drawLessonPlanActivities(course.lessonPlanActivities);
        }   
    });
return course;
}

function saveOrUpdateLessonPlanActivity(){
    var lessonCategory = $("#CategorySelector2").val();
    var lessonGoal = $("#lessonPlanGoalTextarea").val();
    var lessonInstructionActivity = $("#lessonInstructionActivityTextarea").val();
    var lessonLearningActivity = $("#lessonPlanLearningActivityTextarea").val();
    var lessonAssessment = $("#lessonPlanAssessmentTextarea").val();
    var lessonMedia = $("#lessonPlanMediaTextarea").val();
    var lessonTiming = $("#lessonPlanTimingTextarea").val();
    $.ajax({
        type:"POST",
        url:"saveOrUpdateLessonPlanActivityServlet",
        data:"selectedLessonPlanActivity="+selectedLessonPlanActivity+"&lessonCategory="+lessonCategory + "&lessonGoal=" + lessonGoal + "&lessonInstructionActivity="+lessonInstructionActivity   + "&lessonLearningActivity="+ lessonLearningActivity +"&lessonAssessment="+lessonAssessment+ "&lessonMedia="+lessonMedia + "&lessonTiming="+lessonTiming,
        async:true,        
        success: function(json){            
            course = json.course;
            drawLessonPlanActivities(course.lessonPlanActivities);
            clearInputLessonPlanActivityForm();
        }   
    });
}

function clearInputLessonPlanActivityForm(){
    $("#CategorySelector2").val(1);
    $("#lessonPlanGoalTextarea").val("");
    $("#lessonInstructionActivityTextarea").val("");
    $("#lessonPlanLearningActivityTextarea").val("");
    $("#lessonPlanAssessmentTextarea").val("");
    $("#lessonPlanMediaTextarea").val("");
    $("#lessonPlanTimingTextarea").val("");
}

function clearGeneralLessonPlanActivityForm(){
    $("#lessonPlanGeneralInformationTitle").val("");
    $("#lessonPlanGeneralInformation_aim").val("");
    $("#lessonPlanGeneralInformationTargetAudience").val("");
    $("#lessonPlanGeneralInformationEntryBehaviour").val("");
}

function drawLessonPlanActivities(lessonPlanActivities){
    $(".lessonPlanActivityRow").remove();
    for(var i = 1; i < lessonPlanActivities.length; i++){
        drawLessonPlanActivity(lessonPlanActivities[i]);
    }
}


function drawLessonPlanActivity(lessonPlanActivity){
   var lessonPlanActivityRow = '<div id="lessonPlanItem'+ lessonPlanActivity.lessonPlanActivityId +'" class="row lessonPlanActivityRow"><div class="col-sm-1"><i class="fa fa-arrows iconContainer action" aria-hidden="true"></i><i id="deleteLessonPlanActivity'+lessonPlanActivity.lessonPlanActivityId+'" class="iconContainer action fa fa-trash" aria-hidden="true"></i></div>';
    lessonPlanActivityRow = lessonPlanActivityRow + '<div id="lessonPlanActivityGoal'+lessonPlanActivity.lessonPlanActivityId+'" class="col-sm-3 lessonPlanActivityCol'+ lessonPlanActivity.lessonPlanActivityId +'">'+lessonPlanActivity.lessonPlanActivityGoal+ '</div>'; 
    lessonPlanActivityRow = lessonPlanActivityRow + '<div id="lessonPlanActivityInstructionActivity'+lessonPlanActivity.lessonPlanActivityId+'" class="col-sm-3 lessonPlanActivityCol'+ lessonPlanActivity.lessonPlanActivityId +'">'+lessonPlanActivity.lessonPlanActivityInstructionActivity+ '</div>'; 
    lessonPlanActivityRow = lessonPlanActivityRow + '<div id="lessonPlanActivityLearningActivity'+lessonPlanActivity.lessonPlanActivityId+'" class="col-sm-3 lessonPlanActivityCol'+ lessonPlanActivity.lessonPlanActivityId +'">'+lessonPlanActivity.lessonPlanActivityLearningActivity+ '</div>'; 
    lessonPlanActivityRow = lessonPlanActivityRow + '<div id="lessonPlanActivityMedia'+lessonPlanActivity.lessonPlanActivityId+'" class="col-sm-1 lessonPlanActivityCol'+ lessonPlanActivity.lessonPlanActivityId +'">'+lessonPlanActivity.lessonPlanActivityMedia+ '</div>'; 
    lessonPlanActivityRow = lessonPlanActivityRow + '<div id="lessonPlanActivityTime'+lessonPlanActivity.lessonPlanActivityId+'" class="col-sm-1 lessonPlanActivityCol'+ lessonPlanActivity.lessonPlanActivityId +'">'+lessonPlanActivity.lessonPlanActivityTime+ '</div></div>'; 

    switch(lessonPlanActivity.lessonPlanActivityCategory) {
    case 1:
        $("#introductionLessonPlanActivitiesLines").append(lessonPlanActivityRow);
        
        break;
    case 2:
         $("#middleLessonPlanActivitiesLines").append(lessonPlanActivityRow);
        break;
    case 3:
        $("#summaryLessonPlanActivitiesLines").append(lessonPlanActivityRow);
        break;
    default:
        $("#introductionLessonPlanActivitiesLines").append(lessonPlanActivityRow);
    }
    
     

        
    $(".lessonPlanActivityCol"+ lessonPlanActivity.lessonPlanActivityId).bind("click",{par:lessonPlanActivity.lessonPlanActivityId},function(event){
        selectedLessonPlanActivity = event.data.par;
        $('#lessonPlanActivityModel').modal('show');
        $("#CategorySelector2").val(getCategorySelector2Value(event.data.par));
        $("#lessonPlanGoalTextarea").val($("#lessonPlanActivityGoal"+event.data.par).html());
        $("#lessonInstructionActivityTextarea").val($("#lessonPlanActivityInstructionActivity"+event.data.par).html());
        $("#lessonPlanLearningActivityTextarea").val($("#lessonPlanActivityLearningActivity"+event.data.par).html());
        $("#lessonPlanMediaTextarea").val($("#lessonPlanActivityMedia"+event.data.par).html());
        $("#lessonPlanTimingTextarea").val($("#lessonPlanActivityTime"+event.data.par).html());
        
    });
    
    function getCategorySelector2Value(val){
        var cat = $("#lessonPlanActivityGoal"+val).parent("div").parent("div").attr("id");
        if(cat === "introductionLessonPlanActivitiesLines"){
            return "1";
        }        
        if(cat === "middleLessonPlanActivitiesLines"){
            return "2";
        }            
        if(cat === "summaryLessonPlanActivitiesLines")  {
            return "3";
        }  
    }
    
  
    
    
    $("#deleteLessonPlanActivity"+lessonPlanActivity.lessonPlanActivityId).bind("click",{par:lessonPlanActivity.lessonPlanActivityId},function(event){
        var accept = confirm("Weet je zeker dat je deze lesactiviteit wil verwijderen?");
        if(accept){
            $.ajax({
                type:"POST",
                url:"DeleteLessonPlanActivityServlet",
                data:"lessonPlanActivityId="+event.data.par,
                async:false,
                success: function(json){
                    course = json.course;
                    drawLessonPlanActivities(course.lessonPlanActivities);
                    alert("Lesactiviteit werd verwijderd");
                }
            });
        }        
    });
    
    $( "#lessonPlanItem"+ lessonPlanActivity.lessonPlanActivityId ).draggable({
      containment: "#lessonPlanActivityContainer", 
      scroll: false,
      cursor: "move",
      connectToSortable: ".lessonPlanActivityLines",
      helper: "original",
      revert: "invalid"
    }
            
            );
    
}



function saveModifyGeneralLessonPlanWindow(){
    $.ajax({
        type:"POST",
        url:"UpdateGeneralLessonPlanServlet",
        data:"courseTitle="+$("#lessonPlanGeneralInformationTitle").val() + "&lessonAim=" + $("#lessonPlanGeneralInformation_aim").val() + "&targetAudience="+$("#lessonPlanGeneralInformationTargetAudience").val()   + "&entryBehaviour="+ $("#lessonPlanGeneralInformationEntryBehaviour").val(),
        async:false,        
        success: function(json){
            course = json.course;
            $("#title").html(course.name);
            $("#lessonPlan_aim p").html(course.goal);
            $("#entryBehaviour p").html(course.entryBehaviour);
            $("#targetAudience p").html(course.targetAudience);
            clearGeneralLessonPlanActivityForm();
        }   
    });

      $("#lessonPlanGeneralInformationTargetAudience").val($("#targetAudience p").html());
      $("#lessonPlanGeneralInformationEntryBehaviour").val($("#entryBehaviour p").html());
}
//OBJECT MODEL

function LessonPlan(){
    this.initialize = function(){
        
    };
    
    
    this.update = function(){
        
    };
}




function LessonPlanActivity(){
    this.id;
    this.lessonGoal;
    this.instructionActivity;
    this.learningActivity;
    this.assessment;
    this.media;
    this.timing;
    this.lessonPlan;
    
    
    this.drawLessonPlanActivity = function(HTMLcontainer){
        HTMLcontainer.append('<div class="row" id="lessonPlanRow"'+this.id+'></div>');
        $("#lessonPlanRow"+id).append('<div class="col-sm-2">'+ this.lessonGoal +'</div>');
        $("#lessonPlanRow"+id).append('<div class="col-sm-3">'+ this.instructionActivity +'</div>');
        $("#lessonPlanRow"+id).append('<div class="col-sm-3">'+ this.learningActivity +'</div>');
        $("#lessonPlanRow"+id).append('<div class="col-sm-1">'+ this.media +'</div>');
        $("#lessonPlanRow"+id).append('<div class="col-sm-1">'+ this.timing +'</div>');
    };
    
    function modifyPositionLessonPlanActivity(categoryNew, categoryOld, indexNew, lessonPlanActivity){
        
    }
    
      
    
}
function getCategoryValueByName(val){
        if(val === "introductionLessonPlanActivitiesLines"){
            return "1";
        }        
        if(val === "middleLessonPlanActivitiesLines"){
            return "2";
        }            
        if(val === "summaryLessonPlanActivitiesLines")  {
            return "3";
        }  
    }