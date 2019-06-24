function calculate() {
	pre = ""
	//this is a failsafe
	error = "Please use a whole number.";
	//the rest is code
	ans = "The code is not working correctly.";
	end = undefined
	p = document.getElementById("p1");
	num = document.getElementById("sides").value;
	if (Number.isInteger(Number(num)) && num !== "" && num >= 0) {}
	else {
		p.innerHTML = error;
		return;
	};		
	if (num >= 1000) {num1k = Number(num.toString().substring(2))}
	else {num1k = num}
	if (num >= 100 && num < 1000) {
		num100 = Number(num.toString().substring(1));
	}
	else if (num >= 1000 && num < 10000) {num100 = Number(num.toString().substring(2))}
	else {num100 = num}
	if (num == 10000) {ans = "You call a 10000 sided shape a/an myriagon."; p.innerHTML = ans; return;}
	if (num > 10000 && num < 1000000) {ans = "You have entered the name of an unnamed shape. Try 10000 or 1000000 instead."; p.innerHTML = ans; return;}
	if (num == 1000000) {ans = "You call a 1000000 sided shape a/an megagon."; p.innerHTML = ans; return;}
	if (num > 1000000) {ans = "You have entered in the name of an unnamed shape. There aren't any other polygons with more sides, but an apeirogon has infinite sides."; p.innerHTML = ans; return;}
	//1-9
	if (num100 == 0 || num1k == 0) {ans = "You cannot have a 0 sided shape."; pre = "";}
	if (num100 == 1 || num1k == 1) {ans = "You cannot have a 1 sided shape, but if you could it would be called a monogon."; pre = "hen";}
	if (num100 == 2 || num1k == 2) {ans = "You cannot have a 2 sided shape, but if you could it would be called a digon."; pre = "di";}
	if (num100 == 3 || num1k == 3) {end = "trigon"; pre = "tri";}
	if (num100 == 4 || num1k == 4) {end = "tetragon"; pre = "tetra";}
	if (num100 == 5 || num1k == 5) {end = "pentagon"; pre = "penta";}
	if (num100 == 6 || num1k == 6) {end = "hexagon"; pre = "hexa";}
	if (num100 == 7 || num1k == 7) {end = "heptagon"; pre = "hepta";}
	if (num100 == 8 || num1k == 8) {end = "octagon"; pre = "octa";}
	if (num100 == 9 || num1k == 9) {end = "enneagon"; pre = "ennea";}	
	//10-19
	if (num100 == 10) {end = "decagon"; pre = "deca";}
	if (num100 == 11) {end = "hendecagon"; pre = "hendeca";}
	if (num100 == 12) {end = "dodecagon"; pre = "dodeca";}
	if (num100 == 13) {end = "trisdecagon"; pre = "trisdeca";}
	if (num100 == 14) {end = "tetradecagon"; pre = "tetradeca";}
	if (num100 == 15) {end = "pentadecagon"; pre = "pentadeca";}
	if (num100 == 16) {end = "hexadecagon"; pre = "hexadeca";}
	if (num100 == 17) {end = "heptadecagon"; pre = "heptadeca";}
	if (num100 == 18) {end = "octadecagon"; pre = "octadeca";}
	if (num100 == 19) {end = "enneadecagon"; pre = "enneadeca";}
	//20-99
	if (num > 19) {
		suff = ""
		suf = ""
		the10s = Math.floor(num100 / 10);
		if (the10s == 2) {suf = "icosa"}
		if (the10s == 3) {suf = "triaconta"}
		if (the10s == 4) {suf = "tetraconta"}
		if (the10s == 5) {suf = "pentaconta"}
		if (the10s == 6) {suf = "hexaconta"}
		if (the10s == 7) {suf = "heptaconta"}
		if (the10s == 8) {suf = "octaconta"}
		if (the10s == 9) {suf = "enneaconta"}
		if (num % 10 != 0 && num100 >= 20) {
			var last = num.toString().split('').pop();
			if (last == "1") {pre = "hena"}
			if (last == "2") {pre = "di"}
			if (last == "3") {pre = "tri"}
			if (last == "4") {pre = "tetra"}
			if (last == "5") {pre = "penta"}
			if (last == "6") {pre = "hexa"}
			if (last == "7") {pre = "hepta"}
			if (last == "8") {pre = "octa"}
			if (last == "9") {pre = "ennea"}
		}
		if (num % 10 != 0) {pre = "kai" + pre}
		if (num.slice(-3) >= 100) {
			the100s = Math.floor(num.slice(-3) / 100);
			if (the100s == 1) {suff = "hecto"}
			if (the100s == 2) {suff = "dihecta"}
			if (the100s == 3) {suff = "trihecta"}
			if (the100s == 4) {suff = "tetrahecta"}
			if (the100s == 5) {suff = "pentahecta"}
			if (the100s == 6) {suff = "hexahecta"}
			if (the100s == 7) {suff = "heptahecta"}
			if (the100s == 8) {suff = "octahecta"}
			if (the100s == 9) {suff = "enneahecta"}
		}
		if (num >= 1000) {
			the1ks = Math.floor(num / 1000);
			if (the1ks == 1) {fuf = "chillia"}
			if (the1ks == 2) {fuf = "dischillia"}
			if (the1ks == 3) {fuf = "trischillia"}
			if (the1ks == 4) {fuf = "tetrakischillia"}
			if (the1ks == 5) {fuf = "pentakischillia"}
			if (the1ks == 6) {fuf = "hexakischillia"}
			if (the1ks == 7) {fuf = "heptakischillia"}
			if (the1ks == 8) {fuf = "octakischillia"}
			if (the1ks == 9) {fuf = "enneakischillia"}
		}
		if (num <= 99) {end = suf + pre + "gon"}
		if (num100 < 20 && num >= 100) {end = suff + pre + "gon"}
		if (num >= 120 && num < 1000) {end = suff + suf + pre + "gon"}
		if (num1k >= 0 && num >= 1000 ) {end = fuf + suff + suf + pre + "gon"}
	}
	if (end != undefined || num >= 100) {ans = "You call a " + num + " sided shape a/an " + end + "."}
	end = undefined;
	p.innerHTML = ans;}