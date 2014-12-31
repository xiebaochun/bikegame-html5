	var assets;
	var stage;
	var w, h;
	var groundWidth=1024;
	var tempStage=1;
	var scoreField;			//score Field
	var lifeField;
	var levelField;
	var sky, player, ground, splash, finishRight, finishLeft, end;
	var apples = new Array(10);
	var block1s = new Array(10);
	var block2s = new Array(10);
	var runningRate, isInWarp, isStationary;
	var stationaryPosition, isPassed;
	var KEYCODE_SPACE = 32;		//usefull keycode
	var KEYCODE_UP = 38;		//usefull keycode
	var playerGroundBase = 180;
	var fadein=0;
	var passFlag;
	var jumpIndex = 0;
	var jumpSine = [1,15,36,41,44,46,46,46,46,46,46,46,46,46,46,46,46,46,46,44,41,36,15,1]
	var level = 0;
	var gameStates = ["INIT","TOSPLASH","SPLASH","TOPLAYGAME","PREPLAY","PLAYGAME","TOPK", "PK", "CONTINUE","TOEND","END","FINISH","REST","PAUSE"];
	var gameMap =[["100010001001010010010000101011001010001110010110010110011001010011001100000000000",
	               "001000200010000002000100200000010000200000100010000020000010000100000200009000000"],
				  ["010011001000010010010110100010000110010010010100010110110011000110000110000000000",
				   "101000200010020001000100000200001000200100100000020000020000100000200000009000000"],
				  ["111001001011011010010110101011001011001110010111010111011001010011101100000000000",
				   "200100020010020010002000200200100100100100100010020020020010002000100200009000000"]];
	var gameIndex = 0;
    //每关的时间间隔，单位为分钟
	var eachStageTime=3;
	var currentStage=1;
	var runMiles = 0;
	var life=3;
	var gameState;
	var score = 0;
	var elapsedTime = 0;
	document.onclick = handleKeyUp;

	var pressTimes = 0;
	var pressTimesField;
	var time = 0;
	var rnd = 0;
	var showDiffcult = 0;
	var showDiffcultField;
	var showDiffcultTime = 5;	//出现障碍物的间隔时间（如果画面上只能出现1个障碍物的话，这个时间不能小于4秒）
	
	
	var passSpeed = 0;
    
	var playerSpeed = 0;
	var speed = 50;

	var downSpeed = 0.5;
    var upSpeed = 0.3;

	var NoOfLevel = 10;
	var recordPlayerSpeed = 0;
	var playerSpeedPerLevel = 50;
	var playTime = 180;
	var restTime = 30;
	var tempTime = 0;
	var setPlayTime = 0,setRestTime = 0;
	var playTimeArray = [180,300,600];
	var restTimeArray = [30,45,90];
	var bitmap = [];
	var restBitmap;
	var FPS = 30;
	var back_button;
	var start_button;
    var allowFullscreen=true;//whether allow the play view to fullScreen
	var obstacles;
	var bgs;
	var stage2time={
	    "级别一":2,
	    "级别二":1.8,
	    "级别三":1.6,
	    "级别四":1.4,
	    "级别五":1.2,
    }
    var energy=10;//能量

	function init() {
			if (window.top != window) {
				document.getElementById("header").style.display = "none";
			}

			document.getElementById("loader").className = "loader";

            var canvas = document.getElementById("gameCanves")
			stage = new createjs.Stage(canvas);

            gameState = "INIT"; 
			runningRate = 10;
			isInWarp = false;
			isStationary = false;
			stationaryPosition = 300;
			isPassed = false;
			gameStart = false;
			prepStart = false;


			spriteSheet ={"animations": {"run": [32, 47], "jump": [16, 31], "pk": [0,15], "pkend": [15,15],"standing":[36,36]}, "images": ["assets/player.png"], "frames": {"regX": 0, "height": 510, "count": 64, "regY": 0, "width": 510}};
			var ss = new createjs.SpriteSheet(spriteSheet);
            player = new createjs.BitmapAnimation(ss);
            player.x=-200;
            player.y=playerGroundBase;
            player.scaleX = player.scaleY = 0.8;

            // Set up looping
            ss.getAnimation("run").next = "run";
            ss.getAnimation("jump").next = "run";
            ss.getAnimation("pk").next = "pkend";
            player.gotoAndPlay("run");

            // grab canvas width and height for later calculations:
            w = canvas.width;
            h = canvas.height;
           

			assets = [];

            manifest = [
                {src:"assets/splash.png", id:"splash"},
                {src:"assets/player.png", id:"player"},
                {src:"assets/sky.png", id:"sky"},
                {src:"assets/bg/B01.png", id:"ground01"},
                {src:"assets/bg/B02.png", id:"ground02"},
                {src:"assets/bg/B03.png", id:"ground03"},
                {src:"assets/bg/B04.png", id:"ground04"},
                {src:"assets/bg/B05.png", id:"ground05"},
                {src:"assets/block1.png", id:"block"},
                {src:"assets/block2.png", id:"block2"},
                {src:"assets/finishright.png", id:"finishRight"},
                {src:"assets/finishleft.png", id:"finishLeft"},
                {src:"assets/diamond.png", id:"apple"},
                {src:"assets/end.png", id:"end"},
                {src:"assets/jump.mp3", id:"jumpfx"},
                {src:"assets/applause.mp3", id:"applausefx"},
                {src:"assets/felldown.mp3", id:"felldownfx"},
                {src:"assets/eatapple.mp3", id:"eatapplefx"},
                {src:"assets/splash.mp3", id:"splashmusic"},
                {src:"assets/play.mp3", id:"music"}
            ];

            //use the php to retrieve the images file name
            $.get("php/image.php",function(data){
            	var images = (data);
	            //console.log(images);
	            obstacles = new Obstacles(images);
	            

            },"json").fail(function(){
            	
            	//console.log("get images by php fail!,it will use the cache path to get images");
            	$.get("php/imageTemp.json",function(data){
                   var images = jQuery.parseJSON(data);
	               console.log(images);
	               obstacles = new Obstacles(images);
            	},"json").fail(function(){
            		//console.log("get cache images path failed! use hte config default images path");
            		obstacles = new Obstacles(jQuery.parseJSON(config.imagesPath));
            	});
            });
            
            //use the php to retrieve the bgsprites file name
		  // $.get("php/bgSprites.php",function(data){
		  //   var images=(data);
		  //   console.log(images);
		    
		  //    bgs=new BackGroundSprites(images);
		    

		  // },"json").fail(function(){
		    
		  //   console.log("get images by php fail!,it will use the cache path to get images");
		  //   $.get("php/bgSpritesTemp.json",function(data){
		  //        var images=jQuery.parseJSON(data);
		  //      console.log(images);
		  //      bgs=new BackGroundSprites(images);
		  //   },"json");
		  // });
            bgs = new BgSprites();
  

            loader = new createjs.LoadQueue(false);
            loader.installPlugin(createjs.Sound);
    		loader.onFileLoad = handleFileLoad;
            loader.onComplete = handleComplete;
            loader.loadManifest(manifest);
            stage.autoClear = true;
            /////////////////////////////////////初始化数据config
            $.get("config.xml",function(data){
	            var config = {};
	            config.preferTime = parseFloat($(data).children().children("preferTime").html());
	            //console.log(config.preferTime);
	            initUpdateConfig();
          

            }).fail(function(){
            	var config = {};
            	config.preferTime = 5;
            	initUpdateConfig();
            	console.log("get config fail by php,use the default config");
            });

            
           /////////////////////////////////////后退按钮处理事件
           back_button = document.getElementById("back_button");
		   back_button.oncontextmenu = function(){
		   	  if(gameState != "INIT"&&gameState != "TOSPLASH"&&gameState!="SPLASH"){
	                //console.log("1111111");
		    		 $("html").animate({opacity:"0"},null,function(){
			        //window.location.href="play.html";
			        window.location.reload();//reload from cache
			    });
		    		
		    	}else{
		    		//console.log("222222");
		    	   $("html").animate({opacity:"0"},null,function(){
			        window.location.href = "../index.html";
			      });
		    	   
		    	}
		    	return false;
		    }
		    /////////////////////////////////////按钮处理事件
            $("#start_button").click(function() {
            	handleJumpStart();
            	$("#desc_button").hide();
            	$(this).hide();
            });

            $("#desc_button").click(function() {
            	$("#playView").hide();
            	$("#description").fadeIn();

            });

            $("#back_bt_desc").click(function(){
            	$("#playView").fadeIn();
            	$("#description").hide();
            });

            $("#back_button").click(function(){
            	console.log(gameState);
            	if(gameState == "SPLASH") {
            		$("html").animate({opacity:"0"},null,function(){
			           window.location.href = "../index.html";
			        });
            	}  	
            });
            
		    /////////////////////////////////////全屏处理事件
		    document.addEventListener("fullscreenchange", FShandler);
		    document.addEventListener("webkitfullscreenchange", FShandler);
		    document.addEventListener("mozfullscreenchange", FShandler);
		    document.addEventListener("MSFullscreenChange", FShandler);
		    function FShandler(){
		    	allowFullscreen = ! allowFullscreen;
		    	if(allowFullscreen){
		    		$("#viewWraper").css("zoom",1);
		    	}
		    }

		    $(document).click(function(){
		    	if(allowFullscreen){
		    		var rateHeight = parseFloat(screen.height)/$("#viewWraper").height();
                    var rateWidth = parseFloat(screen.width)/$("#viewWraper").width();
                    $("#viewWraper").css("zoom",rateWidth > rateHeight ? rateHeight : rateWidth);
		    	    
			        $("#viewWraper").fullScreen();
		    	}
			       	
			});
           
        }
        
		function handleFileLoad(event) {
			assets.push(event.item);
		}

		function handleComplete() {
			for(var i=0;i < assets.length;i++) {
				var item = assets[i];
				var id = item.id;
				var result = loader.getResult(id);

				if (item.type == createjs.LoadQueue.IMAGE) {
					var bmp = new createjs.Bitmap(result);
					//console.log("result type:"+result.width);
				}

				switch (id) {
					case "sky":
						sky = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,w+1024, 270));
						break;
					case "ground01":
						ground = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,w+1024, 614));
						
						break;
					// case "ground04":
					// 	//ground = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,w+1024, 614));
					// 	ground.graphics=new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,w+result.width, 614);
					// 	break;	
					case "end":
						end = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,1024, 614));
						break;
					//case "apple":
					//	apples[0] = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,30,34));
					//	for(var x = 1;x < apples.length; x++)
					//		apples[x] = apples[0].clone();
					//	break;
					//case "block":
					//	block1s[0] = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,70,80));
					//	for(var x = 1;x < block1s.length; x++)
					//		block1s[x] = block1s[0].clone();
					//	break;
					//case "block2":
					//	block2s[0] = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,70,80));
					//	for(var x = 1;x < block2s.length; x++)
					//		block2s[x] = block2s[0].clone()
					//	break;
					case "splash":
						splash = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,1024, 614));
						break;
					case "finishRight":
						finishRight = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,380, 450));
						break;
					case "finishLeft":
						finishLeft = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,380, 450));
						break;
				}
				$("#back_button").fadeIn();
				$("#start_button").fadeIn();
				$("#desc_button").fadeIn();
				//back_button.style.display = "block";
			}
			
			document.getElementById("loader").className = "";
			
            $(".selectmenu").show();

			if (player == null) {
				//console.log("Can not play. Grant sprite was not loaded.");
				return;
			}
			
			scoreField = new createjs.Text("Score: 0", "bold 20px Arial", "#0000DD");
			scoreField.textAlign = "left";
			scoreField.x = 30;
			scoreField.y = 22;
			scoreField.maxWidth = 1000;

			lifeField = new createjs.Text("Level: 1 \nLife: 3", "bold 20px Arial", "#0000DD");
			lifeField.textAlign = "left";
			lifeField.x = 30;
			lifeField.y = 50;
			lifeField.maxWidth = 1000;
			
			levelField = new createjs.Text("Level 1", "bold 80px Comic Sans MS", "#175FA3");
			levelField.textAlign = "left";
			levelField.x = 150;
			levelField.y = 450;
			levelField.maxWidth = 1000;

			pressTimesField = new createjs.Text("pressTimes: 0", "bold 20px Arial", "#DD0000");
			pressTimesField.textAlign = "left";
			pressTimesField.x = 30;
			pressTimesField.y = 100;
			pressTimesField.maxWidth = 1000;

			showDiffcultField = new createjs.Text("", "bold 48px Arial", "#DD0000");
			showDiffcultField.textAlign = "left";
			showDiffcultField.x = -100;
			showDiffcultField.y = 100;
			showDiffcultField.maxWidth = 1000;

			

			stage.addChild(splash);
			stage.addChild(sky, ground, scoreField, end, lifeField, pressTimesField, showDiffcultField);

			for (var i = bgs.bitmaps.length - 1; i >= 0; i--) {
				//bgs.bitmaps[i].gotoAndPlay("loop");
				stage.addChild(bgs.bitmaps[i]);
			};
			//stage.addChild(bgs.currentAnimation);
			//for(var x in block1s)stage.addChild(block1s[x]);
			//for(var x in block2s)stage.addChild(block2s[x]);
			stage.addChild(finishLeft, player, finishRight);
			//for(var x in apples)stage.addChild(apples[x]);
			stage.addChild(levelField);
			//stage.addEventListener("stagemousedown", handleJumpStart);
			
            

			var image = new Image();
			image.src = "assets/image1.png";
			bitmap[0] = new createjs.Bitmap(image);
			bitmap[0].x = 600;
			bitmap[0].y = 50;

			image = new Image();
			image.src = "assets/image2.png";
			bitmap[1] = new createjs.Bitmap(image);
			bitmap[1].x = 600;
			bitmap[1].y = 170;

			image = new Image();
			image.src = "assets/image3.png";
			bitmap[2] = new createjs.Bitmap(image);
			bitmap[2].x = 600;
			bitmap[2].y = 290;

   //          image = new Image();
			// image.src = "assets/exit.png";
			// bitmap[3] = new createjs.Bitmap(image);
			
			// bitmap[3].x = 870;
			// bitmap[3].y = 470;

			//stage.addChild(bitmap[0],bitmap[1],bitmap[2]);
            
            

              
			stage.addChild(obstacles.currentBitmap);
            //console.log(obstacles.currentBitmap.isVisible());

            //setInterval(function(){obstacles.changeImage()},1000);
            
			image = new Image();
			image.src = "assets/image_rest.png";
			restBitmap = new createjs.Bitmap(image);
			restBitmap.x = 400;
			restBitmap.y = 170;
			restBitmap.visible = false;
			stage.addChild(restBitmap);

			//bitmap[0].addEventListener("click",clickBitmap);		//谷歌浏览器无法使用“click”事件
			//bitmap[0].onClick = clickBitmap;

            createjs.Ticker.setFPS(FPS);
			createjs.Ticker.addEventListener("tick", tick);
		}


		function clickBitmap()
		{			
			gameState = "TOPLAYGAME";
			fadein=0;
		}

		function initMyData()
		{
			score = 0;
			level = 0;
			life = 3;
			pressTimes = 0;
			time = 0;
			pressTimesArray = [0,0,0,0,0];
			playerPressSpeed = 0;
			passSpeed = 0;
			referencePressTimes = 0;
			keepPressTimes = 0;
			referenceSpeed = 0.5;
			playerSpeed = 0;
			speed = 0;
			recordPlayerSpeed = 0;
			showDiffcultField.x = -100;		//不再显示路障
			player.x = -200;

			bitmap[0].x = 600;
			bitmap[0].y = 50;
			bitmap[1].x = 600;
			bitmap[1].y = 170;
			bitmap[2].x = 600;
			bitmap[2].y = 290;
		}

		function bitmapScale(bitmap,backFlag,value)
		{
            
			var scale = value;

			if(value == null)scale = 1.6;

			var temp = 1;
			if(scale < 1.0)		//让这个方法拥有缩小图片的功能
			{
				temp = -1;
			}
			if(bitmap.visible == true)
			{
				if((stage.mouseX >= bitmap.x)&&(stage.mouseY >= bitmap.y)&&
					(stage.mouseX <= (bitmap.x + bitmap.image.width))&&(stage.mouseY <= (bitmap.y + bitmap.image.height)))
				{
					if(bitmap.scaleX == 1.0)
					{

						bitmap.scaleX = scale;
						bitmap.scaleY = scale;
						bitmap.x = bitmap.x - temp*bitmap.image.width*((scale-1)/2);
						bitmap.y = bitmap.y - temp*bitmap.image.height*((scale-1)/2);

						bitmap.image.width = bitmap.image.width*scale;			//缩放bitmap时，同时缩放图片的大小，不然上面的范围判断会false
						bitmap.image.height = bitmap.image.height*scale;
					}
				}			
				else if(bitmap.scaleX != 1.0)
				{
					bitmap.scaleX = 1.0;
					bitmap.scaleY = 1.0;
					bitmap.image.width = bitmap.image.width/scale;
					bitmap.image.height = bitmap.image.height/scale;

					bitmap.x = bitmap.x + temp*bitmap.image.width*((scale-1)/2);
					bitmap.y = bitmap.y + temp*bitmap.image.height*((scale-1)/2);
				}

				if((backFlag)&&(bitmap.scaleX != 1.0))	//图片已经被点击，恢复图片之前的大小
				{
					bitmap.scaleX = 1.0;
					bitmap.scaleY = 1.0;
					bitmap.image.width = bitmap.image.width/scale;
					bitmap.image.height = bitmap.image.height/scale;

					bitmap.x = bitmap.x + temp*bitmap.image.width*((scale-1)/2);
					bitmap.y = bitmap.y + temp*bitmap.image.height*((scale-1)/2);
				}
			}	
		}
		function bitmapClick(bitmap)
		{
			if(bitmap.visible == true)
			{
				if((stage.mouseX >= bitmap.x)&&(stage.mouseY >= bitmap.y)&&
					(stage.mouseX <= (bitmap.x + bitmap.image.width))&&(stage.mouseY <= (bitmap.y + bitmap.image.height)))
				{
					return true;
				}
			}
			return false;
		}


		//键盘事件
		function handleKeyUp(e) {
			
			if(!e){ var e = window.event; }
			
					if(gameState == "PLAYGAME"){
						pressTimes++;
						//if(player.currentAnimation == "run"){
						//	player.gotoAndPlay("jump");
						//	createjs.Sound.play("jumpfx", createjs.Sound.INTERUPT_LATE);
						//}

					}

					if(gameState == "PK"||gameState == "PAUSE"){
                        
                        gameState = "CONTINUE";
					}
					
					
			
		}

		//鼠标事件
		function handleJumpStart() {
			
			if((gameState == "SPLASH")||(gameState == "REST")||(gameState == "PLAYGAME"))
			{
				

						playTime = playTimeArray[1];
						restTime = restTimeArray[1];
						setPlayTime = playTime;
						setRestTime = restTime;
						gameState = "TOPLAYGAME";
						fadein=0;
						
						initMyData();

						
				
			}
			
			if(gameState == "PLAYGAME"){
				pressTimes++;
				//if(player.currentAnimation == "run"){
				//	player.gotoAndPlay("jump");
				//	createjs.Sound.play("jumpfx", createjs.Sound.INTERUPT_LATE);
				//}
			}
		}
        //游戏主循环 game main looping
		function tick() {
			obstacles.update(showDiffcultField.x,showDiffcultField.y,showDiffcultField.visible);
			// console.log("visible:"+showDiffcultField.visible+showDiffcultField.x+"::"+showDiffcultField.y);
			// console.log("setPlayTime:"+setPlayTime);
			// console.log("recordPlayerSpeed:"+recordPlayerSpeed);
			switch(gameState){

				case "INIT":
					fadein = 0;
					splash.alpha = 0;
					sky.x = sky.y = 0;
					sky.alpha = 0;
					ground.x = ground.y = 0;
					ground.alpha = 0;
					finishRight.visible = false;
					finishLeft.visible = false;
					end.alpha = 0;
					end.visible = false;
					//for(var i in apples)apples[i].visible = false;
					//for(var i in block1s)block1s[i].visible = false;
					//for(var i in block2s)block2s[i].visible = false;
					scoreField.visible = false;
					lifeField.visible = false;
					pressTimesField.visible = false;
					showDiffcultField.visible = false;

					levelField.alpha = 0;
					levelField.visible = true;
					gameState="TOSPLASH";
					break;


				case "TOSPLASH":
					if(fadein < 1){
						fadein += 0.05;
						splash.alpha = fadein;
						levelField.alpha = fadein;
					}else{
						gameState = "SPLASH";
						createjs.Sound.stop("music");
						createjs.Sound.play("splashmusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);
					
					}
					break;


				case "SPLASH":
					levelField.text = "Level " + (level + 1).toString();

						for(var i = 0;i < bitmap.length;i++)
						{
							bitmapScale(bitmap[i],false,1.1);
						}
					break;

				case "TOPLAYGAME":
					
					if(fadein < 1){
						fadein += 0.05;
						ground.alpha = fadein;
						sky.alpha = fadein;
						splash.alpha = 1-fadein;
						levelField.alpha = 1-fadein;
					}else{
						player.x = -200;
						player.alpha = 1;
						scoreField.visible = false;////////////////////
						lifeField.visible = false;////////////////////
						levelField.visible = false;
						pressTimesField.visible = false;//////////////////
						showDiffcultField.visible = false;
						splash.visible = false;
						player.gotoAndPlay("run");
						gameState = "PREPLAY";
						createjs.Sound.stop("splashmusic");
						createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);

					}
					break;


				case "PREPLAY":
					lifeField.text = "Level: " + (level+1).toString() + "        playTime: " + setPlayTime
					+ "\nLife: " + life.toString() + "           restTime: " + setRestTime;

					pressTimesField.text = "Press Times: " + pressTimes.toString()
					+ "\nTime: " + (time/FPS).toFixed(1)
					+ "\n" + pressTimesArray[0]
					+ "\n" + pressTimesArray[1]
					+ "\n" + pressTimesArray[2]
					+ "\n" + pressTimesArray[3]
					+ "\n" + pressTimesArray[4]
					+ "\nplayerPressSpeed: " + playerPressSpeed
					+ "\npassSpeed:  " + passSpeed
					+ "\nplayerSpeedLevel: " + playerSpeed
					+ "\nplayerSpeed:  " + speed
					+ "\nreferenceSpeed:  " + referenceSpeed
					+ "\nrecordPlayerSpeed:  " + recordPlayerSpeed;

					player.x += runningRate;
					if(player.x > 200){
						player.gotoAndPlay("run");
						gameState="PLAYGAME";	
						speed=50;					
					}
                    
                    //显示能量条 show the energy bar
                    $("#progressbar").show();

                    //隐藏等级选项 hide the stage setting
                    $(".selectmenu").hide();

					break;


				case "PLAYGAME":
					lifeField.text = "Level: " + (level+1).toString() + "        playTime: " + setPlayTime
					+ "\nLife: " + life.toString() + "           restTime: " + setRestTime;
					
					

					time++;
					pressTimesField.text = "Press Times: " + pressTimes.toString() 
					+ "\nTime: " + (time/FPS).toFixed(1)
					+ "\n" + pressTimesArray[0]
					+ "\n" + pressTimesArray[1]
					+ "\n" + pressTimesArray[2]
					+ "\n" + pressTimesArray[3]
					+ "\n" + pressTimesArray[4]
					+ "\nplayerPressSpeed: " + playerPressSpeed
					+ "\npassSpeed:  " + passSpeed
					+ "\nplayerSpeedLevel: " + playerSpeed
					+ "\nplayerSpeed:  " + speed
					+ "\nreferenceSpeed:  " + referenceSpeed
					+ "\nrecordPlayerSpeed:  " + recordPlayerSpeed;

                    
					if(showDiffcultField.visible)
					{
						showDiffcultField.text = "";// "*" + rnd + "*";
						showDiffcultField.x -= runningRate;
						if(showDiffcultField.x < -500){
							showDiffcultField.visible = false;
							//切换路障图片
						    obstacles.level = rnd;
						    obstacles.changeImage();
						}

						if((showDiffcultField.x < player.x + 105) &&
						   (showDiffcultField.x + 60 > player.x + 105) && 
						   (showDiffcultField.y < player.y + 265))
						//if(player.x == showDiffcultField.x)
						{
							
							// if(playerSpeed < rnd)	//比较玩家速度和路障难度
							// {
							// 	//createjs.Sound.play("felldownfx", createjs.Sound.INTERUPT_LATE);
							// 	//gameState="TOPK";
							// }
							// else 
							// {
								//obstacles.setVisible(false);
								

								player.gotoAndPlay("jump");
								createjs.Sound.play("jumpfx", createjs.Sound.INTERUPT_LATE);
								
								//showDiffcultField.visible = false;
								score += 1;
								//scoreField.text = "Score: " + score.toString();
                                

							// }							
						}
					}

					

					if((((time/FPS).toFixed(0))%showDiffcultTime) == 0)		//产生新的路障（每5秒钟）
					{
						if(showDiffcultField.visible == false)
						{
							rnd = Math.floor(Math.random() * passSpeed) + 1;
							if(rnd>5) rnd=5;//如果超过5，则等于5
							showDiffcultField.x = 1100;
							showDiffcultField.y = 430;
							showDiffcultField.visible = true;
						}
					}

     //                if(passFlag == 1)			
					// {
     //                    if(runningRate<50)runningRate+=0.1;//如果通过则增加跑的速度。

					// }else if(passFlag == 2){

     //                    if(runningRate>3)runningRate-=0.1;//
     //               }

					if((time%(FPS/10)==0))		//0.1秒钟检查一次
					{

						if(setPlayTime > 0)
						{
							//setPlayTime--;//无限时间
						}
						else 
						{
							gameState="REST";
							//player.visible = false;
							showDiffcultField.visible = false;

							restBitmap.visible = true;
							for(var i = 0; i < bitmap.length; i++)
							{
								bitmap[i].visible = true;
								bitmap[i].x = 280 + i*200;
								bitmap[i].y = 280;
							}
						}

						passFlag = updateSpeedF(pressTimes);

						pressTimes = 0;
						if(passFlag == 0)			//没有获得参考速度，返回主页面
						{
							// gameState = "INIT"; 

							// for(var i = 0;i < bitmap.length;i++)
							// {
							// 	bitmap[i].visible = true;
							// }
				   //          fadein = 0;
				   //          splash.visible = true;
				   //          player.x = -200;

						}
						else if(passFlag == 1)		//pass
						{			
		                    speed += upSpeed;
		                    energy+=parseFloat(upSpeed)/5;
							if(speed >= 500)
							{
								speed = 500;
							}
							if(energy >= 100)
							{
								energy = 100;
							}	
							
						}
						else //if(passFlag == 2)	//fail
						{	
							speed = 0;
							

						}

						if(speed > recordPlayerSpeed) recordPlayerSpeed = speed;

						playerSpeed = parseInt(((speed + playerSpeedPerLevel - 1)/(playerSpeedPerLevel*10))*NoOfLevel);
						//根据玩家历史最高速度，来计算出当前难度。
						passSpeed = parseInt(((recordPlayerSpeed + playerSpeedPerLevel - 1)/(playerSpeedPerLevel*10))*NoOfLevel);
						
						runningRate = playerSpeed + 10;

						showDiffcultTime = parseInt(50/runningRate);

						$( "#progressbar" ).progressbar({
                          value: energy
                        });	


                        scoreField.text = "playSpeed: " + speed.toString();		
                        if(speed <= 0){
                        	switch(parseInt((speed - 1)/100) + 1){
		                    	case 1:
		                    	    if(player.x > 200){
		                    	    	player.x -= 1;
		                    	    }else{
		                    	    	gameState = "PAUSE";
		                    	    }
		                    	    	
		                    	break;

		                    	case 2:
		                    	   if(player.x > 250){
		                    	    	player.x -= 1;
		                    	    }else{
		                    	    	gameState = "PAUSE";
		                    	    }
		                        break;

		                        case 3:
		                           if(player.x > 300){
		                    	    	player.x -= 1;
		                    	    }else{
		                    	    	gameState = "PAUSE";
		                    	    }            	   
		                        break;

		                        case 4:
		                           if(player.x > 350){
		                    	    	player.x -= 1;
		                    	    }else{
		                    	    	gameState = "PAUSE";
		                    	    }           	   
		                        break;

		                        case 5:
		                           if(player.x > 400){
		                    	    	player.x -= 1;
		                    	    }else{
		                    	    	gameState = "PAUSE";
		                    	    }            	   
		                        break;
		                    }
                        	
                        }


                        //切换背景  switch the background image
                        //currentStage=parseInt((speed-1)/100)+1;
                        //console.log("passed time:" + time + ":" + time % (eachStageTime * 60 * 30));
                        if(time % (eachStageTime * 60 * 30) == 0){
                        	if(currentStage < 5){
                        		currentStage++;
                        	}
                        }
                        //console.log((speed-1)/100);
                        if(tempStage != currentStage && tempStage <= currentStage){
                        	tempStage = currentStage;
                        	var groundStr = "ground0" + currentStage;
                        	//console.log(groundStr);
                        	var result = loader.getResult(groundStr);
                        	ground.graphics = new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,w+result.width, 614);
                            groundWidth = result.width;

                        }

					}
                    //背景移动 moving the background
					var runningRate_sky = runningRate/5;
					if(runningRate_sky < 2) runningRate_sky = 2;
					sky.x = (sky.x - runningRate_sky) % 1024
					ground.x = (ground.x - runningRate) % groundWidth;
					
					//更新背景点缀精灵 update the background sprites(animation)
                    //bgs.update(runningRate,parseInt((speed-1)/100)+1);
                    //fix date:2014/11/12 等级改为每3分钟加一个等级，auto improve stage by one each 3 minutes
                    bgs.update(runningRate,currentStage);
                    switch(parseInt((speed-1)/100)+1){
                    	case 1:
                    	break;

                    	case 2:
                    	   if(player.x<250)player.x+=1;
                        break;

                        case 3:
                           if(player.x<300)player.x+=1;              	   
                        break;

                        case 4:
                           if(player.x<350)player.x+=1;              	   
                        break;

                        case 5:
                           if(player.x<400)player.x+=1;              	   
                        break;
                    }

					runMiles += runningRate;
					if(runMiles > 200)
					{
						gameIndex += 1;
						if(gameIndex > gameMap[level][0].length)
						{
							gameIndex = 0;		//无限循环地图
						}
						runMiles = 0;
					}
					
					if(player.currentAnimation == "jump")
					{
						var jumpHeight=jumpSine[jumpIndex];
						jumpIndex++;
						if(jumpIndex > 24){
							jumpIndex=0;
							player.y = playerGroundBase;
						}else{
							player.y = playerGroundBase - jumpHeight;
						}
					}
					else
					{
						player.y = playerGroundBase;
						jumpIndex=0;
					}
					
					break;


				case "TOPK":
					//player.x+=8;
					//if(player.x > 400){
						elapsedTime = 0;
						gameState="PK";
						player.gotoAndPlay("pk");
					//	player.gotoAndPlay("pkend");
					//}
					break;


				case "PK":////////////////////////////摔倒后
					elapsedTime+=1;
					if((elapsedTime%10)<5)
					{
						player.visible=false;
					}
					else 
					{
						player.visible=true;
					}
					if(elapsedTime > 30){
						//gameState="CONTINUE";
						player.visible=true;
						//player.x -= runningRate;
						showDiffcultField.visible = false;

						player.gotoAndPlay("standing");
		            	//gameState="PREPLAY";
					}
					break;

                case "PAUSE":

                    player.y = playerGroundBase;
                     
                    player.gotoAndPlay("standing");
                    
                    energy-=parseFloat(downSpeed)/5;
					if(energy<=0){
						energy=0;
					}               	            

					$( "#progressbar" ).progressbar({
                          value: energy
                        });	

					break;

				case "CONTINUE":
                    //切换路障图片
					// obstacles.level=rnd;
					// obstacles.setVisible(false);
			        //obstacles.changeImage();
                    player.visible=true;
                    // showDiffcultField.visible = false;
					player.gotoAndPlay("run");
					//player.x = -200;
					player.y = playerGroundBase;
		            if(life==0){
						gameState="TOEND";			
		            }else{
		            	//for(var i in apples)apples[i].visible = false;
						//for(var i in block1s)block1s[i].visible = false;
						//for(var i in block2s)block2s[i].visible = false;
						//showDiffcultField.visible = false;
		            	gameState="PREPLAY";
					}
					break;


				case "TOEND":
					end.visible=true;
					finishRight.visible=false;
					finishLeft.visible=false;
					scoreField.visible=false;
					lifeField.visible=false;
					pressTimesField.visible=false;
					//for(var i in apples)apples[i].visible = false;
					//for(var i in block1s)block1s[i].visible = false;
					//for(var i in block2s)block2s[i].visible = false;
					showDiffcultField.visible = false;
					fadein=0;
					gameState="END";
					break;


				case "END":
					if(fadein < 1){
						ground.alpha=1-fadein;
						sky.alpha=1-fadein;
						player.alpha=1-fadein;
						end.alpha=fadein;
						fadein += 0.05;
					}else
						gameState="FINISH";
					break;


				case "FINISH":
						player.visible=false;
					break;

				case "REST":
						lifeField.text = "Level: " + (level+1).toString() + "        playTime: " + setPlayTime
						+ "\nLife: " + life.toString() + "           restTime: " + setRestTime;

						for(var i = 0;i< bitmap.length;i++)
						{
							bitmapScale(bitmap[i]);
						}
						
						tempTime++;
						if((tempTime%FPS)==0)
						{
							if(setRestTime > 0)
							{
								setRestTime--;
							}
							else 
							{
								setRestTime = restTime;
								setPlayTime = playTime;
								//player.visible = true;
								gameState="PREPLAY";

								restBitmap.visible = false;
								for(var i = 0;i < bitmap.length;i++)
								{
									bitmapScale(bitmap[i],true);			//恢复之前变大的图片
									bitmap[i].visible = false;
								}
							}
						}
					break;
				default: break;
			}
			
			stage.update();
		}
