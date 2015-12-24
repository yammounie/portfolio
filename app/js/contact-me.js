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
		url = 'contact-me.php',
		defObj = _ajaxForm(form, url);
		// что-то будем делать с ответом с сервера defObj
	};



	var _addProject = function (e){
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




	var _ajaxForm = function (form, url) {
		console.log('ajax запрос с отправкой формы')
		if(!validation.validateForm(form)) return false;

		// если false, то код ниже не произойдет никогда
		data = form.serialize();

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail(function(ans) {
			console.log('проблемы в php');
			form.find('.error-mes').text('На сервере произошла ошибка').show();
		}).done(function(ans){
			console.log('done');
			form.find('.success-mes').text('Проект успешно добавлен').show();
		});

		return result;
	};
	

	//Возвращает объект (публичные методы)
	return {
		init: init
	};
})();

contactMe.init();