<?php
//获取数据 get the config data
if(isset($_GET["type"])){

	if($_GET["type"]=="get"){

	   $xml=simplexml_load_file("../config.xml");

       $config=array("preferTime"=>$xml->preferTime."",
       	                 "playerValue"=>$xml->playerValue."",
       	                 "reduceValue"=>$xml->reduceValue."",
       	                 "reduceTime"=>$xml->reduceTime."");
    
	   echo json_encode($config);	
	}

//更新数据 update the config data
	if($_GET["type"]=="update"){

	   $xml=simplexml_load_file("../config.xml");
        if($_GET["data"]["preferTime"]){
           $xml->preferTime=$_GET["data"]["preferTime"];	
        }
    	if($_GET["data"]["playerValue"]){
    	   $xml->playerValue=$_GET["data"]["playerValue"];	
    	}
    	if($_GET["data"]["reduceValue"]){
    	   $xml->reduceValue=$_GET["data"]["reduceValue"];	
    	}
    	if($_GET["data"]["reduceTime"]){
    	   $xml->reduceTime=$_GET["data"]["reduceTime"];	
    	}
    	

	    $xml->asXML("../config.xml");

	   echo json_encode("save success!");	
	}
		
}



// // CREATE
// $config = new SimpleXmlElement('<settings/>');
// $config->setting1 = 'setting1 value';         
// $config->saveXML('config.xml');               

// // READ
// $config = new SimpleXmlElement('config.xml');
// echo $config->setting1;
// echo $config->asXml();


// // UPDATE
// $config->setting1 = 'new value';
// $config->setting2 = 'setting2 value';
// echo $config->asXml();

// // DELETE
// unset($config->setting1);
// $config->setting2 = NULL;
// echo $config->asXML();
// unlink('config.xml');

?>