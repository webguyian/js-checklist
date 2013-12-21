var $ = document.querySelector.bind(document),
	doc = document,
	checklist = $('.checklist'),
	addBtn = $('.btn-add'),
	clearBtn = $('.btn-clear'),
	input = doc.getElementsByTagName('input')[0],
	list = doc.getElementsByTagName('ul')[0];
	list.className = 'list';

var fade = function() {
	return {
		init: function(el, flag, target){
			this.elem = el;
			clearInterval(this.elem.si);
			this.target = target ? target : flag ? 100 : 0;
			this.flag = flag || -1;
			this.alpha = this.elem.style.opacity ? parseFloat(this.elem.style.opacity) * 100 : 0;
			this.elem.si = setInterval(function(){fade.tween()}, 20);
		},
		tween: function(){
			if(this.alpha == this.target) {
				clearInterval(this.elem.si);
				this.elem.removeAttribute('class');
			} else {
				var value = Math.round(this.alpha + ((this.target - this.alpha) * .10)) + (1 * this.flag);
				this.elem.style.opacity = value / 100;
				this.elem.style.filter = 'alpha(opacity=' + value + ')';
				this.alpha = value;
			}
		}
	}
}();

function addTodo() {
	var li = doc.createElement('li'),
		checkbox = doc.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.className = 'close';
	checkbox.addEventListener('click', markDone, false);
	li.innerHTML = input.value;
	li.className = 'hidden';
	li.appendChild(checkbox);
	list.appendChild(li);
	fade.init(li, 1);
	input.value = '';
	input.focus();
}

function markDone() {
	if (this.checked) {
		this.parentNode.className = 'completed';
	} else {
		this.parentNode.removeAttribute('class');
	}
}

function clearTodos() {
	var listElements = list.getElementsByClassName('completed');

	while (listElements[0]) {
		listElements[0].parentNode.removeChild(listElements[0]);
	}
}

input.addEventListener('keypress', function(e){
	var key = e.which || e.keyCode;
	if (key == 13) {
		addTodo();
	}
})

addBtn.addEventListener('click', addTodo, false);
clearBtn.addEventListener('click', clearTodos, false);