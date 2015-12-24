<?php

	$name = $_POST['projectName'];
	$data = array();

	if ($name === '') {
		$data['status'] = 'error';
		$data['text'] = 'Заполните имя!';
	}else{
		$data['status'] = 'OK';
		$data['text'] = 'Вы молодец, не забыли заполнить имя';
	}



	header("Content-Type: application/json");
	echo json_encode($data);
	exit;

?>