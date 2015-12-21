var contactMe = (function () {

	// Инициализирует наш модуль
	var init = function () {
	_setUpListners();
	};		


	// Прослушивает события
	var _setUpListners = function () {

		$('#contact-me').on('submit', _submitForm);
	};

	var _submitForm = function(ev) {
		console.log('Отправка формы')
		ev.preventDefault();

		var form = $(this),
		url = 'contactme.php',
		defObj = _ajaxForm(form, url);
		// что-то будем делать с ответом с сервера defObj
	};

	var _ajaxForm = function (form, url) {
		console.log('ajax запрос с отправкой формы')
		if(!validation.validateForm(form)) return false;

		// если false, то код ниже не произойдет никогда

	};

	//Возвращает объект (публичные методы)
	return {
		init: init
	};
})();

contactMe.init();