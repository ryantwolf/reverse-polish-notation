
var stack = [];
var currentNum;
var error = false;

function input(token) {
	//Checks for errors
	if (!error) {
		//Deals with numbers
		if (typeof token === 'number') {
			if(typeof currentNum === 'undefined' || currentNum === 0 && token !== 0) {
				currentNum = token;
				document.getElementById('clear').innerHTML = 'C';
			} else if(typeof currentNum === 'number') {
				currentNum = parseFloat(currentNum.toString().concat("" + token));
			} else if (typeof currentNum === 'string') {
				if(token === 0) {
					currentNum = currentNum.concat("" + token);
				} else {
					currentNum = parseFloat(currentNum.concat("" + token));
				}
			}
		//Deals with the decimal point
		} else if(token === '.') {
			if (typeof currentNum === 'undefined' || currentNum === 0) {
				currentNum = '0.';
				document.getElementById('clear').innerHTML = 'C';
			} else if(typeof currentNum === 'number' && currentNum.toString().indexOf('.') === -1) {
				currentNum = currentNum.toString().concat("" + token);
			}
		}
		document.getElementById("textbox").innerHTML = currentNum;
	}
};
function clearNum() {
	if (typeof currentNum === 'undefined' || currentNum === 0) {
		stack = [];
	}
	currentNum = 0;
	document.getElementById("textbox").innerHTML = currentNum;
	document.getElementById('clear').innerHTML = 'AC';
	error = false;
};
function addToStack(token) {
	if (typeof token === 'number') {
		stack.push(parseFloat(token));
		currentNum = 0;
		document.getElementById("textbox").innerHTML = currentNum;
		document.getElementById('clear').innerHTML = 'AC';
	} else if (typeof token === 'string'){
		if (stack.length < 2) {
			currentNum = 0;
			document.getElementById("textbox").innerHTML = 'Error';
			error = true;
		} else if (stack.length >= 2) {

			var num2 = stack.pop();
			var num1 = stack.pop();
			var res;

			switch (token) {
				case '+':
					res = num1 + num2;
					break;
				case '-':
					res = num1 - num2;
					break;
				case '*':
					res = num1 * num2;
					break;
				case '/':
					res = num1 / num2;
					break;

			}
			currentNum = res;
			document.getElementById("textbox").innerHTML = res;
			document.getElementById('clear').innerHTML = 'C';
		}
	}
};
function posNeg() {
	currentNum *= -1;
	document.getElementById("textbox").innerHTML = currentNum;
};
function perc() {
	currentNum *= .01;
	document.getElementById("textbox").innerHTML = currentNum;
}
// function isNumber(n) {
// 	return !isNaN(parseFloat(n)) && isFinite(n);
// };