$(document).ready(function() {
    // $("#game2_source_manage").fadeOut();
	//console.log("into ready");
    // var game1_config;
    // var game2_config;
    // var game3_config;
 ////////////////////////////////////////////////////////////ajax异步加载游戏初始化时据   
    $.get("../game1/config.xml",function(data){
            var config={};
            config.preferTime=parseFloat($(data).children().children("preferTime").html());
            //console.log(config.preferTime);
            game1_setting_init(config)
          

        });
    $.get("../game2/config.xml",function(data){
            var config={};
            config.preferTime=parseFloat($(data).children().children("preferTime").html());
            config.playerValue=parseFloat($(data).children().children("playerValue").html());
            config.reduceValue=parseFloat($(data).children().children("reduceValue").html());
            config.reduceTime=parseFloat($(data).children().children("reduceTime").html());
            //console.log(config.preferTime);
            game2_setting_init(config)
          

        });
    
    // $.get("../game2/php/setting.php",{"type":"get"},function(data){
            
    //         var config={};
    //         config.preferTime=parseFloat(data["preferTime"]);
    //         config.playerValue=parseFloat(data["playerValue"]);
    //         config.reduceValue=parseFloat(data["reduceValue"]);
    //         config.reduceTime=parseFloat(data["reduceTime"]);
         
    //         game2_setting_init(config);

    //     },"json");
    
//////////////////////////////////////////////////////激活game2中配置栏的背景为深红色
     $(".config_bt").css({"background":"#a11","color":"#fff"});

///////////////////////////////////////////////////////game1 input and slider init
                                               ///////game1 输入框和滑块初始化
function game1_setting_init(config){
    $("#game1_input").val(config.preferTime);
	$("#game1_slider").slider({
    	range: false,
    	value: config.preferTime,
        step:0.1,
        min:1,
        max:300,
        slide: function( event, ui ) {
            // $("#game1_input").attr(
            //     "value",
            //     ""+$( "#game1_slider" ).slider( "value" )
            // );

            $("#game1_input").val(""+$( "#game1_slider" ).slider( "value" )).trigger('change');
          
        }
    });
}
///////////////////////////////////////////////////////game2 input and slider init
                                               ///////game2 输入框和滑块初始化
function game2_setting_init(config){
    $("#game2_input1").val(config.preferTime);
    $("#game2_input2").val(config.playerValue);
    $("#game2_input3").val(config.reduceValue);
    $("#game2_input4").val(config.reduceTime);


    $("#game2_slider1").slider({
    range: false,
    value: config.preferTime,
    step:0.1,
    min:1,
    max:300,
    slide: function( event, ui ) {$("#game2_input1").val(+$( "#game2_slider1" ).slider( "value" )).trigger('change');}
    });

     $("#game2_slider2").slider({
    range: false,
    value: config.playerValue,
    step:1,
    min:0,
    max:100,
    slide: function( event, ui ) {$("#game2_input2").val(+$( "#game2_slider2" ).slider( "value" )).trigger('change');}
    });

      $("#game2_slider3").slider({
    range: false,
    value: config.reduceValue,
    step:1,
    min:1,
    max:100,
    slide: function( event, ui ) {$("#game2_input3").val(+$( "#game2_slider3" ).slider( "value" )).trigger('change');}
    });

      $("#game2_slider4").slider({
    range: false,
    value: config.reduceTime,
    step:1,
    max:1000,
    slide: function( event, ui ) {$("#game2_input4").val(+$( "#game2_slider4" ).slider( "value" )).trigger('change');}
    });
}
//////////////////////////////////////////////////////////save button init
                                                 ////////保存按钮初始化  
 $(".save_button").prop("disabled",true);
   $(".save_button").css("background-color","#99b57a");  
   
   $("#game1 .setting_input").change(
    function(){

         $("#game1 .save_button").prop("disabled",false);
         $("#game1 .save_button").css("background-color","#77b55a");  
   }
   );  
   $("#game2 .setting_input").change(
    function(){
         
         $("#game2 .save_button").prop("disabled",false);
         $("#game2 .save_button").css("background-color","#77b55a");  
   }
   );    
//////////////////////////////////////////////////////////game2 save button click event handle
                                                 ////////game2保存按钮点击事件处理     
   $("#game2_save_button").click(function(){
        $.get("../game2/php/setting.php",
            {"type":"update",
              "data":{"preferTime":$("#game2_input1").val(),
                      "playerValue":$("#game2_input2").val(),
                       "reduceValue":$("#game2_input3").val(),
                       "reduceTime":$("#game2_input4").val()
              }},
            function(data){
            alert(data);
            $("#game2 .save_button").prop("disabled",true);
            $("#game2 .save_button").css("background-color","#99b57a");  
            // var config={};
            // config.preferTime=parseInt(data["preferTime"]);
            // config.playerValue=parseInt(data["playerValue"]);
            // config.reduceValue=parseInt(data["reduceValue"]);
            // config.reduceTime=parseInt(data["reduceTime"]);
         
            // game2_setting_init(config);

        },"json").fail(function(){
           alert("error,请检查是否已开启php服务！");
        });
    });  
//////////////////////////////////////////////////////////game1 save button click event handle
                                                 ////////game1保存按钮点击事件处理   




   $("#game1_save_button").click(function(){
        $.get("../game1/php/setting.php",
            {"type":"update",
              "data":{"preferTime":$("#game1_input").val()
              }},
            function(data){
            alert(data);//data="save success" from service
            $("#game1 .save_button").prop("disabled",true);
            $("#game1 .save_button").css("background-color","#99b57a");  
        },"json").fail(function(){
           alert("error,请检查是否已开启php服务！");
        });
    }); 
    
    // $(".setting_input").blur(function(){
    //     if($(this).val()<0)$(this).val(0);
    //     var slider=$(this).prev();
    //     console.log(slider);
    //     var maxValue=slider.slider("max");
    //     var step=slider.slider("step");
    //     var fix;
    //      if(step==0.1)fix=1;
    //      if(step>0)fix=0;
    //     if($(this).val()>maxValue){
    //         $(this).val(maxValue);
    //     }
    //     $(this).val(parseFloat($(this).val()).toFixed(fix)); 
    //     slider.slider({"value":$(this).val()});
    // });
/////////////////////////////////////////////////////////the input onBlur event handle
                                        ////////////////输入框失去焦点事件处理
   $("#game1_input").blur(event,function(){
         if($(this).val()<1)$(this).val(1);
         if($(this).val()>300)$(this).val(300);
         $(this).val(parseFloat($(this).val()).toFixed(1));   
         $( "#game1_slider" ).slider( {"value": $(this).val()})

    });

    $("#game2_input1").blur(event,function(){
         if($(this).val()<1)$(this).val(1);
         if($(this).val()>300)$(this).val(300);
         $(this).val(parseFloat($(this).val()).toFixed(1));   
         $( "#game2_slider1" ).slider( {"value": $(this).val()})

    });
    $("#game2_input2").blur(function(){
         if($(this).val()<0)$(this).val(0);
         if($(this).val()>100)$(this).val(100);
         $(this).val(parseFloat($(this).val()).toFixed(0));
         $( "#game2_slider2" ).slider( {"value": $(this).val()})
    });
    $("#game2_input3").blur(function(){
         if($(this).val()<1)$(this).val(1);
         if($(this).val()>100)$(this).val(100);
         $(this).val(parseFloat($(this).val()).toFixed(0));
         $( "#game2_slider3" ).slider( {"value": $(this).val()})
    });
    $("#game2_input4").blur(function(){
         if($(this).val()<1)$(this).val(1);
         if($(this).val()>1000)$(this).val(1000);
         $(this).val(parseFloat($(this).val()).toFixed(0));
         $( "#game2_slider4" ).slider( {"value": $(this).val()})
    });

///////////////////////////////////////////////////////////game2 tab switch event handle
                                            //////////////game2 栏目切换事件处理
    $(".config_bt").click(function(){ 
        $("#game2_config").css("visibility","visible");
        $("#game2_music_manage").css("visibility","hidden");
        $("#game2_bg_manage").css("visibility","hidden");
        $(".config_bt").css({"background":"#a11","color":"#fff"});
        $(".music_bt").css({"background":"#ebb","color":"#666666"});
        $(".bg_bt").css({"background":"#ebb","color":"#666666"});
    });

    $(".music_bt").click(function(){
        $("#game2_config").css("visibility","hidden");
        $("#game2_music_manage").css("visibility","visible");
        $("#game2_bg_manage").css("visibility","hidden");
        $(".music_bt").css({"background":"#a11","color":"#fff"});
        $(".config_bt").css({"background":"#ebb","color":"#666666"});
        $(".bg_bt").css({"background":"#ebb","color":"#666666"});
    });
     $(".bg_bt").click(function(){
        $("#game2_config").css("visibility","hidden");
        $("#game2_music_manage").css("visibility","hidden");
        $("#game2_bg_manage").css("visibility","visible");
        $(".bg_bt").css({"background":"#a11","color":"#fff"});
        $(".music_bt").css({"background":"#ebb","color":"#666666"});
        $(".config_bt").css({"background":"#ebb","color":"#666666"});
    });

    ////////////////////////////////////////////////////////////   list file
    //list the music and bg file in setting place //////////list music and bg files 
    list_files();
    function list_files(){
        if(config.isPhp){
            var audioFiles=null;
            var bgFiles=null;
            $.get("../game2/php/audio.php",function(data){
                //console.log(data);

                  audioFiles=data.audioFiles;
                  console.log(data.audioFiles);

                  bgFiles=data.bgFiles;
                  list_source_file($("#music_ul"),audioFiles,"audio");
                  list_source_file($("#bg_ul"),bgFiles,"image"); 

                  addDeleteEvent();
            },"json").fail(function(){
                  list_source_file($("#music_ul"),config.defaultAudioFile,"audio");
                  list_source_file($("#bg_ul"),config.defaultBgFile,"image");  
                 addDeleteEvent();    
                 console.log("get audio file name fail,use default name!");
            }).error(function(error){
                 console.log(error.error);
            });
        }else{
            list_source_file($("#music_ul"),config.defaultAudioFile,"audio");
            list_source_file($("#bg_ul"),config.defaultBgFile,"image");  
                 addDeleteEvent();       
        }    
    }
    

    //list file in DOM element///////////////////////////////////遍历添加文件列表

    function list_source_file(target,source,sourceType){
              target.html("");
              for(var index in source){
                 //console.log(index);
                 var li = document.createElement('li');  
                  li.innerHTML = "<div class='file_name' id='"+sourceType+"'>"+source[index]+"</div> <div class='delete'>delete</div>";  
                  target.append(li);  
              }
           
              
    }

    ///////////////////////////////////////////////////////////////删除文件 delete file
    function addDeleteEvent(){                              //////game2 delete file || music and bg
        $(".delete").click(function(){
           
            var r=confirm("Are you sure to delete it?");
            if(r){
                //console.log($(this).parent().children(".file_name").html());
                var delete_name=$(this).parent().children(".file_name").html();
                var fileType=$(this).parent().children(".file_name").attr("id");
                //alert(delete_name+"删除成功！");
                
                    $.get("../game2/php/audio.php",{ type: "delete", fileName: delete_name,fileType: fileType },function(data){
                    console.log("data");
                    alert(data);
                 
                    list_files();
                        
                },"json").fail(function(){
                    alert("服务端出错！");
                });

            }
        });
    }

    ///////////////////////////////////////////////////////////////上传文件 upload file
    $("#bgfileuploader").uploadFile({                 ////////game2 bg upload
    url:"../game2/php/upload.php",
    fileName:"imgfile",
    dragdropWidth:"80%",
    statusBarWidth: "auto",
    acceptFiles:"image/*",
    showStatusAfterSuccess:false,
    showDone:false,
    uploadButtonClass:"ajax-file-upload-green",
    onSubmit: function (files, xhr) {
        $(".ajax-upload-dragdrop").hide();
    },
    onSuccess: function (files, response, xhr, pd) {
        // console.log(files);
        
        alert(response);
        $(".ajax-upload-dragdrop").show();
        // console.log(xhr);
        // console.log(pd);
       list_files();
    },
    onError: function (files, status, message, pd) {
        console.log(files);
        console.log(status);
        console.log(message);
        console.log(pd);
       $(".ajax-upload-dragdrop").show();
       setTimeout("$('.ajax-file-upload-statusbar').hide()",5000);
    },
    });
    
     $("#audiofileuploader").uploadFile({             ////////game2 music upload
    url:"../game2/php/upload.php",
    fileName:"audiofile",
    acceptFiles:"audio/*",
    dragdropWidth:"80%",
    statusBarWidth: "auto",
    showStatusAfterSuccess:false,
    showDone:false,
    uploadButtonClass:"ajax-file-upload-green",
    maxFileSize:1024*50000,
    onSubmit: function (files, xhr) {
        $(".ajax-upload-dragdrop").hide();
    },
    onSuccess: function (files, response, xhr, pd) {
        // console.log(files);
        
        alert(response);
        $(".ajax-upload-dragdrop").show();
        // console.log(xhr);
        // console.log(pd);
       list_files();
    },
    onError: function (files, status, message, pd) {
        console.log(files);
        console.log(status);
        console.log(message);
        console.log(pd);
        $(".ajax-upload-dragdrop").show();
        setTimeout("$('.ajax-file-upload-statusbar').hide()",5000);
        
        

    },
    });
    
    
});