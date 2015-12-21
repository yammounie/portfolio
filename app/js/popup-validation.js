var validation = (function () {

	var _init = function () {
		_setUpListeners
	},

		_setUpListeners = function () {

		},

		_validateForm = function (form) {
			var elements = $(form).find('input'),
			valid = false;

			//console.log(elements);

			$.each(elements, function(index, el) {
				var val = $(el).val();

				if (val.length === 0) {
					valid = false;

					$(el).qtip({
						content: 'My content',
						show:{
							event: 'show'
						},
						hide:{
							event: 'focus' // разобраться
						},
						position: {
        					my: 'top left',  
        					at: 'bottom right',
        				},
        				style: {
        					classes: 'my-qtip'
        				}
					}).trigger('show')





				} else {
					valid = true;
				}
			})
			return valid;
		}

	return {
		init: _init,
		validateForm: _validateForm
	}
}());

// validation.init();

$('.add-new-project').on('submit', function(e) {
	e.preventDefault();

	var form = this;

	var val = validation.validateForm(form);

	console.log(val);
});