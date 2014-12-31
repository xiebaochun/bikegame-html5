<?php
//获取数据 get the config data
if(isset($_GET["type"])){

	if($_GET["type"]=="get"){

	   $xml=simplexml_load_file("../config.xml");

       $config=array("preferTime"=>$xml->preferTime."");
    
	   echo json_encode($config);	
	}

//更新数据 update the config data
	if($_GET["type"]=="update"){

	   $xml=simplexml_load_file("../config.xml");

    	$xml->preferTime=$_GET["data"]["preferTime"];
    	// $xml->playerValue=$_GET["data"]["playerValue"];
    	// $xml->reduceValue=$_GET["data"]["reduceValue"];
    	// $xml->reduceTime=$_GET["data"]["reduceTime"];

	    $xml->asXML("../config.xml");

	   echo json_encode("save success!");	
	}
		
}