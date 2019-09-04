<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Content-Type: application/json");
	
	$string = file_get_contents("data.json");
	
	echo $string;
	
	