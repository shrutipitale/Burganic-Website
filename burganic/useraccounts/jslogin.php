<?php
session_start();
require_once('config.php');


$firstname = $_POST['firstname'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE firstname = ? AND password = ? LIMIT 1";
$stmtselect  = $db->prepare($sql);
$result = $stmtselect->execute([$firstname, $password]);

if($result){
	$user = $stmtselect->fetch(PDO::FETCH_ASSOC);
	if($stmtselect->rowCount() > 0){
		$_SESSION['userlogin'] = $user;
		echo 'SUCESSFULLY LOGGED IN';
	}else{
		echo 'NO USER FOUND';		
	}
}else{
	echo 'There were errors while connecting to database.';
}