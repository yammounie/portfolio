$(document).ready(function($){

	var $inputFile = $('#fileupload');

	$inputFile.on('change', function(){
		var filepath = $inputFile.val(),
			$input = $('.input-add-picc');

		filepath = filepath.replace(/c:\\fakepath\\/gmi, "");
		$input.val(filepath);
	});
});

