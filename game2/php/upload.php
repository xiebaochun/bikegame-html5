<?php

$output_dir = "uploads/";
if(isset($_FILES["imgfile"]))
{
	if ((($_FILES["imgfile"]["type"] == "image/gif")
	|| ($_FILES["imgfile"]["type"] == "image/jpeg")
	|| ($_FILES["imgfile"]["type"] == "image/pjpeg")||($_FILES["imgfile"]["type"] == "image/png"))
	&& ($_FILES["imgfile"]["size"] < 500000))
	{
		$ret = array();
		$output_dir = "../images/BG/";
	//	This is for custom errors;	
	/*	$custom_error= array();
		$custom_error['jquery-upload-file-error']="File already exists";
		echo json_encode($custom_error);
		die();
	*/
		$error =$_FILES["imgfile"]["error"];
		//You need to handle  both cases
		//If Any browser does not support serializing of multiple files using FormData() 
		if(!is_array($_FILES["imgfile"]["name"])) //single file
		{
	 	 	$fileName = iconv("UTF-8","GBK",$_FILES["imgfile"]["name"]);
	 		move_uploaded_file($_FILES["imgfile"]["tmp_name"],$output_dir.$fileName);
	    	$ret[]= $fileName;
		}
		else  //Multiple files, file[]
		{
		  $fileCount = count($_FILES["imgfile"]["name"]);
		  for($i=0; $i < $fileCount; $i++)
		  {
		  	$fileName = $_FILES["imgfile"]["name"][$i];
			move_uploaded_file($_FILES["imgfile"]["tmp_name"][$i],$output_dir.$fileName);
		  	$ret[]= $fileName;
		  }
		
		}
	    echo json_encode($ret);
	}
	
 }

 if(isset($_FILES["audiofile"]))
{
	$valid_extension = array('.mp3', '.wav');
	$fileName = iconv("UTF-8","GBK",$_FILES["audiofile"]["name"]);
    $file_extension = strtolower( strrchr( $fileName, "." ) );

    if(in_array( $file_extension, $valid_extension))
    {
    	$ret = array();
		$output_dir = "../Music/";
	//	This is for custom errors;	
	/*	$custom_error= array();
		$custom_error['jquery-upload-file-error']="File already exists";
		echo json_encode($custom_error);
		die();
	*/
		$error =$_FILES["audiofile"]["error"];
		//You need to handle  both cases
		//If Any browser does not support serializing of multiple files using FormData() 
		if(!is_array($_FILES["audiofile"]["name"])) //single file
		{
	 	 	$fileName = iconv("UTF-8","GBK",$_FILES["audiofile"]["name"]);
	 		move_uploaded_file($_FILES["audiofile"]["tmp_name"],$output_dir.$fileName);
	    	$ret[]= $fileName;
		}
		else  //Multiple files, file[]
		{
		  $fileCount = count($_FILES["audiofile"]["name"]);
		  for($i=0; $i < $fileCount; $i++)
		  {
		  	$fileName = $_FILES["audiofile"]["name"][$i];
			move_uploaded_file($_FILES["audiofile"]["tmp_name"][$i],$output_dir.$fileName);
		  	$ret[]= $fileName;
		  }
		
		}
	    echo json_encode("upload success!");
    }else{
    	echo json_encode("format error!");
    }
		
		
 }

 ?>