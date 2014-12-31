
//游戏参数配置

var config={

    isPhp:true,//是否启用php自动识别音频和图片文件，true表示启动，false表示关闭

    defaultAudioFile:["Tik Tok.mp3","one.mp3","two.mp3"],//默认音频文件集

    defaultBgFile:["1.jpg","2.jpg","3.jpg","4.jpg"],//默认背景图片集

    preferTime:1.6,//按键时间相距值（单位为1/10秒，范围为：1-300，默认50）玩家在此期间按键表示加能量，否则减能量

    playerValue:10,//玩家开始时的能量预设，范围0-100，默认10

    reduceValue:1,//范围（1-100）默认1

    reduceTime:1,//定时减能量间距（单位为‘秒’，范围1-100）默认1
};

// console.log("config:"+config);