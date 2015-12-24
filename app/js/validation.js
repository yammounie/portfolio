var validation = (function () {

	// Инициализирует наш модуль
	var init = function () {
		_setUpListeners();
	};

	//Прослушивает события
	var _setUpListeners = function (element, position) {
		$('form').on('keydown', '.has-error', _removeError);
		$('form').on('reset', _clearForm);
	};

	var _removeError = function () {
		$(this).removeClass('has-error');
	};

	var _clearForm = function (form) {
		var form = $(this);
		form.find('.input, .textarea').trigger('hideTooltip'); // удаляем тултипы
	    form.find('.has-error').removeClass('has-error'); // удаляем красную подсветку
	    form.find('.error-mes, success-mes').text('').hide(); // очищаем и прячем сообщения с сервера
	};

	// Создает тултипы
	var _createQtip = function (element, position) {

		// позиция тултипа
		if (position === 'right') {
			position = {
				my: 'left center',
				at: 'right center'
			}
		}else{
			position = {
				my: 'right center',
				at: 'left center',
				adjust: {
					method: 'shift none'
				}
			}
		}
	// инициализация тултипа
	element.qtip({
		content: {
			text: function() {
				return $(this).attr('qtip-content');
			}
		},
		show: {
			event: 'show'
		},
		hide: {
			event: 'keydown hideTooltip reset'
		},
		position: position,
		style: {
			classes: 'qtip-mystyle qtip-rounded',
			tip: {
				height: 10,
				width: 16
			}
		}
	}).trigger('show');
	};

	// Универсальная функция
	var validateForm = function (form) {

		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
		valid = true;

		// Пройдемся по всем элементам формы
		$.each(elements, function (index, val){
			var element = $(val),
				val = element.val(),
				pos = element.attr('qtip-position');

			if(val.length === 0){
				element.addClass('has-error');
				_createQtip(element, pos);
				valid = false;
			}
		});

		return valid;
	};


	// Возвращаем объект (публичные методы)
	return {
		init: init,
		validateForm: validateForm
	};
})();

validation.init();