<?php

	$name = $_POST['projectNmae'];
	$data = array();

	if ($name === '') {
		$data['status'] = 'error';
		$data['text'] = 'Заоплните имя!';
	}else{
		$data['status'] = 'OK';
		$data['text'] = 'Вы молодец, не забыли заполнить имя';
	}



	header("Content-Type: application/json");
	echo json_encode($data);
	exit;

?>