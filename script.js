window.addEventListener("load", main, false);
function main() {
	//вводится пользователем
	let secretWindow = document.getElementById('your_number');
	let guessWindow = document.getElementById('your_guess');

	//вводится программой
	let y_att_win = document.getElementById('your_att');
	let o_att_win = document.getElementById('opp_att');
	let y_res_win = document.getElementById('your_res');
	let o_res_win = document.getElementById('opp_res');
	let o_sec_win = document.getElementById('secret');
	let o_guess_win = document.getElementById('opponent_guess');
	let opSecretWindow = document.getElementById('secret');

	let name = 'unknown';
	let o_name = 'unknown';

	//попапы
	let popup = document.querySelector('.popup');
	let closePopupButton = document.querySelector('.popup_close');
	let popup_digits = document.getElementById('digits_msg');
	let popup_con = document.getElementById('con_msg');
	let popup_name = document.getElementById('reg_msg');

	let secret = '';
	let guess = '';

	let IKnowSecret = false;
	let prev_incoming ='';
	let incoming = '';
	let outgoing = '';

	let y_att = 0;
	let o_att = 0;
	let op_guess = 0;
	let op_secret = 0;

	let y_bulls = 0;
	let y_cows = 0;
	let o_bulls = 0;
	let o_cows = 0;

	function checkDup(s) {
	  var map = {};
	  for (var i = 0; i < s.length; i++) {
	    if (map[s[i]]) return true;
	    map[s[i]] = 1;
	  }
	  return false;
	}

	function check(xxx) { //ломается если ввести +
		if (!isNaN(xxx.value)) {
			if (xxx == secretWindow) {
				secret = xxx.value;
			}
			if (xxx == guessWindow) {
				guess = xxx.value;
			}
		} else {
			console.log('error');
		}
	}

	function count(s, line){
	s = String(s);
	line = String(line);
	result = [];
	bulls = 0;
	cows = 0;
	for (let i = 0; i < 4; i++){
		const index = s.indexOf(line[i]);
		if (index === i){
			bulls ++;
		} else if (index >-1) {
			cows ++;
		}
	}
	result[0] = bulls;
	result[1] = cows;
	return result
	}

	eel.expose(rewrite_inc)
	function rewrite_inc(val){
		incoming = val;
	}


	async function communication(){
			await eel.communicate(outgoing);
	}

	async function connection(val){
		await eel.connect(val);
	}

	function update(){
		communication();
		handle();
		outgoing = name + '|' + secret + '|' + guess;
		console.log(outgoing);
		o_att_win.innerHTML = o_att;
	}

	popup_name.classList.add('active');

	document.addEventListener( 'keyup', event => {
	  if( event.code === 'Enter' ){
	    name = document.getElementById('name').value;
	  	popup_name.classList.remove('active');
	  }
	});

	secretWindow.oninput = function(event) {
		check(secretWindow);
		if ((secretWindow.value.length == 4) && !(checkDup(secret))) {
			console.log('secret =', secret);
			IKnowSecret = true;
			connection(name);
	    	setInterval(update, 1000);
		}

		if ((secretWindow.value.length == 4)  && (checkDup(secret))){
			popup_digits.classList.add('active');
		}

	}

	guessWindow.oninput = function(event) {
		check(guessWindow);
		if ((guessWindow.value.length == 4) && !(checkDup(guess))){
			console.log('guess=', guess)
			y_att = y_att +1;
			y_att_win.innerHTML = y_att;
		}
		if ((guessWindow.value.length == 4)  && (checkDup(guess))){
			popup_digits.classList.add('active');
			outgoing = '';
		}
	}

	function handle() {
		incArr = incoming.split('|');
		if ((incArr.length >= 3) && (incoming != prev_incoming)) {
			op_name = incArr[0];
			op_secret = incArr[1];
			op_guess = incArr[2];
			opSecretWindow.innerHTML = (op_name + '\'s secret');
			console.log(op_name, op_secret, op_guess);
			if ((op_guess.length == 4) && !(checkDup(op_guess))) {
				prev_incoming = incoming;
				o_guess_win.innerHTML = op_guess;
				o_att = o_att + 1;
				res1 = count(secret, op_guess);
				o_bulls = res1[0];
				o_cows = res1[1];
				o_res_win.innerHTML = o_bulls + ' bulls ' + o_cows + ' cows';
				if (bulls == 4){
					o_res_win.innerHTML = ('guessed!');
				}
			}
		}
		if ((guess != '') && (op_secret != 0)) {
			res2 = count(op_secret, guess);
			y_bulls = res2[0];
			y_cows = res2[1];
			y_res_win.innerHTML = y_bulls + ' bulls ' + y_cows + ' cows';
			if (bulls == 4){
				y_res_win.innerHTML = ('guessed!');
				opSecretWindow.innerHTML = op_secret;
			}
		}
	}


	closePopupButton.addEventListener('click',(event) => {
	    popup.classList.remove('active');
	    event.preventDefault();
	});
}
