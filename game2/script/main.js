$(document).ready(function() { 
  var arrowLength=5;
  

  var gameState="ready";
  var playState="";
  var pressRate=0;
  var spaceKeyState="";
  var CspaceKeyState;
  var preSpaceKeyState;
  var spacePressedCount=0;
  var totalSpacePressedCount=0;
  var time=0;
  var time2=0;
  var time3=0;                      //use to caculate the reduce ennergy in timeout
  var time4=0;
  var readyTimeCount=0;             //this time use to caculate passed time in ready period(期间、阶段)
  var totalTime=0;
  var goodOrBad="null";
  var caculateTime=60;
  var timeIcount=0;
  var timeArrow;
  var progressBarValue=0;
  var isStartPlay=false;
  var volume=1;
  var isBarStart;
  var thePlayerRate=2;
  var gameFrameRate=60;
  var textBox_height=30;
  var myVideo;
  var videoIndex=1;
  var volume_up_value=0.05;
  var volume_down_value=0.06;
  var readyTime=10;
  var keys;
  var videoListLenght=7;
  var playEnergy=0;
  var bgChangeTime=10;//相隔多长时间背景切换一次，单位为秒
  var myAudio;
  var isInitAudioFileList=false;
  var allowFullscreen=true;//whether allow the play view to fullScreen
  var result;
  var stage2time={
    "级别一":2,
    "级别二":1.5,
    "级别三":1.0,
    "级别四":0.5,
    "级别五":0.3,
  }
  var isTest=false;

  if(isTest){
    $("#test").show();
  }
  document.addEventListener("fullscreenchange", FShandler);
  document.addEventListener("webkitfullscreenchange", FShandler);
  document.addEventListener("mozfullscreenchange", FShandler);
  document.addEventListener("MSFullscreenChange", FShandler);
  function FShandler(){
    allowFullscreen = ! allowFullscreen;
    if(allowFullscreen){
            $("#playView").css("zoom",1);
    }
  }
   
  //click the page to make the play view fullscreen
  $(document).click(function(){

    if(allowFullscreen){
      var rateHeight = parseFloat(screen.height)/$("#playView").height();
      var rateWidth = parseFloat(screen.width)/$("#playView").width();
      console.log("deviceWidth:"+screen.width+"px");
       $("#playView").css("zoom",rateWidth > rateHeight ? rateHeight : rateWidth);
       $("#playView").fullScreen();
    }
  });

  // Create the event
  //var event = new CustomEvent("click", { "detail": "Example of an event" });

  // Dispatch/Trigger/Fire the event
  //document.dispatchEvent(event);//this method couldn't make element fullscreen

  init();

  // document.oncontextmenu=function(event){
  //   if(!event){ var event = window.event; }
  //   // if(event.button==2){
  //   //     console.log("click!");
  //   //     spacePressedCount++;
  //   //     if(gameState=="ready"){
  //   //       myAudio.play();
  //   //       gameState="play";
  //   //     }
  //   //     //显示歌曲的名字 | present the audio name
  //   //     $("#audio_name").html(myAudio.audioFiles[myAudio._currentIndex]);
  //   //     //显示背景图片  |  present background picture  
  //   //     $("#player_background_img").attr("src","images/BG/"+myAudio.getBgName());

  //   //     return false;
  //   // }
  //    $("html").animate({opacity:"0"},null,function(){
  //       window.location.href="../index.html";
  //     });
  //     return false;
     
  // }
  document.onclick=function(){
      //console.log("click!");
        spacePressedCount++;
        if(gameState=="ready"){
          myAudio.play();
          gameState="play";
        }
        //显示歌曲的名字 | present the audio name
        $("#audio_name").html(myAudio.audioFiles[myAudio._currentIndex]);
        //显示背景图片  |  present background picture  
        $("#player_background_img").attr("src","images/BG/"+myAudio.getBgName());
  }

  var back_button=document.getElementById("back_button");

  back_button.oncontextmenu=function(){

      $("html").animate({opacity:"0"},null,function(){
        window.location.href="../index.html";
      });
      return false;
  }

  function init(){  
    //如果开启PHP服务 if using the php service
    if(config.isPhp==true){
       //先从服务端更新本地config中的数据，再初始化
        $.get("php/setting.php",{"type":"get"},function(data){
            
            config.preferTime=parseInt(data["preferTime"]);
            config.playerValue=parseInt(data["playerValue"]);
            config.reduceValue=parseInt(data["reduceValue"]);
            config.reduceTime=parseInt(data["reduceTime"]);

            isBarStart=false;

          $( "#progressbar" ).progressbar({
           value: config.playerValue
          });

          // $("#levelSpinner").spinner();
          // $( "#selectmenu" ).selectmenu({
          //   width:"120px",
          //   change:function(){
          //     console.log(stage2time[$( "#selectmenu" ).val()]);
          //     initUpdateConfig(stage2time[$( "#selectmenu" ).val()]*10);
          //   }

          // });
     
          myAudio=new juerryjs.Audio();
         //
          console.log(myAudio);
          console.log(myAudio.isInit());
          console.log(myAudio.isLoop());
          ///$("#player_background_img").attr("src","images/BG/"+myAudio.getBgName());
          //console.log(myAudio.isPaused());

          //referenceSpeed=50/config.preferTime;
          referenceSpeed=1;
          console.log("参考速度："+referenceSpeed);

          setInterval(gameUpdate,1000/60);

          volume_down_value = config.reduceValue/100;

          playEnergy = config.playerValue;
          
          initUpdateConfig();//初始化更新数据pressTimesArray=new Array(config.preferTime/10); //指创建长度为X的数组

          
          //console.log(config);
        },"json").fail(function(){
            isBarStart=false;

          $( "#progressbar" ).progressbar({
           value: config.playerValue
          });
         
          
          myAudio=new juerryjs.Audio();
          //
          console.log(myAudio);
          console.log(myAudio.isInit());
          console.log(myAudio.isLoop());

          //console.log(myAudio.isPaused());

          referenceSpeed=1;

          console.log("参考速度："+referenceSpeed);

          setInterval(gameUpdate,1000/60);

          volume_down_value=config.reduceValue/100;

          playEnergy=config.playerValue;

          initUpdateConfig();
        });
    //如果不启用php服务 if do not use the php service
    }else{

         isBarStart=false;

          $( "#progressbar" ).progressbar({
           value: config.playerValue
          });
         
          
          myAudio=new juerryjs.Audio();
         //
          console.log(myAudio);
          console.log(myAudio.isInit());
          console.log(myAudio.isLoop());

          //console.log(myAudio.isPaused());

          referenceSpeed=1;

          console.log("参考速度："+referenceSpeed);

          setInterval(gameUpdate,1000/60);

          volume_down_value=config.reduceValue/100;

          playEnergy=config.playerValue;

          initUpdateConfig();
             
    }
  
  }

  function gameUpdate(){

      CspaceKeyState = spaceKeyState;
    
      switch(gameState)
      {
          case "ready":
          if(myAudio.isInit()&&!isInitAudioFileList){
            isInitAudioFileList=true;
            
            $("#player_background_img").attr("src","images/BG/"+myAudio.getBgName());
          }
          break;

          case "play":
 
          time ++;
          totalTime ++;
          time4++;
          //0.1秒钟检查一次结果
          if(time4 >= 6){
            time4=0;
            //caculate the result
            result = updateSpeedF(spacePressedCount);
            $("#test1").html(result);
            $("#test2").html(pressTimesArray.length);
          }

          //if time to 1 second then execute bellow code,the default caculateTime is 60.
          if(time >= caculateTime)
          {
            time = 0;
            time3++;
            //the keepPressTimes is in update.js file,means the time of caculate player time
            // if(keepPressTimes<10){ 
                         
                             
            // }
            

            if(keepPressTimes >= 0){

               if(isStartPlay == false)
               {
                  
                  isStartPlay = true;
                 
                  spacePressedCount = 0;
                 
               }

               if(time3 >= config.reduceTime){
                  time3 = 0;
                
                  if(result == 1){
                     myAudio.addVolume(volume_up_value);

                     myAudio.reduceBgOpacity(volume_up_value);

                     if(playEnergy < 100)playEnergy += 1;
                     //console.log("addVolume"+volume_up_value);

                     if(myAudio.isPaused() &&! myAudio.isEnded()){
                        myAudio.play();
                     }
                     if($("#fighting").css("display") != "none"){
                               $("#fighting").hide();
                        }
                  }
                  else if(result==2){
                    
                      if(playEnergy>0){

                        volume_down_value=myAudio.getVolume()/playEnergy;

                        myAudio.reduceVolume(volume_down_value);
                        
                        myAudio.addBgOpacity(volume_down_value);

                        playEnergy-=(playEnergy*0.8>=config.reduceValue ? playEnergy*0.8 : config.reduceValue);
                        
                        if(playEnergy<0){
                          playEnergy=0;
                          myAudio.setBgOpacity(0.9);

                        }
                        //console.log("reduceVolume"+volume_down_value);

                        

                      }else{
                        myAudio.pause();
                        
                        if($("#fighting").css("display")=="none"){
                               $("#fighting").show();
                        }
     
                      }
                    }
                  }
                   // if( result==1){
                   //      window.status=goodOrBad="good!";
                   //  }
                   //  else if(result==2){
                   //      window.status=goodOrBad="bad!";
                   //  }
              }

              spacePressedCount=0;

              $("#player_background_top").css("opacity",myAudio.getBgOpacity());
              

              $( "#progressbar" ).progressbar({
                    value: playEnergy
               });
               
              if(myAudio.getVolume()>0&&myAudio.isEnded()){
                 myAudio.playNextByRandom();
                 $("#audio_name").html(myAudio.audioFiles[myAudio._currentIndex]);
              }

              if(totalTime>=bgChangeTime*gameFrameRate){
                 totalTime=0;
                 
                 $("#player_background_img").animate({opacity:"0"},null,function(){
                      $("#player_background_img").attr("src","images/BG/"+myAudio.getBgNameByRandom());
                       $("#player_background_img").animate({opacity:"1"},null,function(){});
                  });
              }
          }
         
          

          //var result=Math.round((totalTime/60)*10)/10;
       
          break;

          case "gameOver":
          //deal endthing
          break;
          default:      
      }

       preSpaceKeyState=spaceKeyState;
  }

  function initAudio(elem){

    audio.songPlayer=new Audio('Music/' + "zhendeaininiuniu.mp3");
  }

  function playNext(){
      $('#filelist li').removeClass('active');
      $('#filelist li').eq(videoIndex-1).addClass('active');
  }

   
});
