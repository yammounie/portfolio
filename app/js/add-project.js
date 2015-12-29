if(typeof console === 'undefined' || typeof console.log === 'undefined') {
                var console = {};
                console.log = function(){
                };
        }


var myModule = (function () {

	// Инициализирует наш модуль
	var init = function () {
		_setUpListeners();
		};

	// Получаем название файла из пути
	var _getNameFromPath = function (path) {
		return path.replace(/\\/g, '/').replace(/.*\//, '');
	};


	// Прослушивает события
	var _setUpListeners = function () {
		$('#add-new-item').on('click', _showModal); //открыть модальное окно
		$('.form-add-project').on('submit', _addProject); //добавление проекта
		$('#fileupload').on('change', _changefileUpload);
		$('.b-close').on('click', _clearForm);
	};



	var _clearForm = function (form) {
		var form = $(this);
		form.find('.input, .textarea').trigger('hideTooltip'); // удаляем тултипы
	    form.find('.has-error').removeClass('has-error'); // удаляем красную подсветку
	    form.find('.error-mes, success-mes').text('').hide(); // очищаем и прячем сообщения с сервера
	};



	// Изменили файл аплоад (добавили файл в файлаплоад)
	var _changefileUpload = function (){
		var input = $(this), // инпут type="file"
			name = _getNameFromPath(input.val()); // имя загруженного файла

		$('#filename')
			.val(name) // 
			.trigger('hideTooltip')
			.removeClass('has-error'); 
	};


	// Работает с модальным окном
	var _showModal = function (e) {
		console.log('Вызов модального окна');
		e.preventDefault();
		var divPopup = $('#new-project-popup');
			form = divPopup.find('form');
		divPopup.bPopup({
			speed: 650,
			transition: 'slideDown',
			onClose: function() {
				form.find('.server-mes').text('').hide();
				form.trigger("reset");
			}
		});
	};
	var _addProject = function (e){
		console.log('Добавление проекта');
		e.preventDefault();

		//объявляем переменные
		var form = $(this),
			url = 'add-project.php',
			myServerGiveMeAnAnswer = _ajaxForm(form, url);

			if (myServerGiveMeAnAnswer){
				myServerGiveMeAnAnswer.done(function(ans) {

			var successBox = form.find('.success-mes'),
				errorBox = form.find('.error-mes');

			if(ans.mes === 'OK'){
				erreoBox.hide();
				successBox.text(ans.text).show();
			}else{
				successBox.hide();
				errorBox.text(ans.text).show();
			}
		})
	};
	};
	
	// Универсальная функция
	// Для ее работы используется
	// @form - форма
	// @url - адрес php файла, к которому мы обращаемся
	// 1. собирает данные из формы
	// 2. проверяет форму
	// 3. делает запрос на сервер и возвращает ответ с сервера
	var _ajaxForm = function (form, url){

		
		// 1. проверить форму
		// 2. собрать данные из формы
		// 3. вернуть ответ с сервера

		if(!validation.validateForm(form)) return false;

		data = form.serialize();

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail( function(ans) {
			console.log('проблемы в php');
			form.find('.error-mes').text('На сервере произошла ошибка').show();
		}).done(function(ans){
			console.log('done');
			form.find('.success-mes').text('Проект успешно добавлен').show();
		});

		return result;

	};

	// Возвращаем объект (публичные методы)
	return {
		init : init
	};

})();

myModule.init();


$(document).ready(function($){

	var $inputFile = $('#fileupload');

	$inputFile.on('change', function(){
		var filepath = $inputFile.val(),
			$input = $('.input-add-picc');

		filepath = filepath.replace(/c:\\fakepath\\/gmi, "");
		$input.val(filepath);
	});
});