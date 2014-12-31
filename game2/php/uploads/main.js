$(document).ready(function() {
    // $("#game2_source_manage").fadeOut();
	//console.log("into ready");
	$("#game1_slider").slider({
    	range: false,
    	value: 1,
        step:0.1,
        max:300,
        slide: function( event, ui ) {
            // $("#game1_input").attr(
            //     "value",
            //     ""+$( "#game1_slider" ).slider( "value" )
            // );

            $("#game1_input").val(""+$( "#game1_slider" ).slider( "value" ));
          
        }
    });

    $("#game2_slider1").slider({
	range: false,
	value: $("#game2_input1").attr("value"),
    step:0.1,
    max:300,
    slide: function( event, ui ) {$("#game2_input1").val(+$( "#game2_slider1" ).slider( "value" ));}
    });

     $("#game2_slider2").slider({
    range: false,
    value: $("#game2_input2").attr("value"),
    step:0.1,
    max:100,
    slide: function( event, ui ) {$("#game2_input2").val(+$( "#game2_slider2" ).slider( "value" ));}
    });

      $("#game2_slider3").slider({
    range: false,
    value: $("#game2_input3").attr("value"),
    step:1,
    max:100,
    slide: function( event, ui ) {$("#game2_input3").val(+$( "#game2_slider3" ).slider( "value" ));}
    });

      $("#game2_slider4").slider({
    range: false,
    value: $("#game2_input4").attr("value"),
    step:1,
    max:1000,
    slide: function( event, ui ) {$("#game2_input4").val(+$( "#game2_slider4" ).slider( "value" ));}
    });
    
    $("#g2_s_m_bt").click(function(){
        $("#game2_config").fadeOut();
        $("#game2_source_manage").fadeIn();
    });

    $("#g2_set_bt").click(function(){
        $("#game2_source_manage").fadeOut();
        $("#game2_config").fadeIn();
    });

    ////////////////////////////////////////////////////////////   list file
    //list the music and bg file in setting place
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
            },"json");
        }else{
            list_source_file($("#music_ul"),config.defaultAudioFile,"audio");
            list_source_file($("#bg_ul"),config.defaultBgFile,"image");  
                 addDeleteEvent();       
        }    
    }
    

    //list file in DOM element
    function list_source_file(target,source,sourceType){
              target.html("");
              for(var index in source){
                 //console.log(index);
                 var li = document.createElement('li');  
                  li.innerHTML = "<div class='file_name' id='"+sourceType+"'>"+source[index]+"</div> <div class='delete'>delete</div>";  
                  target.append(li);  
              }
           
              
    }

    ///////////////////////////////////////////////////////////////delete file
    function addDeleteEvent(){
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

    ///////////////////////////////////////////////////////////////upload file
    $("#bgfileuploader").uploadFile({
    url:"../game2/php/upload.php",
    fileName:"imgfile",
    uploadFolder:"../images/BG/"
    });

     $("#audiofileuploader").uploadFile({
    url:"../game2/php/upload.php",
    fileName:"audiofile"
    });
    
    
});