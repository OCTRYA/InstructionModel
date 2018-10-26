/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).bind("ready",init4CIDModel);


//GENERAL
//******************************************************************************
//******************************************************************************
function init4CIDModel(){
     initCourse();
    //$( "#sources_LearningTaskContainer" ).accordion({collapsible: true});
    $( "#sources_TaskClassContainer" ).accordion({active: 1,collapsible: true,heightStyle: "content"});
    $("#NewLearningTaskButton").click(initLTaskModel);

     
    $("#modifyTaskClassButton").click(modifyTaskClass);
    
    $("#modifyButton").click(modifyGeneralModal);
    
    
    $("#newTaskClassButton").click(function(){
        if (!$("#newTaskClassNameText").val()){
            alert("name is empty");
            return;
        }
        if(!$("#newTaskGroupDescription").val()){
            alert("descripion is empty");
            return;
        }  
        createNewTaskClass($("#newTaskClassNameText").val(),$("#newTaskGroupDescription").val());
        $("#newTaskClassNameText").val("");
        $("#newTaskGroupDescription").val("");
        $('#lTaskGroup').modal('hide');
    });
    
   
        //triggered when modal is about to be shown
    $('#modifyModal').on('show.bs.modal', function(e) {    
    //get data-id attribute of the clicked element
    var objectId = $(e.relatedTarget).data('object-id');
    var objectAttribute = $(e.relatedTarget).data('object-attribute');
    var objectObject = $(e.relatedTarget).data('object-object');
    var objectInputText = $(e.relatedTarget).data('object-inputtext'); 
    
    $(".databaseAttribute").val(objectAttribute);
    $(".databaseId").val(objectId);
    $(".databaseObject").val(objectObject);
    $(e.currentTarget).find('textarea[name="modifyText"]').val(objectInputText);
});



    
    $("#saveNewLearningTaskForm").bind('click',createNewLearningTask);
    $("#saveChangeLearningTaskFromTaskClassForm").bind('click',saveChangeLearningTaskFromTaskClassForm)
    
    
    $("#modifySupportiveInformationButton").click(modifySupportiveInformationModal);
    //triggered when modal is about to be shown
    $('#modifyTaskGroupSupportiveInformation').on('show.bs.modal', function(e) {  
        var objectId = $(e.relatedTarget).data('object-id');
        var objectModel = $(e.relatedTarget).data('object-model');
        var objectFeedback = $(e.relatedTarget).data('object-feedback');
        var objectStrategy = $(e.relatedTarget).data('object-strategy');    
        $(".databaseSId").val(objectId);
        $(e.currentTarget).find('textarea[name="modifyCognitiveStrategy"]').val(objectStrategy);
        $(e.currentTarget).find('textarea[name="modifyCognitiveModels"]').val(objectModel);
        $(e.currentTarget).find('textarea[name="modifyCognitiveFeedBack"]').val(objectFeedback);
    });
    
    //triggered when changeLearningTaskFromTaskClassModel modal is about to be shown 
    $('#changeLearningTaskFromTaskClassModel').on('show.bs.modal', function(e) {  
        var sourceLearningTask = $(e.relatedTarget).data('object-slt');
        $("#taskClassesSelector2").empty();
        var course = get4CIDDataFromDatabase();    
        for (i = 1; i < course.taskClasses.length; i++) {
            $("#taskClassesSelector2").append('<option name="'+course.taskClasses[i].id+'" label="'+course.taskClasses[i].name+'" id="taskClassesOption'+course.taskClasses[i].id+'">'+course.taskClasses[i].name+'</option>');
        };        
        $("#sourceLearningTaskId").val(sourceLearningTask);
    });   
}


function saveChangeLearningTaskFromTaskClassForm(){
    var taskClassId = parseInt($("#taskClassesSelector2").find("option:selected").attr("name"));
    $.ajax({
        type:"POST",
        url:"saveChangeLearningTaskFromTaskClassFromDatabaseServlet",
        data:"learningTaskId="+ $("#sourceLearningTaskId").val() + "&newTaskClassId=" + taskClassId,
        sync:false,
        success: function(){
           location.reload(); 
        }
    });
}

function modifySupportiveInformationModal(){
    $.ajax({
        type:"POST",
        url:"ModifySupportiveInformationToDatabaseServlet",
        data:"supportiveInformationId=" + $(".databaseSId").val() + "&model="+ $("#modifyCognitiveModels").val() + "&feedback="+ $("#modifyCognitiveFeedBack").val() + "&strategy="+$("#modifyCognitiveStrategy").val(),
        async:false,        
        success: function(){
            location.reload();                    
        }   
    }); 
}
    

    


function modifyGeneralModal(){
    var databaseAttribute = $(".databaseAttribute").val();
    var databaseObjectId = $(".databaseId").val();
    var databaseObject = $(".databaseObject").val();
    var value = $("#modifyText").val();
    if(databaseObject==="taskClass"){
        modifyTaskClass(databaseAttribute,databaseObjectId, value);
    }
    if(databaseObject==="learningTask"){         
        modifyLearningTask(databaseAttribute,databaseObjectId, value);
    }  
}



function modifyTaskClass(attribute,id,value){
     $.ajax({
        type:"POST",
        url:"ModifyTaskClassToDatabaseServlet",
        data:"taskClassId=" + id + "&attribute="+attribute + "&value="+value,
        async:false,        
        success: function(){
            location.reload();                    
        }   
    });    
}

function modifyLearningTask(attribute,id,value){
     $.ajax({
        type:"POST",
        url:"ModifyLearningTaskToDatabaseServlet",
        data:"learningTaskId=" + id + "&attribute="+attribute + "&value="+value,
        async:false,        
        success: function(){
            location.reload();                    
        }   
    });    
}

function initCourse(){
    var course = get4CIDDataFromDatabase();
    $("#courseNameTitle").html(course.name);
    $("#goal").append(course.goal);
    if(course.taskClasses.length!==0){
        createTaskClassesList(course);
    }
    else{
       createNewTaskClass("Default","Default taskgroup ");      
    }
}


function get4CIDDataFromDatabase(){
    var id = getUrlParameter('id');
    var type = getUrlParameter('type');
    var course = {};
    $.ajax({
        type:"GET",
        url:"GetSpecificCourseFromDatabaseServlet",
        data:"courseId=" + id + "&type="+type,
        async:false,        
        success: function(json){            
            course = json.course;   
        }   
    });
return course;
}



//TASKCLASS
//******************************************************************************
//******************************************************************************
function createNewTaskClass(taskClassName, taskClassDescription){
     var id = getUrlParameter('id');
     var type = getUrlParameter('type');
     $.ajax({
        type:"POST",
        url:"AddTaskClassToDatabaseServlet",
        data:"courseId=" + id + "&type="+type + "&taskClassName="+taskClassName + "&taskClassDescription="+taskClassDescription,
        async:false,        
        success: function(){
            location.reload();                    
        }   
    });
    
}



function deleteTaskClass(event){
    var result = confirm("Want to delete?");
    if(result){
    $.ajax({
        type:"POST",
        url:"DeleteTaskClassFromDatabaseServlet",
        data:"taskClassId="+ event.data.par,
        sync:false,
        success: function(){
           location.reload(); 
        }
    });     
    }
}

function moveTaskClassUp(event){
   $.ajax({
        type:"POST",
        url:"MoveTaskClassUpInDatabaseServlet",
        data:"taskClassId="+ event.data.par,
        sync:false,
        success: function(){
           location.reload(); 
        }
    }); 
}

function moveTaskClassDown(event){
    $.ajax({
        type:"POST",
        url:"MoveTaskClassDownInDatabaseServlet",
        data:"taskClassId="+ event.data.par,
        sync:false,
        success: function(){
           location.reload(); 
        }
    }); 
}


function moveLearningTaskUp(event){
   $.ajax({
        type:"POST",
        url:"MoveLearningTaskUpInDatabaseServlet",
        data:"learningTaskId="+ event.data.par,
        sync:false,
        success: function(){
           location.reload(); 
        }
    }); 
}

function moveLearningTaskDown(event){
    $.ajax({
        type:"POST",
        url:"MoveLearningTaskDownInDatabaseServlet",
        data:"learningTaskId="+ event.data.par,
        sync:false,
        success: function(){
           location.reload(); 
        }
    }); 
}


function createTaskClassesList(course){
    orderTaskClassesByIndex(course);
    for (var i = 1; i < course.taskClasses.length; i++) { 
        $( "#sources_TaskClassContainer" ).append('<h3>'+course.taskClasses[i].index + " " + course.taskClasses[i].name+' \n\
                                                        <span>\n\
                                                            <span data-toggle="modal" data-target="#modifyModal" data-object-object="taskClass" data-object-attribute="title" data-object-id="'+course.taskClasses[i].id+'" data-object-inputtext="'+course.taskClasses[i].name+'" id="modifyTaskClassName'+course.taskClasses[i].id+'">\n\
                                                                <span class="glyphicon glyphicon-pencil"></span>\n\
                                                            </span>\n\
                                                            <span id="deleteTaskClass'+course.taskClasses[i].id+'">\n\
                                                                <span class="glyphicon glyphicon-remove"></span>\n\
                                                            </span>\n\
                                                            <span id="taskClassMoveDown'+course.taskClasses[i].id+'">\n\
                                                                <span class="glyphicon glyphicon-arrow-down"></span>\n\
                                                            </span>\n\
                                                            <span id="taskClassMoveUp'+course.taskClasses[i].id+'">\n\
                                                                <span class="glyphicon glyphicon-arrow-up"></span>\n\
                                                            </span>\n\
                                                        <span>\n\
                                                    </h3>\n\
                                                    <div>\n\
                                                        <div></div>\n\
                                                        <div class="row">\n\
                                                            <div class="col-lg-6">\n\
                                                                <h4>Description &nbsp; \n\
                                                                    <span>\n\
                                                                        <span data-toggle="modal" data-target="#modifyModal" data-object-object="taskClass" data-object-attribute="description" data-object-id="'+course.taskClasses[i].id+'" data-object-inputtext="'+course.taskClasses[i].description+'" id="modifyTaskClassDescription'+course.taskClasses[i].id+'">\n\
                                                                            <span class="glyphicon glyphicon-pencil"></span>\n\
                                                                        </span>\n\
                                                                    </span>\n\
                                                                </h4>\n\
                                                                <p class="taskClassDesciption myBlock">'+ course.taskClasses[i].description+' </p>\n\
                                                            </div>\n\
                                                            <div class="col-lg-6">\n\
                                                                <h4>Supportive Information &nbsp; \n\
                                                                    <span>\n\
                                                                        <span data-toggle="modal" data-target="#modifyTaskGroupSupportiveInformation" data-object-object="taskClass" data-object-attribute="supportiveInformation" data-object-id="'+course.taskClasses[i].id+'" data-object-feedback="'+course.taskClasses[i].supportiveInformation.cognitiveFeedback+'" data-object-strategy="'+course.taskClasses[i].supportiveInformation.cognitiveStrategy+'" data-object-model="'+course.taskClasses[i].supportiveInformation.cognitiveModel+'"id="modifyTaskClassSupportiveInformation'+course.taskClasses[i].id+'">\n\
                                                                            <span class="glyphicon glyphicon-pencil"></span>\n\
                                                                        </span>\n\
                                                                    </span>\n\
                                                                </h4>\n\
                                                                <div class="myBlock">\n\
                                                                    <ul>\n\
                                                                        <li>Cognitive Strategy</li>\n\
                                                                        <p>'+ course.taskClasses[i].supportiveInformation.cognitiveStrategy +'</p>\n\
                                                                        <li>Cognitive Models</li>\n\
                                                                        <p>'+ course.taskClasses[i].supportiveInformation.cognitiveModel +'</p>\n\
                                                                        <li>Cognitive Feedback</li>\n\
                                                                        <p>'+ course.taskClasses[i].supportiveInformation.cognitiveFeedback +'</p>\n\
                                                                    </ul>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                            <div id="performanceCriteriaContainer" class="col-lg-6">\n\
                                                                <h4>Performance Criteria &nbsp; \n\
                                                                    <span>\n\
                                                                        <span data-toggle="modal" data-target="#modifyModal" data-object-object="taskClass" data-object-attribute="performance" data-object-id="'+course.taskClasses[i].id+'" data-object-inputtext="'+course.taskClasses[i].performanceCriteria+'" id="modifyTaskClassPerformance'+course.taskClasses[i].id+'">\n\
                                                                            <span class="glyphicon glyphicon-pencil"></span>\n\
                                                                        </span>\n\
                                                                    </span>\n\
                                                                </h4>\n\
                                                                <div class="myBlock">'+course.taskClasses[i].performanceCriteria+' </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div id="TCS'+i+'"></div>\n\
                                                    </div>');
        $("#deleteTaskClass"+course.taskClasses[i].id).bind("click",{par:course.taskClasses[i].id},deleteTaskClass);
        $("#taskClassMoveUp"+course.taskClasses[i].id).bind("click",{par:course.taskClasses[i].id},moveTaskClassUp);
        $("#taskClassMoveDown"+course.taskClasses[i].id).bind("click",{par:course.taskClasses[i].id},moveTaskClassDown);
        orderLearningTasksByIndex(course.taskClasses[i]);
        if(course.taskClasses[i].learningTasks.length > 1){
            for(var j = 1; j < course.taskClasses[i].learningTasks.length; j++){                
                $("#TCS"+i).append('<div class="learningTaskContainer">\n\
                                                <span>\n\
                                                    <span data-toggle="modal" data-target="#modifyModal" data-object-object="learningTask" data-object-attribute="title" data-object-id="'+course.taskClasses[i].learningTasks[j].id+'" data-object-inputtext="'+course.taskClasses[i].learningTasks[j].name+'" id="modifyLearningTask'+course.taskClasses[i].learningTasks[j].id+'">\n\
                                                        <span class="glyphicon glyphicon-pencil" ></span>\n\
                                                    </span>\n\
                                                    <span id="deleteLearningTask'+course.taskClasses[i].learningTasks[j].id+'">\n\
                                                        <span class="glyphicon glyphicon-remove"></span>\n\
                                                    </span>\n\
                                                    <span id="learningTaskMoveDown'+course.taskClasses[i].learningTasks[j].id+'">\n\
                                                        <span class="glyphicon glyphicon-arrow-down"></span>\n\
                                                    </span>\n\
                                                    <span id="learningTaskMoveUp'+course.taskClasses[i].learningTasks[j].id+'">\n\
                                                        <span class="glyphicon glyphicon-arrow-up"></span>\n\
                                                    </span>\n\
                                                    <span data-toggle="modal" data-target="#changeLearningTaskFromTaskClassModel"  data-object-slt="'+course.taskClasses[i].learningTasks[j].id+'" >\n\
                                                        <i class="fa fa-arrows" aria-hidden="true"></i>\n\
                                                    </span>\n\
                                                </span>\n\
                                                <div class="row">\n\
                                                    <div class="col-lg-6">\n\
                                                        <div style="border: 3px double black; background-color:white; margin-left:-6px">\n\
                                                        <h3>'+course.taskClasses[i].learningTasks[j].index + " " + course.taskClasses[i].learningTasks[j].name+'&nbsp;</h3>\n\
                                                        <span style="color:#52C452; background-color:white; border: 2px dotted black; padding:2px; margin-right:25px;">Build In Task Support: '+ course.taskClasses[i].learningTasks[j].buildInTaskSupport +'</span><span style="color:#4286f4; background-color:white; border: 2px dotted black; padding:2px">Problem Solving Guidance: '+ course.taskClasses[i].learningTasks[j].problemSolvingGuidance +'</span><br/><br/>\n\
\n\                                                      </div>\n\
                                                        <h4>Description  &nbsp; \n\
                                                            <span>\n\
                                                                <span data-toggle="modal" data-target="#modifyModal" data-object-object="learningTask" data-object-attribute="description" data-object-id="'+course.taskClasses[i].learningTasks[j].id+'" data-object-inputtext="'+course.taskClasses[i].learningTasks[j].description+'">\n\
                                                                    <span class="glyphicon glyphicon-pencil"></span>\n\
                                                                </span>\n\
                                                            </span>\n\
                                                        </h4>\n\
                                                              <p class="learningTaskDescription myBlock">'+ course.taskClasses[i].learningTasks[j].description+' </p>\n\
                                                    </div>\n\
                                                    <div class="col-lg-6">\n\
                                                        <h4>Procedural information  &nbsp;\n\
                                                            <span>\n\
                                                                <span data-toggle="modal" data-target="#modifyModal" data-object-object="learningTask" data-object-attribute="procedural" data-object-id="'+course.taskClasses[i].learningTasks[j].id+'" data-object-inputtext="'+course.taskClasses[i].learningTasks[j].proceduralInformation+'">\n\
                                                                    <span class="glyphicon glyphicon-pencil"></span>\n\
                                                                </span>\n\
                                                            </span>\n\
                                                        </h4>\n\
                                                        <div class="myBlock">'+course.taskClasses[i].learningTasks[j].proceduralInformation+' &nbsp; </div>\n\
                                                    </div>\n\
                                                </div>\n\
                                                <div class="row">\n\
                                                    <div class="col-lg-6">\n\
                                                        <h4>Goal  &nbsp; \n\
                                                            <span>\n\
                                                                <span data-toggle="modal" data-object-object="learningTask" data-object-attribute="goal" data-object-id="'+course.taskClasses[i].learningTasks[j].id+'" data-object-inputtext="'+course.taskClasses[i].learningTasks[j].goal+'" data-target="#modifyModal">\n\
                                                                    <span class="glyphicon glyphicon-pencil"></span>\n\
                                                                </span>\n\
                                                            </span>\n\
                                                        </h4>\n\
                                                        <div class="myBlock">'+course.taskClasses[i].learningTasks[j].goal+'</div>\n\
                                                    </div>\n\
                                                    <div class="col-lg-6">\n\
                                                        <h4>Solution  &nbsp; \n\
                                                            <span>\n\
                                                                <span data-toggle="modal" data-target="#modifyModal" data-object-object="learningTask" data-object-attribute="solution" data-object-id="'+course.taskClasses[i].learningTasks[j].id+'" data-object-inputtext="'+course.taskClasses[i].learningTasks[j].solution+'">\n\
                                                                    <span class="glyphicon glyphicon-pencil"></span>\n\
                                                                </span>\n\
                                                            </span>\n\
                                                        </h4>\n\
                                                        <div class="myBlock">'+course.taskClasses[i].learningTasks[j].solution+'</div>\n\
                                                    </div>\n\
                                                </div>\n\
                                                <div class="row">\n\
                                                    <div class="col-lg-6">\n\
                                                        <h4>Solution Proces  &nbsp; \n\
                                                            <span>\n\
                                                                <span data-toggle="modal" data-target="#modifyModal" data-object-object="learningTask" data-object-attribute="solutionProces" data-object-id="'+course.taskClasses[i].learningTasks[j].id+'" data-object-inputtext="'+course.taskClasses[i].learningTasks[j].solutionProces+'">\n\
                                                                    <span class="glyphicon glyphicon-pencil"></span>\n\
                                                                </span>\n\
                                                            </span>\n\
                                                        </h4>\n\
                                                        <div class="myBlock">'+course.taskClasses[i].learningTasks[j].solutionProces+'</div>\n\
                                                    </div>\n\
                                                </div>\n\
                                    </div>');            
                $("#deleteLearningTask"+course.taskClasses[i].learningTasks[j].id).bind("click",{par:course.taskClasses[i].learningTasks[j].id},deleteLearningTask);
                $("#learningTaskMoveUp"+course.taskClasses[i].learningTasks[j].id).bind("click",{par:course.taskClasses[i].learningTasks[j].id},moveLearningTaskUp);
                $("#learningTaskMoveDown"+course.taskClasses[i].learningTasks[j].id).bind("click",{par:course.taskClasses[i].learningTasks[j].id},moveLearningTaskDown);
            }                
        }          
    }    
}


function createTaskClassView(taskClass){
    
}


function createLearningTaskView(learningTask){
    
}



function orderTaskClassesByIndex(course){
    var swapper = new TaskClass();    
    for(var i = 1; i < course.taskClasses.length;i++){
        for(var j = 1; j < course.taskClasses.length-1;j++){
            if(course.taskClasses[i].index < course.taskClasses[j].index){
                swapper = course.taskClasses[i];
                course.taskClasses[i] = course.taskClasses[j];
                course.taskClasses[j] = swapper;                
            }
        }
    }
}

function orderLearningTasksByIndex(taskClass){
    var swapper = new LearningTask();    
    for(var i = 1; i < taskClass.learningTasks.length;i++){
        for(var j = 1; j < taskClass.learningTasks.length-1;j++){
            if(taskClass.learningTasks[i].index < taskClass.learningTasks[j].index){
                swapper = taskClass.learningTasks[i];
                taskClass.learningTasks[i] = taskClass.learningTasks[j];
                taskClass.learningTasks[j] = swapper;                
            }
        }
    }
}

//LEARNING TASK
function initLTaskModel(){
    $("#taskClassesSelector").empty();
    var course = get4CIDDataFromDatabase();    
    for (i = 1; i < course.taskClasses.length; i++) {
        $("#taskClassesSelector").append('<option name="'+course.taskClasses[i].id+'" label="'+course.taskClasses[i].name+'" id="taskClassesOption'+course.taskClasses[i].id+'">'+course.taskClasses[i].name+'</option>');

    }
}

function createNewLearningTask(){
    var learningTaskName = $("#newLearningTaskText").val();
    var learningTaskDescription = $("#newLearningTaskDescription").val();
    var taskClassId = parseInt($("#taskClassesSelector").find("option:selected").attr("name"));
    if(taskClassId > 0 && learningTaskDescription !== "" && learningTaskName !== ""){
        $.ajax({
            type:"POST",
            url:"AddLearningTaskToDatabaseServlet",
            data:"taskClassId=" + taskClassId + "&learningTaskName="+learningTaskName + "&learningTaskDescription="+learningTaskDescription,
            async:false,        
            success: function(){
                location.reload();                    
            }   
        });  
    } else {
        alert("Fill in all the fields");
    }      
}

function deleteLearningTask(event){
    var result = confirm("Want to delete?");
    if(result){
    $.ajax({
        type:"POST",
        url:"DeleteLearningTaskFromDatabaseServlet",
        data:"learningTaskId="+ event.data.par,
        sync:false,
        success: function(){
           location.reload(); 
        }
    });     
    }
}





function readLearningTasks(taskClassId){
    var learningTasks = {};
    $.ajax({
        type:"GET",
        url:"GetLearningTasksFromDatabase",
        data:"taskClassId=" + taskClassId ,
        async:false,        
        success: function(json){
            for(var i = 1; i < json.length; i++){
                var learningTask=  new LearningTask();
                learningTask.name = json.learningTasks[i].name;
                learningTask.description = json.learningTasks[i].description;
                learningTask.index = json.learningTasks[i].index;
                learningTask.id = json.learningTasks[i].id;
            }            
            learningTasks.push(learningTask);
        }   
});
return learningTasks;
}



//4CID CLASSES

function FourCID(){
    this.name=null;
    this.goal=null;
    this.taskClasses=[];
    
    this.orderTaskClassesAsc = function(){
        for(var i = 0; i < taskClasses.length; i++){
            
        }
    };
    
    this.switchTaskClass = function (taskClass1, taskClass2){
        var swap = taskClass1.index;
        taskClass1.index = taskClass2.index;
        taskClass2.index = swap;
    };




}

function TaskClass(){
    this.id=null;
    this.name=null;
    this.description=null;
    this.learningTasks=[];
    this.index=null;
    this.orderLearningTasksAsc = function(){
        for(var i = 0; i < learningTasks.lenght; i++){
            
        }
    };
    this.switchTaskClass = function (learningTask1, learningTask2){
        var swap = learningTask1.index;
        learningTask1.index = learningTask2.index;
        learningTask2.index = swap;
    };
}

function LearningTask(){
    this.name=null;
    this.description=null;
    this.index=null;
    
}

