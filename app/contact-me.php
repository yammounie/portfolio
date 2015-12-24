<?php

	$name = $_POST['projectName'];
	$data = array();

	if ($name === '') {
		$data['status'] = 'error';
		$data['text'] = 'Заполните пустые поля!';
	}else{
		$data['status'] = 'OK';
		$data['text'] = 'Проект успешно добавлен!';
	}



	header("Content-Type: application/json");
	echo json_encode($data);
	exit;

?>