	var assets;
	var stage;
	var w, h;
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
	var jumpIndex = 0;
	var jumpSine = [1,15,36,41,44,46,46,46,46,46,46,46,46,46,46,46,46,46,46,44,41,36,15,1]
	var level = 0;
	var gameStates = ["INIT","TOSPLASH","SPLASH","TOPLAYGAME","PREPLAY","PLAYGAME","TOPK", "PK", "CONTINUE","TOEND","END","FINISH"];
	var gameMap =[["100010001001010010010000101011001010001110010110010110011001010011001100000000000",
	               "001000200010000002000100200000010000200000100010000020000010000100000200009000000"],
				  ["010011001000010010010110100010000110010010010100010110110011000110000110000000000",
				   "101000200010020001000100000200001000200100100000020000020000100000200000009000000"],
				  ["111001001011011010010110101011001011001110010111010111011001010011101100000000000",
				   "200100020010020010002000200200100100100100100010020020020010002000100200009000000"]];
	var gameIndex = 0;
	var runMiles = 0;
	var life=3;
	var gameState;
	var score = 0;
	var elapsedTime = 0;
	document.onkeyup = handleKeyUp;


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
			
		    spriteSheet ={"animations": {"run": [32, 47], "jump": [16, 31], "pk": [0,15], "pkend": [15,15]}, "images": ["assets/player.png"], "frames": {"regX": 0, "height": 510, "count": 64, "regY": 0, "width": 510}};

            var ss = new createjs.SpriteSheet(spriteSheet);
            player = new createjs.BitmapAnimation(ss);

            // Set up looping
            ss.getAnimation("run").next = "run";
            ss.getAnimation("jump").next = "run";
            ss.getAnimation("pk").next = "pkend";
            player.gotoAndPlay("run");

            // Position the Grant sprite
            player.x = -200;
            player.y = playerGroundBase;
            player.scaleX = player.scaleY = 0.8;

            // grab canvas width and height for later calculations:
            w = canvas.width;
            h = canvas.height;

			assets = [];

            manifest = [
                {src:"assets/splash.png", id:"splash"},
                {src:"assets/player.png", id:"player"},
                {src:"assets/sky.png", id:"sky"},
                {src:"assets/background1.png", id:"ground"},
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

            loader = new createjs.LoadQueue(false);
            loader.installPlugin(createjs.Sound);
    		loader.onFileLoad = handleFileLoad;
            loader.onComplete = handleComplete;
            loader.loadManifest(manifest);
            stage.autoClear = false;
        }

		function handleFileLoad(event) {
			assets.push(event.item);
		}

		function handleComplete() {
			for(var i=0;i<assets.length;i++) {
				var item = assets[i];
				var id = item.id;
				var result = loader.getResult(id);

				if (item.type == createjs.LoadQueue.IMAGE) {
					var bmp = new createjs.Bitmap(result);
				}

				switch (id) {
					case "sky":
						sky = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,w+1024, 270));
						break;
					case "ground":
						ground = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,w+1024, 614));
						break;
					case "end":
						end = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,1024, 614));
						break;
					case "apple":
						apples[0] = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,30,34));
						for(var x = 1;x < apples.length; x++)
							apples[x] = apples[0].clone();
						break;
					case "block":
						block1s[0] = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,70,80));
						for(var x = 1;x < block1s.length; x++)
							block1s[x] = block1s[0].clone();
						break;
					case "block2":
						block2s[0] = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,70,80));
						for(var x = 1;x < block2s.length; x++)
							block2s[x] = block2s[0].clone()
						break;
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
			}

			document.getElementById("loader").className = "";

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

			stage.addChild(sky, ground, scoreField, end, lifeField);
			for(var x in block1s)stage.addChild(block1s[x]);
			for(var x in block2s)stage.addChild(block2s[x]);
			stage.addChild(finishLeft, player, finishRight);
			for(var x in apples)stage.addChild(apples[x]);
			stage.addChild(splash,levelField);
			stage.addEventListener("stagemousedown", handleJumpStart);

            createjs.Ticker.setFPS(25);
			createjs.Ticker.addEventListener("tick", tick);
		}

		function handleKeyUp(e) {
			
			if(!e){ var e = window.event; }
			switch(e.keyCode) {
				case KEYCODE_UP:
				case KEYCODE_SPACE:	
					if(gameState == "SPLASH"){
						gameState = "TOPLAYGAME";
						fadein=0;
					}
					if(gameState == "PLAYGAME"){
						if(player.currentAnimation == "run"){
							player.gotoAndPlay("jump");
							createjs.Sound.play("jumpfx", createjs.Sound.INTERUPT_LATE);
						}
					}
					break;
			}
		}
		
		function handleJumpStart() {
			
			if(gameState == "SPLASH"){
				gameState = "TOPLAYGAME";
				fadein=0;
			}
			
			if(gameState == "PLAYGAME"){
				if(player.currentAnimation == "run"){
					player.gotoAndPlay("jump");
					createjs.Sound.play("jumpfx", createjs.Sound.INTERUPT_LATE);
				}
			}
		}

		function tick() {
			
			switch(gameState){
			
				case "INIT":
					fadein = 0;
					splash.alpha=0;
					sky.x = sky.y = 0;
					sky.alpha=0;
					ground.x = ground.y = 0;
					ground.alpha=0;
					finishRight.visible=false;
					finishLeft.visible=false;
					end.alpha=0;
					end.visible=false;
					for(var i in apples)apples[i].visible = false;
					for(var i in block1s)block1s[i].visible = false;
					for(var i in block2s)block2s[i].visible = false;
					scoreField.visible = false;
					lifeField.visible = false;
					levelField.alpha=0;
					levelField.visible = true;
					gameState="TOSPLASH";
					break;
					
				
				case "TOSPLASH":
					if(fadein < 1){
						fadein += 0.05;
						splash.alpha=fadein;
						levelField.alpha = fadein;
					}else{
						gameState = "SPLASH";
						createjs.Sound.stop("music");
						createjs.Sound.play("splashmusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);
					}
					break;
				
				case "SPLASH":
					levelField.text = "Level " + (level + 1).toString();
					break;
					
				case "TOPLAYGAME":
					
					if(fadein < 1){
						fadein += 0.05;
						ground.alpha=fadein;
						sky.alpha=fadein;
						splash.alpha=1-fadein;
						levelField.alpha = 1-fadein;
					}else{
						player.x = -200;
						player.alpha=1;
						scoreField.visible = true;
						lifeField.visible = true;
						levelField.visible = false;
						splash.visible = false;
						player.gotoAndPlay("run");
						gameState = "PREPLAY";
						createjs.Sound.stop("splashmusic");
						createjs.Sound.play("music", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.4);
					}
					break;
					
				case "PREPLAY":
					lifeField.text = "Level: " + (level+1).toString() + "\nLife: " + life.toString();
					player.x += runningRate;
					if(player.x > 200){
						player.gotoAndPlay("run");
						gameState="PLAYGAME";						
					}
					break;
					
				case "PLAYGAME":
					lifeField.text = "Level: " + (level+1).toString() + "\nLife: " + life.toString();
					
					ground.x = (ground.x - runningRate) % 1024;
					sky.x = (sky.x - 2) % 1024
					
					for(var i in apples){
						if(apples[i].visible){
							if((apples[i].x < player.x + 120) &&
							   (apples[i].x > player.x) &&
							   (apples[i].y > player.y + 90) &&
							   (apples[i].y < player.y + 292))
							{
								apples[i].visible = false;
								score += 10;
								createjs.Sound.play("eatapplefx", createjs.Sound.INTERUPT_LATE);
								scoreField.text = "Score: " + score.toString();
							}
							apples[i].x -= runningRate;
							if(apples[i].x < -50)apples[i].visible = false;
						}
					}
					for(var i in block1s){
						if(block1s[i].visible){
							if((block1s[i].x < player.x + 105) &&
							   (block1s[i].x + 60 > player.x + 105) && 
							   (block1s[i].y < player.y + 265))
							{
								life-=1;
								player.gotoAndPlay("pk");
								createjs.Sound.play("felldownfx", createjs.Sound.INTERUPT_LATE);
								gameIndex-=5;
								gameState="TOPK";
								
							}
							block1s[i].x -=runningRate;
							if(block1s[i].x < -50)block1s[i].visible = false;
						}
					}
					for(var i in block2s){
						if(block2s[i].visible){
							if((block2s[i].x < player.x + 105) &&
							   (block2s[i].x + 60 > player.x + 105) && 
							   (block2s[i].y < player.y + 265))
								{
									life-=1;
									player.gotoAndPlay("pk");
									createjs.Sound.play("felldownfx", createjs.Sound.INTERUPT_LATE);
									gameIndex-=5;
									gameState="TOPK";
									
								}
							block2s[i].x -=runningRate;
							if(block2s[i].x < -50)block2s[i].visible = false;
						}
					}
					if(finishRight.visible){
						finishRight.x-=runningRate;
					}
					if(finishLeft.visible){
						finishLeft.x-=runningRate;
					}
					runMiles += runningRate;
					if(runMiles > 200){
						gameIndex += 1;
						if(gameIndex > gameMap[level][0].length){
							if(level==2){
								gameState="TOEND";
							}else{
								splash.visible=true;
								runMiles = 0;
								gameIndex = 0;
								level += 1;
								player.x = -200;
								gameState="INIT";
							}
							break;
						}
						runMiles = 0;
						if(gameMap[level][0].charAt(gameIndex) == "1"){
							for(var i in apples){
								if(apples[i].visible == false){
									apples[i].x = 1100;
									apples[i].y = 250;
									apples[i].visible = true;
									break;
								}
							}
						}
						if(gameMap[level][1].charAt(gameIndex) == "1"){
							for(var i in block1s){
								if(block1s[i].visible == false){
									block1s[i].x = 1100;
									block1s[i].y = 430;
									block1s[i].visible = true;
									break;
								}
							}
						}
						if(gameMap[level][1].charAt(gameIndex) == "2"){
							for(var i in block2s){
								if(block2s[i].visible == false){
									block2s[i].x = 1100;
									block2s[i].y = 430;
									block2s[i].visible = true;
									break;
								}
							}
						}
						if(gameMap[level][1].charAt(gameIndex) == "9"){
							finishRight.x=1100;
							finishRight.y=130;
							finishRight.visible=true;
							finishLeft.x=1100;
							finishLeft.y=130;
							finishLeft.visible=true;
							createjs.Sound.play("applausefx", createjs.Sound.INTERUPT_LATE);
						}
					}
					
					if(player.currentAnimation == "jump"){
						var jumpHeight=jumpSine[jumpIndex];
						jumpIndex++;
						if(jumpIndex > 24){
							jumpIndex=0;
							player.y = playerGroundBase;
						}else{
							player.y = playerGroundBase - jumpHeight;
						}
					}else{
						player.y = playerGroundBase;
						jumpIndex=0;
					}
					
					break;
					
				case "TOPK":
					player.x+=8;
					if(player.x > 400){
						elapsedTime = 0;
						gameState="PK";
						player.gotoAndPlay("pkend");
					}
					break;
					
				case "PK":
					elapsedTime+=1;
					if(elapsedTime > 30){
						gameState="CONTINUE";
					}
					break;
				
				case "CONTINUE":
					player.gotoAndPlay("run");
					player.x = -200;
					player.y = playerGroundBase;
		            if(life==0){
						gameState="TOEND";			
		            }else{
		            	for(var i in apples)apples[i].visible = false;
						for(var i in block1s)block1s[i].visible = false;
						for(var i in block2s)block2s[i].visible = false;
		            	gameState="PREPLAY";
					}
					break;
					
				case "TOEND":
					end.visible=true;
					finishRight.visible=false;
					finishLeft.visible=false;
					scoreField.visible=false;
					lifeField.visible=false;
					for(var i in apples)apples[i].visible = false;
					for(var i in block1s)block1s[i].visible = false;
					for(var i in block2s)block2s[i].visible = false;
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
				default: break;
			}
			
			stage.update();
		}