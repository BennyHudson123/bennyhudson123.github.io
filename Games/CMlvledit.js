//repeating keypress detection
var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false; }
window.onkeydown = function(e) { keys[e.keyCode] = true; }

var board = document.getElementById("game");

board.style.backgroundColor = "white";

x = 100;
y = board.height - 100;

var drc = 135;
var radius = 20;

var rec = board.getContext("2d");

var crl = board.getContext("2d");
crl.beginPath();
crl.arc(x, y, radius, 0, 2 * Math.PI);

var ttl = board.getContext("2d");
ttl.font = "75px Arial";
ttl.textAlign = "center";
ttl.fillText("Circle Maneuver", board.width / 2, 100);
ttl.font = "50px Arial";
ttl.textAlign = "center";
ttl.fillText("Level Editor", board.width / 2, 150);
ttl.font = "30px Arial";
ttl.textAlign = "center";
ttl.fillText("A Ben Pitt Stoller Game", board.width / 2, board.height - 50);

frameRate = 1/60;
frameRate *= 1000;

function start(mode) {
	// var rectangl = {};
	window.rectangl = rectangl;
	button = document.getElementById("button");
	button2 = document.getElementById("button2");
	crl.clearRect(0, 0, board.width, board.height);
	button.style.visibility = "hidden";
	button2.style.visibility = "hidden";
	if (mode == "make") {
		var rectangl = {};
		window.rectangl = rectangl;
		document.getElementById('rectnumb').style.visibility = "visible";
		document.getElementById('rectcol').style.visibility = "visible";
		document.getElementById('paus').style.visibility = "visible";
		setTimeout(function () {
			drawing = false
		}, frameRate)
		pauseResume("make");
	}
	else if (mode == "play") {
		startingRightNow = true;
		enterCode()
	}
}

var startingRightNow = false;

function enterCode() {
	var rectangl = window.prompt("Please paste your level code here. (If you put an invalid code, the game will not work.)");
	if (rectangl == null) {
		if (startingRightNow == true) {location.reload();}
		return;
	}
	window.rectangl = rectangl;
	function isJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
	if (!isJson(rectangl)) {
		alert("error");
		enterCode();
	}
	else {
		document.getElementById('paus').style.visibility = "visible";
		pauseResume(false);
		setTimeout(function	(){window.rectangl = JSON.parse(rectangl)}, frameRate);
	}
}

function pauseResume(pause) {
	if (pause == false) {
		drawing = "very false"
		runGame = setInterval(gameFrame, frameRate);
		clearInterval(makeGame);
	}
	if (pause == true) {
		drawing = "very false"
		crl.clearRect(0, 0, board.width, board.height);
		clearInterval(runGame);
		clearInterval(makeGame);
	}
	if (pause == "make") {
		drawing = false
		makeGame = setInterval(makeFrame, frameRate);
		clearInterval(runGame);
	}
}

var mousx;
var mousy;

var drawing = "very false";

function makeFrame() {
	document.getElementById('rectnumb').style.visibility = "visible";
	document.getElementById('rectcol').style.visibility = "visible";
	document.getElementById('paus').style.visibility = "visible";
	document.getElementById('code').style.visibility = "visible";
	document.getElementById('entrcode').style.visibility = "visible";
	gloMode = "make";
	document.getElementById("arrow").style.visibility = "hidden";
	board.style.cursor = "crosshair"
	crl.clearRect(0, 0, board.width, board.height);
	var startX;
	var startY;
	// if (drawing == true) {
	// 	crl.fillStyle = getColor();
	// 	crl.fillRect(startX, startY, mousx - startX, mousy - startY);
	// }
	rectaMake();
}

board.addEventListener("mousedown", mouseDown);

function mouseDown() {
	if (document.activeElement == document.getElementById('body')) {
		if (drawing == false) {
			drawing = true;
			startX = mousx;
			startY = mousy;
		}
	}
}
function getColor() {
	var fakecol = document.getElementById('rectcol').value
	if (fakecol == "Light Blue") {return "aqua";}
	else if (fakecol == "Dark Blue") {return "darkblue";}
	else if (fakecol == "Dark Blue") {return "darkblue";}
	else if (fakecol == "Gray") {return "lightgray";}
	else if (fakecol == "Pink") {return "magenta";}
	else if (fakecol == "Brown") {return "saddlebrown";}
	else if (fakecol == "Green") {return "lime";}
	else {return fakecol.toLowerCase();}
}

document.addEventListener("mouseup", function(){
	if (document.activeElement == document.getElementById('body')) {
		if (drawing == true) {
			drawing = false;
			rectselected = document.getElementById('rectnumb').value.substr(-1)
			setRect()
			board.style.cursor = "default";
		}
	}
	else {
		drawing = false;
		board.style.cursor = "default";
	}
});

var rectselected;

function setRect() {
	if (startX < mousx) {
		if (startY < mousy) {
			rectangl["X" + rectselected] = startX
			rectangl["Y" + rectselected] = startY
			rectangl["W" + rectselected] = mousx - startX
			rectangl["H" + rectselected] = mousy - startY
		}
		else if (startY > mousy) {
			rectangl["X" + rectselected] = startX
			rectangl["Y" + rectselected] = mousy
			rectangl["W" + rectselected] = mousx - startX
			rectangl["H" + rectselected] = startY - mousy
		}
	}
	else if (startX > mousx) {
		if (startY < mousy) {
			rectangl["X" + rectselected] = mousx
			rectangl["Y" + rectselected] = startY
			rectangl["W" + rectselected] = startX - mousx
			rectangl["H" + rectselected] = mousy - startY
		}
		else if (startY > mousy) {
			rectangl["X" + rectselected] = mousx
			rectangl["Y" + rectselected] = mousy
			rectangl["W" + rectselected] = startX - mousx
			rectangl["H" + rectselected] = startY - mousy
		}
	}
	rectangl["C" + rectselected] = getColor();
}

function getxymouse(mousevent) {
	var thingamaiefas = board.getBoundingClientRect();
	mousx = (mousevent.clientX - thingamaiefas.left) / (thingamaiefas.right - thingamaiefas.left) * board.width;
	mousy = (mousevent.clientY - thingamaiefas.top) / (thingamaiefas.bottom - thingamaiefas.top) * board.height;
}

function getCode() {
	var params = JSON.stringify(rectangl);
	copyStringToClipboard(params)
	function copyStringToClipboard (str) {
   // Create new element
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = str;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
}
}

function resize() {
	document.getElementById('paus').style.left = window.innerWidth / 2 - board.width / 2 + 50 + "px";
	document.getElementById('rectnumb').style.left = window.innerWidth / 2 - board.width / 2 + 200 + "px";
	document.getElementById('rectcol').style.left = window.innerWidth / 2 - board.width / 2 + 330 + "px";
	document.getElementById('arrow').style.left = window.innerWidth / 2 + board.width / 2 - 100 + "px";
	document.getElementById('code').style.left = window.innerWidth / 2 + "px";
	document.getElementById('entrcode').style.left = window.innerWidth / 2 - board.width / 2 + 200 + "px";
	// b1l = window.innerWidth / 2 - 200 + "px";
	// b2l = window.innerWidth / 2 + 200 + "px";
	// button.style.left = b1l;
	// button2.style.left = b2l;
	// if (true) {button.style.top = 275 + "px";}
	// else {button.style.top = 50 + "px"}
	// if (true) {button2.style.top = 275 + "px";}
	// else {button2.style.top = 50 + "px"}
}

function rectaMake() {
	rec = board.getContext("2d");
	rec.beginPath();
	rec.rect(rectangl.X1, rectangl.Y1, rectangl.W1, rectangl.H1);
	rec.fillStyle = rectangl.C1;
	if (rectangl.C1 == "purple" || rectangl.C1 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X2, rectangl.Y2, rectangl.W2, rectangl.H2);
	rec.fillStyle = rectangl.C2;
	if (rectangl.C2 == "purple" || rectangl.C2 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X3, rectangl.Y3, rectangl.W3, rectangl.H3);
	rec.fillStyle = rectangl.C3;
	if (rectangl.C3 == "purple" || rectangl.C3 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X4, rectangl.Y4, rectangl.W4, rectangl.H4);
	rec.fillStyle = rectangl.C4;
	if (rectangl.C4 == "purple" || rectangl.C4 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X5, rectangl.Y5, rectangl.W5, rectangl.H5);
	rec.fillStyle = rectangl.C5;
	if (rectangl.C5 == "purple" || rectangl.C5 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X6, rectangl.Y6, rectangl.W6, rectangl.H6);
	rec.fillStyle = rectangl.C6;
	if (rectangl.C6 == "purple" || rectangl.C6 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X7, rectangl.Y7, rectangl.W7, rectangl.H7);
	rec.fillStyle = rectangl.C7;
	if (rectangl.C7 == "purple" || rectangl.C7 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X8, rectangl.Y8, rectangl.W8, rectangl.H8);
	rec.fillStyle = rectangl.C8;
	if (rectangl.C8 == "purple" || rectangl.C8 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X9, rectangl.Y9, rectangl.W9, rectangl.H9);
	rec.fillStyle = rectangl.C9;
	if (rectangl.C9 == "purple" || rectangl.C9 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X10, rectangl.Y10, rectangl.W10, rectangl.H10);
	rec.fillStyle = rectangl.C10;
	if (rectangl.C10 == "purple" || rectangl.C10 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X11, rectangl.Y11, rectangl.W11, rectangl.H11);
	rec.fillStyle = rectangl.C11;
	if (rectangl.C11 == "purple" || rectangl.C11 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X12, rectangl.Y12, rectangl.W12, rectangl.H12);
	rec.fillStyle = rectangl.C12;
	if (rectangl.C12 == "purple" || rectangl.C12 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X13, rectangl.Y13, rectangl.W13, rectangl.H13);
	rec.fillStyle = rectangl.C13;
	if (rectangl.C13 == "purple" || rectangl.C13 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X14, rectangl.Y14, rectangl.W14, rectangl.H14);
	rec.fillStyle = rectangl.C14;
	if (rectangl.C14 == "purple" || rectangl.C14 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
	rec.beginPath();
	rec.rect(rectangl.X15, rectangl.Y15, rectangl.W15, rectangl.H15);
	rec.fillStyle = rectangl.C15;
	if (rectangl.C15 == "purple" || rectangl.C15 == "saddlebrown") {
		if (keyDoor == "open") {}
		else {rec.fill();}
	}
	else {rec.fill();}
}

var makeGame;

function realPause() {
	reset();
	if (gloMode == "make") {pauseResume(false);}
	else {pauseResume("make")}
}

function gameFrame() {
	document.getElementById('rectnumb').style.visibility = "hidden";
	document.getElementById('rectcol').style.visibility = "hidden";
	document.getElementById('code').style.visibility = "hidden";
	document.getElementById('entrcode').style.visibility = "hidden";
	gloMode = "playh";
	board.style.cursor = "default";
	//keypress stuff
	if (keys[37] || keys[65]) {drc += 5}
	if (keys[39] || keys[68]) {drc -= 5}
	if (drc > 360) {drc = 1}
	if (drc < 1) {drc = 360}
	//arrow
	drc180 = 180 - drc + 180
	document.getElementById("arrow").style.visibility = "initial";
	document.getElementById("arrow").style.transform = "rotate(" + drc180 + "deg)";
	//this is a debug for displaying the direction of the circle -> debug.innerHTML = drc;
	//clearing the prev. frame
	crl.clearRect(0, 0, board.width, board.height);
	//moving code
	if (drc >= 0 && drc <= 90) {
		xspd = drc / 9
		yspd = 10 - drc / 9
	}
	if (drc >= 91 && drc <= 180) {
		drc -= 90
		xspd = 10 - drc / 9
		yspd = drc / 9 / -1
		drc += 90
	}
	if (drc >= 181 && drc <= 270) {
		drc -= 180
		xspd = drc / 9 / -1
		yspd = 10 - drc / 9
		yspd /= -1
		drc += 180
	}
	if (drc >= 271 && drc <= 360) {
		drc -= 270
		xspd = 10 - drc / 9
		xspd /= -1
		yspd = drc / 9
		drc += 270
	}
	if (x + xspd > board.width) {xspd = board.width - x}
	if (y + yspd > board.height) {yspd = board.height - y}
	if (x + xspd < 0) {xspd = 0 - x}
	if (y + yspd < 0) {yspd = 0 - y}
	if (x <= board.width && y <= board.height && x > -1  && y > -1) {
		if (xspd > 7.5) {xspd = 7.5}
		if (xspd < -7.5) {xspd = -7.5}
		if (yspd > 7.5) {yspd = 7.5}
		if (yspd < -7.5) {yspd = -7.5}
		if (radius == 10) {xspd /= 2; yspd /= 2;}
		if (gloMode == "playe") {xspd /= 2; yspd /= 2;}
		x += xspd
		y += yspd
	}
	rectaMake();
	collision();
	if (grayTimer > 0) {
		grayTimer--
		if (gloMode == "playh") {
			if (grayTimer > 60) {opacity = 0.5}
			else if (grayTimer % 10 == 5) {opacity = 0.75}
			else if (grayTimer % 10 == 0) {opacity = 0.5}
		}
		else if (gloMode == "playe") {
			if (grayTimer > 120) {opacity = 0.5}
			else if (grayTimer % 20 == 10) {opacity = 0.75}
			else if (grayTimer % 20 == 0) {opacity = 0.5}

		}
	}
	else if (teleportation == false) {opacity = 1.0}
	crl = board.getContext("2d");
	crl.beginPath();
	crl.arc(x, y, radius, 0, 2 * Math.PI);
		crl.fillStyle = "rgba(0, 0, 255, " + opacity + ")";
	crl.fill();
	// if (crcClr == "rgba(255, 140, 000, 1.0)" && board.style.backgroundColor == "rgb(255, 140, 0)") {circlestroke();}
}

var teleportation = false;
var grayTimer = 0;
var radius = 20;
var keyDoor = "closed";

function collision () {
	if (teleportation == false) {
		if (grayTimer == 0) {
			if (rectangl.C1 == "red") {if (x + radius >= rectangl.X1 && x - radius <= rectangl.X1 + rectangl.W1 && y + radius >= rectangl.Y1 && y - radius <= rectangl.Y1 + rectangl.H1) {reset();}}
			if (rectangl.C2 == "red") {if (x + radius >= rectangl.X2 && x - radius <= rectangl.X2 + rectangl.W2 && y + radius >= rectangl.Y2 && y - radius <= rectangl.Y2 + rectangl.H2) {reset();}}
			if (rectangl.C3 == "red") {if (x + radius >= rectangl.X3 && x - radius <= rectangl.X3 + rectangl.W3 && y + radius >= rectangl.Y3 && y - radius <= rectangl.Y3 + rectangl.H3) {reset();}}
			if (rectangl.C4 == "red") {if (x + radius >= rectangl.X4 && x - radius <= rectangl.X4 + rectangl.W4 && y + radius >= rectangl.Y4 && y - radius <= rectangl.Y4 + rectangl.H4) {reset();}}
			if (rectangl.C5 == "red") {if (x + radius >= rectangl.X5 && x - radius <= rectangl.X5 + rectangl.W5 && y + radius >= rectangl.Y5 && y - radius <= rectangl.Y5 + rectangl.H5) {reset();}}
			if (rectangl.C6 == "red") {if (x + radius >= rectangl.X6 && x - radius <= rectangl.X6 + rectangl.W6 && y + radius >= rectangl.Y6 && y - radius <= rectangl.Y6 + rectangl.H6) {reset();}}
			if (rectangl.C7 == "red") {if (x + radius >= rectangl.X7 && x - radius <= rectangl.X7 + rectangl.W7 && y + radius >= rectangl.Y7 && y - radius <= rectangl.Y7 + rectangl.H7) {reset();}}
			if (rectangl.C8 == "red") {if (x + radius >= rectangl.X8 && x - radius <= rectangl.X8 + rectangl.W8 && y + radius >= rectangl.Y8 && y - radius <= rectangl.Y8 + rectangl.H8) {reset();}}
			if (rectangl.C9 == "red") {if (x + radius >= rectangl.X9 && x - radius <= rectangl.X9 + rectangl.W9 && y + radius >= rectangl.Y9 && y - radius <= rectangl.Y9 + rectangl.H9) {reset();}}
			if (rectangl.C10 == "red") {if (x + radius >= rectangl.X10 && x - radius <= rectangl.X10 + rectangl.W10 && y + radius >= rectangl.Y10 && y - radius <= rectangl.Y10 + rectangl.H10) {reset();}}
			if (rectangl.C11 == "red") {if (x + radius >= rectangl.X11 && x - radius <= rectangl.X11 + rectangl.W11 && y + radius >= rectangl.Y11 && y - radius <= rectangl.Y11 + rectangl.H11) {reset();}}
			if (rectangl.C12 == "red") {if (x + radius >= rectangl.X12 && x - radius <= rectangl.X12 + rectangl.W12 && y + radius >= rectangl.Y12 && y - radius <= rectangl.Y12 + rectangl.H12) {reset();}}
			if (rectangl.C13 == "red") {if (x + radius >= rectangl.X13 && x - radius <= rectangl.X13 + rectangl.W13 && y + radius >= rectangl.Y13 && y - radius <= rectangl.Y13 + rectangl.H13) {reset();}}
			if (rectangl.C14 == "red") {if (x + radius >= rectangl.X14 && x - radius <= rectangl.X14 + rectangl.W14 && y + radius >= rectangl.Y14 && y - radius <= rectangl.Y14 + rectangl.H14) {reset();}}
			if (rectangl.C15 == "red") {if (x + radius >= rectangl.X15 && x - radius <= rectangl.X15 + rectangl.W15 && y + radius >= rectangl.Y15 && y - radius <= rectangl.Y15 + rectangl.H15) {reset();}}
		}
		if (rectangl.C1 == "magenta") {if (x + radius >= rectangl.X1 && x - radius <= rectangl.X1 + rectangl.W1 && y + radius >= rectangl.Y1 && y - radius <= rectangl.Y1 + rectangl.H1) {reset();}}
		if (rectangl.C2 == "magenta") {if (x + radius >= rectangl.X2 && x - radius <= rectangl.X2 + rectangl.W2 && y + radius >= rectangl.Y2 && y - radius <= rectangl.Y2 + rectangl.H2) {reset();}}
		if (rectangl.C3 == "magenta") {if (x + radius >= rectangl.X3 && x - radius <= rectangl.X3 + rectangl.W3 && y + radius >= rectangl.Y3 && y - radius <= rectangl.Y3 + rectangl.H3) {reset();}}
		if (rectangl.C4 == "magenta") {if (x + radius >= rectangl.X4 && x - radius <= rectangl.X4 + rectangl.W4 && y + radius >= rectangl.Y4 && y - radius <= rectangl.Y4 + rectangl.H4) {reset();}}
		if (rectangl.C5 == "magenta") {if (x + radius >= rectangl.X5 && x - radius <= rectangl.X5 + rectangl.W5 && y + radius >= rectangl.Y5 && y - radius <= rectangl.Y5 + rectangl.H5) {reset();}}
		if (rectangl.C6 == "magenta") {if (x + radius >= rectangl.X6 && x - radius <= rectangl.X6 + rectangl.W6 && y + radius >= rectangl.Y6 && y - radius <= rectangl.Y6 + rectangl.H6) {reset();}}
		if (rectangl.C7 == "magenta") {if (x + radius >= rectangl.X7 && x - radius <= rectangl.X7 + rectangl.W7 && y + radius >= rectangl.Y7 && y - radius <= rectangl.Y7 + rectangl.H7) {reset();}}
		if (rectangl.C8 == "magenta") {if (x + radius >= rectangl.X8 && x - radius <= rectangl.X8 + rectangl.W8 && y + radius >= rectangl.Y8 && y - radius <= rectangl.Y8 + rectangl.H8) {reset();}}
		if (rectangl.C9 == "magenta") {if (x + radius >= rectangl.X9 && x - radius <= rectangl.X9 + rectangl.W9 && y + radius >= rectangl.Y9 && y - radius <= rectangl.Y9 + rectangl.H9) {reset();}}
		if (rectangl.C10 == "magenta") {if (x + radius >= rectangl.X10 && x - radius <= rectangl.X10 + rectangl.W10 && y + radius >= rectangl.Y10 && y - radius <= rectangl.Y10 + rectangl.H10) {reset();}}
		if (rectangl.C11 == "magenta") {if (x + radius >= rectangl.X11 && x - radius <= rectangl.X11 + rectangl.W11 && y + radius >= rectangl.Y11 && y - radius <= rectangl.Y11 + rectangl.H11) {reset();}}
		if (rectangl.C12 == "magenta") {if (x + radius >= rectangl.X12 && x - radius <= rectangl.X12 + rectangl.W12 && y + radius >= rectangl.Y12 && y - radius <= rectangl.Y12 + rectangl.H12) {reset();}}
		if (rectangl.C13 == "magenta") {if (x + radius >= rectangl.X13 && x - radius <= rectangl.X13 + rectangl.W13 && y + radius >= rectangl.Y13 && y - radius <= rectangl.Y13 + rectangl.H13) {reset();}}
		if (rectangl.C14 == "magenta") {if (x + radius >= rectangl.X14 && x - radius <= rectangl.X14 + rectangl.W14 && y + radius >= rectangl.Y14 && y - radius <= rectangl.Y14 + rectangl.H14) {reset();}}
		if (rectangl.C15 == "magenta") {if (x + radius >= rectangl.X15 && x - radius <= rectangl.X15 + rectangl.W15 && y + radius >= rectangl.Y15 && y - radius <= rectangl.Y15 + rectangl.H15) {reset();}}
		if (rectangl.C1 == "lime") {if (x + radius >= rectangl.X1 && x - radius <= rectangl.X1 + rectangl.W1 && y + radius >= rectangl.Y1 && y - radius <= rectangl.Y1 + rectangl.H1) {reset("l"); grayTimer = 0; nextLevel();}}
		if (rectangl.C2 == "lime") {if (x + radius >= rectangl.X2 && x - radius <= rectangl.X2 + rectangl.W2 && y + radius >= rectangl.Y2 && y - radius <= rectangl.Y2 + rectangl.H2) {reset("l"); grayTimer = 0; nextLevel();}}
		if (rectangl.C3 == "lime") {if (x + radius >= rectangl.X3 && x - radius <= rectangl.X3 + rectangl.W3 && y + radius >= rectangl.Y3 && y - radius <= rectangl.Y3 + rectangl.H3) {reset("l"); grayTimer = 0; nextLevel();}}
		if (rectangl.C4 == "lime") {if (x + radius >= rectangl.X4 && x - radius <= rectangl.X4 + rectangl.W4 && y + radius >= rectangl.Y4 && y - radius <= rectangl.Y4 + rectangl.H4) {reset("l"); grayTimer = 0; nextLevel();}}
		if (rectangl.C5 == "lime") {if (x + radius >= rectangl.X5 && x - radius <= rectangl.X5 + rectangl.W5 && y + radius >= rectangl.Y5 && y - radius <= rectangl.Y5 + rectangl.H5) {reset("l"); grayTimer = 0; nextLevel();}}
		if (rectangl.C6 == "lime") {if (x + radius >= rectangl.X6 && x - radius <= rectangl.X6 + rectangl.W6 && y + radius >= rectangl.Y6 && y - radius <= rectangl.Y6 + rectangl.H6) {reset("l"); grayTimer = 0; nextLevel();}}
		if (rectangl.C7 == "lime") {if (x + radius >= rectangl.X7 && x - radius <= rectangl.X7 + rectangl.W7 && y + radius >= rectangl.Y7 && y - radius <= rectangl.Y7 + rectangl.H7) {reset("l"); grayTimer = 0; nextLevel();}}
		if (rectangl.C8 == "lime") {if (x + radius >= rectangl.X8 && x - radius <= rectangl.X8 + rectangl.W8 && y + radius >= rectangl.Y8 && y - radius <= rectangl.Y8 + rectangl.H8) {reset("l"); grayTimer = 0; nextLevel();}}
		if (rectangl.C9 == "lime") {if (x + radius >= rectangl.X9 && x - radius <= rectangl.X9 + rectangl.W9 && y + radius >= rectangl.Y9 && y - radius <= rectangl.Y9 + rectangl.H9) {reset("l"); grayTimer = 0; nextLevel();}}
		if (rectangl.C10 == "lime") {if (x + radius >= rectangl.X10 && x - radius <= rectangl.X10 + rectangl.W10 && y + radius >= rectangl.Y10 && y - radius <= rectangl.Y10 + rectangl.H10) {reset(); grayTimer = 0; nextLevel();}}
		if (rectangl.C11 == "lime") {if (x + radius >= rectangl.X11 && x - radius <= rectangl.X11 + rectangl.W11 && y + radius >= rectangl.Y11 && y - radius <= rectangl.Y11 + rectangl.H11) {reset(); grayTimer = 0; nextLevel();}}
		if (rectangl.C12 == "lime") {if (x + radius >= rectangl.X12 && x - radius <= rectangl.X12 + rectangl.W12 && y + radius >= rectangl.Y12 && y - radius <= rectangl.Y12 + rectangl.H12) {reset(); grayTimer = 0; nextLevel();}}
		if (rectangl.C13 == "lime") {if (x + radius >= rectangl.X13 && x - radius <= rectangl.X13 + rectangl.W13 && y + radius >= rectangl.Y13 && y - radius <= rectangl.Y13 + rectangl.H13) {reset(); grayTimer = 0; nextLevel();}}
		if (rectangl.C14 == "lime") {if (x + radius >= rectangl.X14 && x - radius <= rectangl.X14 + rectangl.W14 && y + radius >= rectangl.Y14 && y - radius <= rectangl.Y14 + rectangl.H14) {reset(); grayTimer = 0; nextLevel();}}
		if (rectangl.C15 == "lime") {if (x + radius >= rectangl.X15 && x - radius <= rectangl.X15 + rectangl.W15 && y + radius >= rectangl.Y15 && y - radius <= rectangl.Y15 + rectangl.H15) {reset(); grayTimer = 0; nextLevel();}}
		if (rectangl.C1 == "yellow") {if (x + radius >= rectangl.X1 && x - radius <= rectangl.X1 + rectangl.W1 && y + radius >= rectangl.Y1 && y - radius <= rectangl.Y1 + rectangl.H1) {radius = 10;circlestroke();}}
		if (rectangl.C2 == "yellow") {if (x + radius >= rectangl.X2 && x - radius <= rectangl.X2 + rectangl.W2 && y + radius >= rectangl.Y2 && y - radius <= rectangl.Y2 + rectangl.H2) {radius = 10;circlestroke();}}
		if (rectangl.C3 == "yellow") {if (x + radius >= rectangl.X3 && x - radius <= rectangl.X3 + rectangl.W3 && y + radius >= rectangl.Y3 && y - radius <= rectangl.Y3 + rectangl.H3) {radius = 10;circlestroke();}}
		if (rectangl.C4 == "yellow") {if (x + radius >= rectangl.X4 && x - radius <= rectangl.X4 + rectangl.W4 && y + radius >= rectangl.Y4 && y - radius <= rectangl.Y4 + rectangl.H4) {radius = 10;circlestroke();}}
		if (rectangl.C5 == "yellow") {if (x + radius >= rectangl.X5 && x - radius <= rectangl.X5 + rectangl.W5 && y + radius >= rectangl.Y5 && y - radius <= rectangl.Y5 + rectangl.H5) {radius = 10;circlestroke();}}
		if (rectangl.C6 == "yellow") {if (x + radius >= rectangl.X6 && x - radius <= rectangl.X6 + rectangl.W6 && y + radius >= rectangl.Y6 && y - radius <= rectangl.Y6 + rectangl.H6) {radius = 10;circlestroke();}}
		if (rectangl.C7 == "yellow") {if (x + radius >= rectangl.X7 && x - radius <= rectangl.X7 + rectangl.W7 && y + radius >= rectangl.Y7 && y - radius <= rectangl.Y7 + rectangl.H7) {radius = 10;circlestroke();}}
		if (rectangl.C8 == "yellow") {if (x + radius >= rectangl.X8 && x - radius <= rectangl.X8 + rectangl.W8 && y + radius >= rectangl.Y8 && y - radius <= rectangl.Y8 + rectangl.H8) {radius = 10;circlestroke();}}
		if (rectangl.C9 == "yellow") {if (x + radius >= rectangl.X9 && x - radius <= rectangl.X9 + rectangl.W9 && y + radius >= rectangl.Y9 && y - radius <= rectangl.Y9 + rectangl.H9) {radius = 10;circlestroke();}}
		if (rectangl.C10 == "yellow") {if (x + radius >= rectangl.X10 && x - radius <= rectangl.X10 + rectangl.W10 && y + radius >= rectangl.Y10 && y - radius <= rectangl.Y10 + rectangl.H10) {radius = 10;circlestroke();}}
		if (rectangl.C11 == "yellow") {if (x + radius >= rectangl.X11 && x - radius <= rectangl.X11 + rectangl.W11 && y + radius >= rectangl.Y11 && y - radius <= rectangl.Y11 + rectangl.H11) {radius = 10;circlestroke();}}
		if (rectangl.C12 == "yellow") {if (x + radius >= rectangl.X12 && x - radius <= rectangl.X12 + rectangl.W12 && y + radius >= rectangl.Y12 && y - radius <= rectangl.Y12 + rectangl.H12) {radius = 10;circlestroke();}}
		if (rectangl.C13 == "yellow") {if (x + radius >= rectangl.X13 && x - radius <= rectangl.X13 + rectangl.W13 && y + radius >= rectangl.Y13 && y - radius <= rectangl.Y13 + rectangl.H13) {radius = 10;circlestroke();}}
		if (rectangl.C14 == "yellow") {if (x + radius >= rectangl.X14 && x - radius <= rectangl.X14 + rectangl.W14 && y + radius >= rectangl.Y14 && y - radius <= rectangl.Y14 + rectangl.H14) {radius = 10;circlestroke();}}
		if (rectangl.C15 == "yellow") {if (x + radius >= rectangl.X15 && x - radius <= rectangl.X15 + rectangl.W15 && y + radius >= rectangl.Y15 && y - radius <= rectangl.Y15 + rectangl.H15) {radius = 10;circlestroke();}}
		if (rectangl.C1 == "aqua") {if (x + radius >= rectangl.X1 && x - radius <= rectangl.X1 + rectangl.W1 && y + radius >= rectangl.Y1 && y - radius <= rectangl.Y1 + rectangl.H1) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C2 == "aqua") {if (x + radius >= rectangl.X2 && x - radius <= rectangl.X2 + rectangl.W2 && y + radius >= rectangl.Y2 && y - radius <= rectangl.Y2 + rectangl.H2) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C3 == "aqua") {if (x + radius >= rectangl.X3 && x - radius <= rectangl.X3 + rectangl.W3 && y + radius >= rectangl.Y3 && y - radius <= rectangl.Y3 + rectangl.H3) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C4 == "aqua") {if (x + radius >= rectangl.X4 && x - radius <= rectangl.X4 + rectangl.W4 && y + radius >= rectangl.Y4 && y - radius <= rectangl.Y4 + rectangl.H4) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C5 == "aqua") {if (x + radius >= rectangl.X5 && x - radius <= rectangl.X5 + rectangl.W5 && y + radius >= rectangl.Y5 && y - radius <= rectangl.Y5 + rectangl.H5) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C6 == "aqua") {if (x + radius >= rectangl.X6 && x - radius <= rectangl.X6 + rectangl.W6 && y + radius >= rectangl.Y6 && y - radius <= rectangl.Y6 + rectangl.H6) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C7 == "aqua") {if (x + radius >= rectangl.X7 && x - radius <= rectangl.X7 + rectangl.W7 && y + radius >= rectangl.Y7 && y - radius <= rectangl.Y7 + rectangl.H7) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C8 == "aqua") {if (x + radius >= rectangl.X8 && x - radius <= rectangl.X8 + rectangl.W8 && y + radius >= rectangl.Y8 && y - radius <= rectangl.Y8 + rectangl.H8) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C9 == "aqua") {if (x + radius >= rectangl.X9 && x - radius <= rectangl.X9 + rectangl.W9 && y + radius >= rectangl.Y9 && y - radius <= rectangl.Y9 + rectangl.H9) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C10 == "aqua") {if (x + radius >= rectangl.X10 && x - radius <= rectangl.X10 + rectangl.W10 && y + radius >= rectangl.Y10 && y - radius <= rectangl.Y10 + rectangl.H10) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C11 == "aqua") {if (x + radius >= rectangl.X11 && x - radius <= rectangl.X11 + rectangl.W11 && y + radius >= rectangl.Y11 && y - radius <= rectangl.Y11 + rectangl.H11) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C12 == "aqua") {if (x + radius >= rectangl.X12 && x - radius <= rectangl.X12 + rectangl.W12 && y + radius >= rectangl.Y12 && y - radius <= rectangl.Y12 + rectangl.H12) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C13 == "aqua") {if (x + radius >= rectangl.X13 && x - radius <= rectangl.X13 + rectangl.W13 && y + radius >= rectangl.Y13 && y - radius <= rectangl.Y13 + rectangl.H13) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C14 == "aqua") {if (x + radius >= rectangl.X14 && x - radius <= rectangl.X14 + rectangl.W14 && y + radius >= rectangl.Y14 && y - radius <= rectangl.Y14 + rectangl.H14) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C15 == "aqua") {if (x + radius >= rectangl.X15 && x - radius <= rectangl.X15 + rectangl.W15 && y + radius >= rectangl.Y15 && y - radius <= rectangl.Y15 + rectangl.H15) {teleportation = true; circlestroke(); grayTimer = 0; opacity = 0.5;}}
		if (rectangl.C1 == "lightgray") {if (x + radius >= rectangl.X1 && x - radius <= rectangl.X1 + rectangl.W1 && y + radius >= rectangl.Y1 && y - radius <= rectangl.Y1 + rectangl.H1) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C2 == "lightgray") {if (x + radius >= rectangl.X2 && x - radius <= rectangl.X2 + rectangl.W2 && y + radius >= rectangl.Y2 && y - radius <= rectangl.Y2 + rectangl.H2) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C3 == "lightgray") {if (x + radius >= rectangl.X3 && x - radius <= rectangl.X3 + rectangl.W3 && y + radius >= rectangl.Y3 && y - radius <= rectangl.Y3 + rectangl.H3) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C4 == "lightgray") {if (x + radius >= rectangl.X4 && x - radius <= rectangl.X4 + rectangl.W4 && y + radius >= rectangl.Y4 && y - radius <= rectangl.Y4 + rectangl.H4) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C5 == "lightgray") {if (x + radius >= rectangl.X5 && x - radius <= rectangl.X5 + rectangl.W5 && y + radius >= rectangl.Y5 && y - radius <= rectangl.Y5 + rectangl.H5) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C6 == "lightgray") {if (x + radius >= rectangl.X6 && x - radius <= rectangl.X6 + rectangl.W6 && y + radius >= rectangl.Y6 && y - radius <= rectangl.Y6 + rectangl.H6) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C7 == "lightgray") {if (x + radius >= rectangl.X7 && x - radius <= rectangl.X7 + rectangl.W7 && y + radius >= rectangl.Y7 && y - radius <= rectangl.Y7 + rectangl.H7) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C8 == "lightgray") {if (x + radius >= rectangl.X8 && x - radius <= rectangl.X8 + rectangl.W8 && y + radius >= rectangl.Y8 && y - radius <= rectangl.Y8 + rectangl.H8) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C9 == "lightgray") {if (x + radius >= rectangl.X9 && x - radius <= rectangl.X9 + rectangl.W9 && y + radius >= rectangl.Y9 && y - radius <= rectangl.Y9 + rectangl.H9) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C10 == "lightgray") {if (x + radius >= rectangl.X10 && x - radius <= rectangl.X10 + rectangl.W10 && y + radius >= rectangl.Y10 && y - radius <= rectangl.Y10 + rectangl.H10) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C11 == "lightgray") {if (x + radius >= rectangl.X11 && x - radius <= rectangl.X11 + rectangl.W11 && y + radius >= rectangl.Y11 && y - radius <= rectangl.Y11 + rectangl.H11) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C12 == "lightgray") {if (x + radius >= rectangl.X12 && x - radius <= rectangl.X12 + rectangl.W12 && y + radius >= rectangl.Y12 && y - radius <= rectangl.Y12 + rectangl.H12) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C13 == "lightgray") {if (x + radius >= rectangl.X13 && x - radius <= rectangl.X13 + rectangl.W13 && y + radius >= rectangl.Y13 && y - radius <= rectangl.Y13 + rectangl.H13) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C14 == "lightgray") {if (x + radius >= rectangl.X14 && x - radius <= rectangl.X14 + rectangl.W14 && y + radius >= rectangl.Y14 && y - radius <= rectangl.Y14 + rectangl.H14) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C15 == "lightgray") {if (x + radius >= rectangl.X15 && x - radius <= rectangl.X15 + rectangl.W15 && y + radius >= rectangl.Y15 && y - radius <= rectangl.Y15 + rectangl.H15) {grayTimer = 120; if (gloMode == "playe") {grayTimer *= 2}}}
		if (rectangl.C1 == "purple") {if (x + radius >= rectangl.X1 && x - radius <= rectangl.X1 + rectangl.W1 && y + radius >= rectangl.Y1 && y - radius <= rectangl.Y1 + rectangl.H1) {keyDoor = "open"}}
		if (rectangl.C2 == "purple") {if (x + radius >= rectangl.X2 && x - radius <= rectangl.X2 + rectangl.W2 && y + radius >= rectangl.Y2 && y - radius <= rectangl.Y2 + rectangl.H2) {keyDoor = "open"}}
		if (rectangl.C3 == "purple") {if (x + radius >= rectangl.X3 && x - radius <= rectangl.X3 + rectangl.W3 && y + radius >= rectangl.Y3 && y - radius <= rectangl.Y3 + rectangl.H3) {keyDoor = "open"}}
		if (rectangl.C4 == "purple") {if (x + radius >= rectangl.X4 && x - radius <= rectangl.X4 + rectangl.W4 && y + radius >= rectangl.Y4 && y - radius <= rectangl.Y4 + rectangl.H4) {keyDoor = "open"}}
		if (rectangl.C5 == "purple") {if (x + radius >= rectangl.X5 && x - radius <= rectangl.X5 + rectangl.W5 && y + radius >= rectangl.Y5 && y - radius <= rectangl.Y5 + rectangl.H5) {keyDoor = "open"}}
		if (rectangl.C6 == "purple") {if (x + radius >= rectangl.X6 && x - radius <= rectangl.X6 + rectangl.W6 && y + radius >= rectangl.Y6 && y - radius <= rectangl.Y6 + rectangl.H6) {keyDoor = "open"}}
		if (rectangl.C7 == "purple") {if (x + radius >= rectangl.X7 && x - radius <= rectangl.X7 + rectangl.W7 && y + radius >= rectangl.Y7 && y - radius <= rectangl.Y7 + rectangl.H7) {keyDoor = "open"}}
		if (rectangl.C8 == "purple") {if (x + radius >= rectangl.X8 && x - radius <= rectangl.X8 + rectangl.W8 && y + radius >= rectangl.Y8 && y - radius <= rectangl.Y8 + rectangl.H8) {keyDoor = "open"}}
		if (rectangl.C9 == "purple") {if (x + radius >= rectangl.X9 && x - radius <= rectangl.X9 + rectangl.W9 && y + radius >= rectangl.Y9 && y - radius <= rectangl.Y9 + rectangl.H9) {keyDoor = "open"}}
		if (rectangl.C10 == "purple") {if (x + radius >= rectangl.X10 && x - radius <= rectangl.X10 + rectangl.W10 && y + radius >= rectangl.Y10 && y - radius <= rectangl.Y10 + rectangl.H10) {keyDoor = "open"}}
		if (rectangl.C11 == "purple") {if (x + radius >= rectangl.X11 && x - radius <= rectangl.X11 + rectangl.W11 && y + radius >= rectangl.Y11 && y - radius <= rectangl.Y11 + rectangl.H11) {keyDoor = "open"}}
		if (rectangl.C12 == "purple") {if (x + radius >= rectangl.X12 && x - radius <= rectangl.X12 + rectangl.W12 && y + radius >= rectangl.Y12 && y - radius <= rectangl.Y12 + rectangl.H12) {keyDoor = "open"}}
		if (rectangl.C13 == "purple") {if (x + radius >= rectangl.X13 && x - radius <= rectangl.X13 + rectangl.W13 && y + radius >= rectangl.Y13 && y - radius <= rectangl.Y13 + rectangl.H13) {keyDoor = "open"}}
		if (rectangl.C14 == "purple") {if (x + radius >= rectangl.X14 && x - radius <= rectangl.X14 + rectangl.W14 && y + radius >= rectangl.Y14 && y - radius <= rectangl.Y14 + rectangl.H14) {keyDoor = "open"}}
		if (rectangl.C15 == "purple") {if (x + radius >= rectangl.X15 && x - radius <= rectangl.X15 + rectangl.W15 && y + radius >= rectangl.Y15 && y - radius <= rectangl.Y15 + rectangl.H15) {keyDoor = "open"}}
		if (rectangl.C1 == "saddlebrown") {if (x + radius >= rectangl.X1 && x - radius <= rectangl.X1 + rectangl.W1 && y + radius >= rectangl.Y1 && y - radius <= rectangl.Y1 + rectangl.H1) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C2 == "saddlebrown") {if (x + radius >= rectangl.X2 && x - radius <= rectangl.X2 + rectangl.W2 && y + radius >= rectangl.Y2 && y - radius <= rectangl.Y2 + rectangl.H2) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C3 == "saddlebrown") {if (x + radius >= rectangl.X3 && x - radius <= rectangl.X3 + rectangl.W3 && y + radius >= rectangl.Y3 && y - radius <= rectangl.Y3 + rectangl.H3) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C4 == "saddlebrown") {if (x + radius >= rectangl.X4 && x - radius <= rectangl.X4 + rectangl.W4 && y + radius >= rectangl.Y4 && y - radius <= rectangl.Y4 + rectangl.H4) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C5 == "saddlebrown") {if (x + radius >= rectangl.X5 && x - radius <= rectangl.X5 + rectangl.W5 && y + radius >= rectangl.Y5 && y - radius <= rectangl.Y5 + rectangl.H5) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C6 == "saddlebrown") {if (x + radius >= rectangl.X6 && x - radius <= rectangl.X6 + rectangl.W6 && y + radius >= rectangl.Y6 && y - radius <= rectangl.Y6 + rectangl.H6) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C7 == "saddlebrown") {if (x + radius >= rectangl.X7 && x - radius <= rectangl.X7 + rectangl.W7 && y + radius >= rectangl.Y7 && y - radius <= rectangl.Y7 + rectangl.H7) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C8 == "saddlebrown") {if (x + radius >= rectangl.X8 && x - radius <= rectangl.X8 + rectangl.W8 && y + radius >= rectangl.Y8 && y - radius <= rectangl.Y8 + rectangl.H8) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C9 == "saddlebrown") {if (x + radius >= rectangl.X9 && x - radius <= rectangl.X9 + rectangl.W9 && y + radius >= rectangl.Y9 && y - radius <= rectangl.Y9 + rectangl.H9) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C10 == "saddlebrown") {if (x + radius >= rectangl.X10 && x - radius <= rectangl.X10 + rectangl.W10 && y + radius >= rectangl.Y10 && y - radius <= rectangl.Y10 + rectangl.H10) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C11 == "saddlebrown") {if (x + radius >= rectangl.X11 && x - radius <= rectangl.X11 + rectangl.W11 && y + radius >= rectangl.Y11 && y - radius <= rectangl.Y11 + rectangl.H11) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C12 == "saddlebrown") {if (x + radius >= rectangl.X12 && x - radius <= rectangl.X12 + rectangl.W12 && y + radius >= rectangl.Y12 && y - radius <= rectangl.Y12 + rectangl.H12) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C13 == "saddlebrown") {if (x + radius >= rectangl.X13 && x - radius <= rectangl.X13 + rectangl.W13 && y + radius >= rectangl.Y13 && y - radius <= rectangl.Y13 + rectangl.H13) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C14 == "saddlebrown") {if (x + radius >= rectangl.X14 && x - radius <= rectangl.X14 + rectangl.W14 && y + radius >= rectangl.Y14 && y - radius <= rectangl.Y14 + rectangl.H14) {if (keyDoor == "closed") {reset();}}}
		if (rectangl.C15 == "saddlebrown") {if (x + radius >= rectangl.X15 && x - radius <= rectangl.X15 + rectangl.W15 && y + radius >= rectangl.Y15 && y - radius <= rectangl.Y15 + rectangl.H15) {if (keyDoor == "closed") {reset();}}}
	}
	if (teleportation == true) {
		if (rectangl.C1 == "darkblue") {if (x + radius >= rectangl.X1 && x - radius <= rectangl.X1 + rectangl.W1 && y + radius >= rectangl.Y1 && y - radius <= rectangl.Y1 + rectangl.H1) {teleportation = false; x = rectangl.X1 + rectangl.W1 / 2; y = rectangl.Y1 + rectangl.H1 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C2 == "darkblue") {if (x + radius >= rectangl.X2 && x - radius <= rectangl.X2 + rectangl.W2 && y + radius >= rectangl.Y2 && y - radius <= rectangl.Y2 + rectangl.H2) {teleportation = false; x = rectangl.X2 + rectangl.W2 / 2; y = rectangl.Y2 + rectangl.H2 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C3 == "darkblue") {if (x + radius >= rectangl.X3 && x - radius <= rectangl.X3 + rectangl.W3 && y + radius >= rectangl.Y3 && y - radius <= rectangl.Y3 + rectangl.H3) {teleportation = false; x = rectangl.X3 + rectangl.W3 / 2; y = rectangl.Y3 + rectangl.H3 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C4 == "darkblue") {if (x + radius >= rectangl.X4 && x - radius <= rectangl.X4 + rectangl.W4 && y + radius >= rectangl.Y4 && y - radius <= rectangl.Y4 + rectangl.H4) {teleportation = false; x = rectangl.X4 + rectangl.W4 / 2; y = rectangl.Y4 + rectangl.H4 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C5 == "darkblue") {if (x + radius >= rectangl.X5 && x - radius <= rectangl.X5 + rectangl.W5 && y + radius >= rectangl.Y5 && y - radius <= rectangl.Y5 + rectangl.H5) {teleportation = false; x = rectangl.X5 + rectangl.W5 / 2; y = rectangl.Y5 + rectangl.H5 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C6 == "darkblue") {if (x + radius >= rectangl.X6 && x - radius <= rectangl.X6 + rectangl.W6 && y + radius >= rectangl.Y6 && y - radius <= rectangl.Y6 + rectangl.H6) {teleportation = false; x = rectangl.X6 + rectangl.W6 / 2; y = rectangl.Y6 + rectangl.H6 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C7 == "darkblue") {if (x + radius >= rectangl.X7 && x - radius <= rectangl.X7 + rectangl.W7 && y + radius >= rectangl.Y7 && y - radius <= rectangl.Y7 + rectangl.H7) {teleportation = false; x = rectangl.X7 + rectangl.W7 / 2; y = rectangl.Y7 + rectangl.H7 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C8 == "darkblue") {if (x + radius >= rectangl.X8 && x - radius <= rectangl.X8 + rectangl.W8 && y + radius >= rectangl.Y8 && y - radius <= rectangl.Y8 + rectangl.H8) {teleportation = false; x = rectangl.X8 + rectangl.W8 / 2; y = rectangl.Y8 + rectangl.H8 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C9 == "darkblue") {if (x + radius >= rectangl.X9 && x - radius <= rectangl.X9 + rectangl.W9 && y + radius >= rectangl.Y9 && y - radius <= rectangl.Y9 + rectangl.H9) {teleportation = false; x = rectangl.X9 + rectangl.W9 / 2; y = rectangl.Y9 + rectangl.H9 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C10 == "darkblue") {if (x + radius >= rectangl.X10 && x - radius <= rectangl.X10 + rectangl.W10 && y + radius >= rectangl.Y10 && y - radius <= rectangl.Y10 + rectangl.H10) {teleportation = false; x = rectangl.X10 + rectangl.W10 / 2; y = rectangl.Y10 + rectangl.H10 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C11 == "darkblue") {if (x + radius >= rectangl.X11 && x - radius <= rectangl.X11 + rectangl.W11 && y + radius >= rectangl.Y11 && y - radius <= rectangl.Y11 + rectangl.H11) {teleportation = false; x = rectangl.X11 + rectangl.W11 / 2; y = rectangl.Y11 + rectangl.H11 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C12 == "darkblue") {if (x + radius >= rectangl.X12 && x - radius <= rectangl.X12 + rectangl.W12 && y + radius >= rectangl.Y12 && y - radius <= rectangl.Y12 + rectangl.H12) {teleportation = false; x = rectangl.X12 + rectangl.W12 / 2; y = rectangl.Y12 + rectangl.H12 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C13 == "darkblue") {if (x + radius >= rectangl.X13 && x - radius <= rectangl.X13 + rectangl.W13 && y + radius >= rectangl.Y13 && y - radius <= rectangl.Y13 + rectangl.H13) {teleportation = false; x = rectangl.X13 + rectangl.W13 / 2; y = rectangl.Y13 + rectangl.H13 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C14 == "darkblue") {if (x + radius >= rectangl.X14 && x - radius <= rectangl.X14 + rectangl.W14 && y + radius >= rectangl.Y14 && y - radius <= rectangl.Y14 + rectangl.H14) {teleportation = false; x = rectangl.X14 + rectangl.W14 / 2; y = rectangl.Y14 + rectangl.H14 / 2; circlestroke(); opacity = 1.0;}}
		if (rectangl.C15 == "darkblue") {if (x + radius >= rectangl.X15 && x - radius <= rectangl.X15 + rectangl.W15 && y + radius >= rectangl.Y15 && y - radius <= rectangl.Y15 + rectangl.H15) {teleportation = false; x = rectangl.X15 + rectangl.W15 / 2; y = rectangl.Y15 + rectangl.H15 / 2; circlestroke(); opacity = 1.0;}}
	}
}

function nextLevel() {
	keyDoor = "closed"
	grayTimer = 0;
	teleportation = false;
	opacity = 1.0;
	//document.getElementById("debugSlide").value++
	realPause();
}

var	keyDoor = "closed"

function reset(touch) {
	x = 100;
	y = board.height - 100;
	drc = 135;
	radius = 20;
	keyDoor = "closed"
	grayTimer = 0;
	teleportation = false;
	opacity = 1.0;
}
function circlestroke() {
	crl.beginPath();
	crl.arc(x, y, radius, 0, 2 * Math.PI);
	if (opacity == 1.0) {crl.strokeStyle = "black";}
	else {crl.strokeStyle = "rgba(0, 0, 0, 0.5)"}
	crl.lineWidth = 1;
	crl.stroke();
}