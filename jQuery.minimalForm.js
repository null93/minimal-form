$.fn.minimalForm = function(init,dataArray,exitFunction) {
	this.addClass('FORM');
	init['success'] = (init['success'] == null) ? "successfully submitted!" : init['success'];
	this.html("<DIV class='Wrapper' data-success='"+init['success']+"' ></DIV><DIV class='Councle' ></DIV><DIV class='Submit' ></DIV>");
	$.each(dataArray, function(i,data) {
		if(data['type'] != null) {
			if(data['name'] != null) {
				data['regex'] = (data['regex'] == null) ? ".*.{3,255}" : data['regex'];
				data['error'] = (data['error'] == null) ? "please try again!" : data['error'];
				data['errorConfirm'] = (data['errorConfirm'] == null) ? "passwords do not match" : data['errorConfirm'];
				data['placeholderConfirm'] = (data['placeholderConfirm'] == null) ? "confirm password" : data['placeholderConfirm'];
				data['placeholder'] = (data['placeholder'] == null) ? data['type'] : data['placeholder'];
				switch (data['type']) {
					case 'text':
						$('.Wrapper').append("<INPUT spellcheck='false' class='data' type='text' data-name='"+data['name']+"' data-type='text' data-regex='"+data['regex']+"' data-error='"+data['error']+"' placeholder='"+data['placeholder']+"' />");
						break;
					case 'password':
						$('.Wrapper').append("<INPUT spellcheck='false' class='data' type='password' data-name='"+data['name']+"' data-type='password' data-regex='"+data['regex']+"' data-error='"+data['error']+"' placeholder='"+data['placeholder']+"' />");
						break;
					case 'confirmPassword':
						$('.Wrapper').append("<INPUT spellcheck='false' class='data' type='password' data-name='"+data['name']+"' data-type='password' data-regex='"+data['regex']+"' data-error='"+data['error']+"' placeholder='"+data['placeholder']+"' /><INPUT type='password' data-type='confirmPassword' data-error='"+data['errorConfirm']+"' placeholder='"+data['placeholderConfirm']+"' />");
						break;
					case 'select':
						var temp = "";
						$.each(data['options'], function(i,e) {
							temp += "<DIV class='option' data-value='"+e+"' >"+i+"</DIV>";
						});
						$('.Wrapper').append("<DIV class='select data' data-name='"+data['name']+"' data-type='select' data-error='"+data['error']+"' ><DIV>"+data['placeholder']+"</DIV><DIV class='optionContainer' >"+temp+"</DIV></DIV>");
						break;
				}
			}
			else {
				console.log("ERROR - Minimal Form: Please Define 'unique name' in data");
			}
		}
		else {
			console.log("ERROR - Minimal Form: Please Define 'type' in data");
		}
	});
	function regex(string,expression) {
		if(expression == 'email') {
			var exp = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/;
			return (exp.test(string));
		}
		if(expression == 'password') {
			var exp = /^(?=.*\d).{4,16}$/;
			return (exp.test(string));
		}
		else {
			var exp = new RegExp(expression);
			return (exp.test(string));
		}
	}
	function councle(type,index) {
		if(type == 'success') {
			$('.Councle').css('background','#B9D48B').css('width','100%');
			var msg = $('.Wrapper').data('success');
			$('.Councle').html(msg);
			$('.Councle').stop(false,false).animate({bottom: 	'0%'}, 300);
			exitFunction(collect());
		}
		else if(type == 'error') {
			$('.Councle').css('background','#45AAB8');
			var msg = $('.Wrapper').children().eq(index).data('error');
			$('.Councle').html(msg);
			$('.Councle').stop(false,false).animate({bottom: 	'0%'}, 300, function() {
				$('.Councle').delay(500).animate({bottom: 	'-100%'}, 300);
			});
		}
	}
	function collect() {
		var element = {};
		var data = [];
		$('.data').each(function(i,e) {
			if($(this).attr('data-type') == 'select') {
				element = {
					type: 			$(this).attr('data-type'),
					error: 			$(this).attr('data-error'),
					value: 			$(this).data('value')
				}
				data[$(this).attr('data-name')] = element;
			}
			else {
				element = {
					type: 			$(this).attr('data-type'),
					regex: 			$(this).attr('data-regex'),
					error: 			$(this).attr('data-error'),
					placeholder: 	$(this).attr('placeholder'),
					value: 			$(this).val()
				}
				data[$(this).attr('data-name')] = element;
			}
		});
		return data;
	}

	$('.Wrapper').children().attr('disabled',true);
	$('.Wrapper :first-child').attr('disabled',false).attr('current','0');
	var height = parseInt($('.FORM').css('height').replace('px',''));
	var width = parseInt($('.FORM').css('width').replace('px',''));
	$('.Councle').css('height',height-15+'px').css('width',width-50+'px');
	$('.Wrapper').css('width',width-50+'px');
	$('.Wrapper').children().css('width',width-60+'px');
	$('.Wrapper .select').css('width',width-60+'px');
	$('.optionContainer').css('width',width-49+'px');
	$('.select').css('width',width-45+'px');
	$('.select DIV:eq(0)').css('height',height-13+'px').css('width',width-55+'px');
	$('.option').css('height',height-13+'px').css('width',width-54+'px');
	$('.Wrapper INPUT').attr('autocomplete','off');
	$(document).on('keyup','.Wrapper INPUT', function(e) {
		var code = e.keyCode || e.which;
		if(code == 13) {
			$('.Submit').trigger('click');
		}
	});
	$(document).on('click','.select', function() {
		if($(this).data('open') == 'open') {
			$(this).data('open','closed');
			$(this).find('.optionContainer').css('display','none');
		}
		else {
			$(this).data('open','open');
			pos = $(this).offset();
			$(this).find('.optionContainer').css('left',pos['left']-4+'px').css('top',pos['top']+53+'px').css('display','block');
		}
	});
	$(document).on('click','.option', function() {
		var value = $(this).data('value');
		$(this).parent().parent().data('value',value);
		$(this).parent().parent().children().eq(0).html($(this).html());
	});
	$(document).on('click','.Submit', function() {
		var position = parseInt($('.Wrapper').css('top').replace('px',''));
		var childHeight = parseInt($('.Wrapper :first-child').css('height').replace('px',''));
		var current = parseInt($('INPUT[current],DIV[current]').attr('current'));
		var children = $('.Wrapper').children().length;
		if(children > current) {
			function exit() {
				if(current >= children) {
					councle('success');
				}
			}
			var type = $('.Wrapper').children().eq(current).data('type');
			var target = $('.Wrapper').children().eq(current).val();
			var targetTest = $('.Wrapper').children().eq(current).data('regex');
			if(type == 'text' || type == 'password') {
				if(regex(target,targetTest)){
					$('.Wrapper').children().eq(current).stop(false,false).animate({backgroundColor: 	'#B9D48B', color: 	'#FFF'}, 300, function() {
						var increment = (position == 0) ? -1*(position+childHeight)+'px' : position-childHeight+'px';
						$('.Wrapper').delay(300).stop(false,false).animate({top: 	increment}, 300);
						$('INPUT[current],DIV[current]').removeAttr('current').attr('disabled',true);
						current++;
						$('.Wrapper').children().eq(current).attr('current',current).attr('disabled',false);
						exit();
					});
				}
				else {
					councle('error',current);
				}
			}
			else if (type == 'select' && $('.Wrapper').children().eq(current).data('value') != undefined) {
				$('.Wrapper').children().eq(current).find('DIV').eq(0).stop(false,false).animate({color: 	'#FFF'}, 300);
				$('.Wrapper').children().eq(current).stop(false,false).animate({backgroundColor: 	'#B9D48B', color: 	'#FFF'}, 300, function() {
					var increment = (position == 0) ? -1*(position+childHeight)+'px' : position-childHeight+'px';
					$('.Wrapper').delay(300).stop(false,false).animate({top: 	increment}, 300);
					$('INPUT[current],DIV[current]').removeAttr('current').attr('disabled',true);
					current++;
					$('.Wrapper').children().eq(current).attr('current',current).attr('disabled',false);
					exit();
				});
			}
			else if (type == 'confirmPassword') {
				if($('.Wrapper').children().eq(current).val() == $('.Wrapper').children().eq(current-1).val()){
					$('.Wrapper').children().eq(current).stop(false,false).animate({backgroundColor: 	'#B9D48B', color: 	'#FFF'}, 300, function() {
						var increment = (position == 0) ? -1*(position+childHeight)+'px' : position-childHeight+'px';
						$('.Wrapper').delay(300).stop(false,false).animate({top: 	increment}, 300);
						$('INPUT[current],DIV[current]').removeAttr('current').attr('disabled',true);
						current++;
						$('.Wrapper').children().eq(current).attr('current',current).attr('disabled',false);
						exit();
					});
				}
				else {
					councle('error',current);
				}
			}
			else {
				councle('error',current);
			}
		}
		else {
			$('INPUT[current],DIV[current]').removeAttr('current').attr('disabled',true);
			councle('success');
		}
	});
};