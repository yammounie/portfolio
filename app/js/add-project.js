var myModule = (function () {

	// Инициализирует наш модуль
	var init = function () {
		_setUpListeners();
		};

	// Прослушивает события
	var _setUpListeners = function () {
		$('#add-new-item').on('click', _showModal); //открыть модальное окно
		$('.form-add-project').on('submit', _addProject); //добавление проекта
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
				form.find('').text('').hide();
			}
		});
	};
	var _addProject = function (e){
		console.log('Добавление проекта1');
		e.preventDefault();

		//объявляем переменные
		var form = $(this),
			url = 'add-project.php',
			myServerGiveMeAnAnswer = _ajaxForm(form, url);
			if (myServerGiveMeAnAnswer){
				myServerGiveMeAnAnswer.done(function(ans) {

			var successBox = form.find('.add-project-done-wrap'),
				errorBox = form.find('.add-project-error-wrap');

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
			form.find('.add-project-error-wrap').text('На сервере произошла ошибка').show();
		});

		return result;

	};

	// Возвращаем объект (публичные методы)
	return {
		init : init
	};

})();

myModule.init();