var fade = function() {
	return {
		init: function(el, flag, target){
			this.elem = el;
			clearInterval(this.elem.si);
			this.target = target ? target : flag ? 100 : 0;
			this.flag = flag || -1;
			this.alpha = this.elem.style.opacity ? parseFloat(this.elem.style.opacity) * 100 : 0;
			this.elem.si = setInterval(function(){fade.tween();}, 20);
		},
		tween: function(){
			if(this.alpha == this.target) {
				clearInterval(this.elem.si);
			} else {
				var value = Math.round(this.alpha + ((this.target - this.alpha) * 0.10)) + (1 * this.flag);
				this.elem.style.opacity = value / 100;
				this.elem.style.filter = 'alpha(opacity=' + value + ')';
				this.alpha = value;
			}
		}
	};
}();

function ToDo(checklistElement) {
	var $ = document.querySelector.bind(document),
			doc = document,
			_this = this,
			checklist = checklistElement,
			input = doc.getElementsByTagName('input')[0],
			list = doc.getElementsByTagName('ul')[0],
			notification = $('.notification');
			list.className = 'list';
	return {
		init: function() {
			var __this = this,
					addBtn = $('.btn-add'),
					clearBtn = $('.btn-clear');
			input.addEventListener('keypress', function(e){
				var key = e.which || e.keyCode;
				if (key == 13) {
					console.log(__this);
					__this.addItem();
				}
			});
			addBtn.addEventListener('click', __this.addItem.bind(__this), false);
			clearBtn.addEventListener('click', __this.clearItem.bind(__this), false);
	}, // end init
	fadeOut: function(elem) {
		fade.init(elem);
	},
	addItem: function() {
		var that = this, // HTMLButtonElement
				fadeOut = function(){fade.init(notification);};

		if (input.value) {
			var li = doc.createElement('li'),
					checkbox = doc.createElement('input'),
					inputVal = doc.createTextNode(input.value);
			checkbox.setAttribute('type', 'checkbox');
			checkbox.className = 'close';
			checkbox.addEventListener('click', that.isDone, false);
			li.className = 'hidden';
			li.appendChild(checkbox);
			li.appendChild(inputVal);
			list.appendChild(li);
			fade.init(li, 1);
			input.value = '';
		} else {
			notification.innerHTML = 'You cannot do nothing. Add a todo.';
			fade.init(notification, 1);
			window.setTimeout(fadeOut, 2000);
		}
		input.focus();
		return that;
	}, // end add
	isDone: function() {
		var _this = this; // checkbox input
		if (_this.checked) {
			_this.parentNode.className = 'completed';
		} else {
			_this.parentNode.removeAttribute('class');
		}
	}, // end isDone
	clearItem: function() {
		var ___this = this,
				listElements = list.getElementsByClassName('completed');

		notification.innerHTML = 'You need to complete your TODOs first.';

		if (listElements[0]) {
			while (listElements.length) {
				listElements[0].parentNode.removeChild(listElements[0]);
			}
		} else {
			fade.init(notification, 1);
			window.setTimeout(function(){___this.fadeOut(notification)}, 2000);
		}
	} // end clear
};

}

var checklist = document.querySelector('.checklist'),
todo = new ToDo(checklist);
todo.init();
