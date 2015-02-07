
(function($) {

	function tmpl(str, data) {
		return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
			return data[key] || '';
		});
	}

	$.fn.effectize = function() {
		
		var this$ = $(this),
			datas = this$.data(),
			config = {
				events: 'click',
				origin: this$,
				destin: this$,
				action: $.noop()				
			};

		function configParser(text, type) {
			var types = {
				events: function(text) {
					return text;
				},
				origin: function(text) {
					return this$.find(text);
				},
				destin: function(text) {
					return $(text);
				},
				action: function(text) {
					return text;
				}
			};
			return types[type] ? types[type](text) : text;
		}

		for(var i in datas) {
			var opt, type;
			if( (opt = i.match(/^fz(.*)$/)) && (type = opt[1].toLowerCase()) )
				config[type] = configParser(datas[i], type);
		}

		console.log(config);

		config.origin.on(config.events, function(e) {
			console.log(config.origin, e)
			$(this)[ config.action ]( config.destin );
		});

		this$.addClass('fz-effectized');

		return this$;
	};

})(jQuery);

$(function() {

	setTimeout(function() {
	
		$('.fz-element').effectize();
	
	},1000);

});
