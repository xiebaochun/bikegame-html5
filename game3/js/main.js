$(function(){

	var gameStates = ["INIT","PLAYING","END"];

    var gameState = "INIT";

	var FPS = 60;

	var gamePassedTime = 0;

	var count1 = 0;

	var timeInterval;

	var myVideo;

	var result = 2;

	var spacePressedCount = 0;
 
	var videoNames = ["01","02","03","04","05","06"];
    
    var videoName;

    var allowFullscreen = true;

	var spacePressedCount_total = 0;

    $.get("../game2/php/setting.php", { "type":"get" } ,function(data) {          
            config.preferTime = parseInt(data["preferTime"]);
            config.playerValue = parseInt(data["playerValue"]);
            config.reduceValue = parseInt(data["reduceValue"]);
            config.reduceTime = parseInt(data["reduceTime"]);
            initUpdateConfig();
        },"json").fail(function() {
            initUpdateConfig();
     });

    $(".video_button").each(function(index){
    	//console.log($(this));
    	$(this).css("background-image","url(./images/video"+(index+1)+".jpg)");
    });    

	$(".video_button").click(function() {
		var id = $(this).attr("id");
        //videoName = videoNames[parseInt(id.substr(id.length - 1))-1];
        videoName = "01";
        console.log(videoName);
		$(this).parent().fadeOut().next().fadeIn();	
		timeInterval = setInterval(update , parseFloat(1000 / FPS));	
		$("#game_passed_time").text(getTimeFromSeconds(0));
		$("#fighting").hide();
		gameState = "INIT";		
	});
    
    $("#back_button_1").click(function(){
        $("html").animate({opacity:"0"},null,function() {
           window.location.href = "../index.html";
        });
	});    

	$("#back_button_11").click(function(){
        $(this).parent().hide().next().next().fadeIn();
	});
    
    $("#back_button_3").click(function(){
        $(this).parent().hide().prev().prev().fadeIn();
	});

    var back_button1 = document.getElementById("back_button_1");
    back_button1.oncontextmenu = function() {
      $("html").animate({opacity:"0"},null,function() {
        window.location.href = "../index.html";
      });
      return false;
    }

    var back_button2 = document.getElementById("back_button_2");
    back_button2.oncontextmenu = function() {
        $(this).parent().fadeOut().prev().fadeIn();
	    myVideo.stop();
	    clearInterval(timeInterval);
        return false;
    }

	document.onclick = function() {
        spacePressedCount++;   
        spacePressedCount_total++; 
    }

    document.addEventListener("fullscreenchange", FShandler);
    document.addEventListener("webkitfullscreenchange", FShandler);
    document.addEventListener("mozfullscreenchange", FShandler);
    document.addEventListener("MSFullscreenChange", FShandler);
    function FShandler() {
    	allowFullscreen = ! allowFullscreen;
    	if(allowFullscreen){
		    $("#viewWraper").css("zoom",1);
		 }
    }

    $(document).click(function() {
   	    if (allowFullscreen){
   		    console.log($("#viewWraper").width());
	        var rateHeight = parseFloat(screen.height) / $("#viewWraper").height();
	        var rateWidth = parseFloat(screen.width) / $("#viewWraper").width();
	        $("#viewWraper").css("zoom", Math.min(rateHeight , rateWidth));
	        //$("#viewWraper").css("-moz-transform","scale(" + rateHeight + ")");
	        $("#viewWraper").fullScreen();
        }
   });

	function update() {

		switch (gameState) {
			case "INIT":
                 gamePassedTime = 0;
	             count1 = 0;	
	             spacePressedCount_total = 0;
	             myVideo = new VideoWraper(document.getElementById("videoPlayer"),videoName);
	             myVideo.play();
	             gameState = "PlAYING";
			break;

			case "PlAYING":
                count1++;

                $("#press_count").text(spacePressedCount_total);
                if (myVideo.isEnded()) {
                   $(back_button2).trigger("oncontextmenu");
                }

				if (count1 % 60 == 0) {
					gamePassedTime++;
					$("#game_passed_time").text(getTimeFromSeconds(gamePassedTime));
				}

				if (count1 % (FPS/10) == 0) {
					result = updateSpeedF(spacePressedCount);
					spacePressedCount = 0;
					if (result == 1 && myVideo.isPlaying == false) {
                        myVideo.play();
                        $("#fighting").hide();
					}
					if (result == 2 && myVideo.isPlaying == true) {
						$("#fighting").show();
                        myVideo.pause();
					}
				}
			break;

			case "END":
			break;
		}
	}

	function getTimeFromSeconds(totalSeconds) {
	    if (totalSeconds < 86400) {
	        var dt = new Date("01/01/2000 0:00");
	        dt.setSeconds(totalSeconds);
	        return formatTime(dt);
	    } else {
	        return null;
	    }
	}

	function formatTime(dt) {
	    var h = dt.getHours(),
	        m = dt.getMinutes(),
	        s = dt.getSeconds(),
	        r = "";
	    if (h > 0) {
	        r += (h > 9 ? h.toString() : "0" + h.toString()) + ":";
	    }
	    r += (m > 9 ? m.toString() : "0" + m.toString()) + ":"
	    r += (s > 9 ? s.toString() : "0" + s.toString());
	    return r;
	}
});