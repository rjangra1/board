var backgrounds = ["2.jpg"
,"4.jpg"
,"abstract-6704211_1920.jpg"
,"angel-3740393_1920.jpg"
,"pexels-alexander-grey-1148998.jpg"
,"pexels-hamad-bajwa-755858.jpg"
,"pexels-leah-newhouse-2090652.jpg"
,"pexels-steve-johnson-1000366.jpg"
,"pexels-steve-johnson-1061778.jpg"
,"pexels-steve-johnson-1266808.jpg"
,"pexels-steve-johnson-1286632.jpg"
,"pexels-steve-johnson-1532704.jpg"
,"pexels-steve-johnson-1550564.jpg"
,"pexels-steve-johnson-1704119.jpg"
,"pexels-steve-johnson-1789968.jpg"
,"pexels-suzy-hazelwood-1629236.jpg"
,"s1.jpg"
,"s2.jpg"
,"woman-2196323_1920.jpg"];
var nextImage=0;
var bgDiv = document.getElementById("background");
var backDrop = document.getElementById("back-drop");

var div1 = createDiv('div1');
var div2 = createDiv('div2');

bgDiv.appendChild(div1);
bgDiv.appendChild(div2);
setOpacity();

function createDiv(id) {
	var div = document.createElement('div');
	div.id = id;
	div.className = "backgroundImageDiv";
	return div;
}

function setOpacity() {
	div1.style.opacity = '1';
	div2.style.opacity = '0';
}

function swapDivs() {
	var temp = div1;
	div1 = div2;
	div2 = temp;
}

function setImage(path, callback) {
	var image = new Image();
	image.onload = function() {
		swapDivs();
		div1.classList.add("trans-1");
		div1.style.backgroundSize = getBackGroundSize(image, div1);
		div1.style.backgroundImage = "url('"+ path +"')";
		setOpacity();
		
		if(typeof callback==='function') {
			callback();
		}
	};
	image.src = path;
}

function changeBackGround() {
	nextImage = getRandomInt(backgrounds.length-1);
	if(backgrounds[nextImage]==undefined) {nextImage=0;}
	setImage('./Images/'+backgrounds[nextImage], function() {
		//backDrop.style.backgroundImage = "url('"+ './Images/'+backgrounds[nextImage] +"')";
	});
}

var bgInterval = setTimeout(cycleBackground, 10500);

function cycleBackground(){
	changeBackGround();
	clearTimeout(bgInterval);
	bgInterval = setTimeout(cycleBackground, 10500);
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getBackGroundSize(img, div) {	
		var val = (this.wDim().h > this.iDim(img).h && this.wDim().w > this.iDim(img).w) ? "" : "cover";
		val = (val=="") ? (this.iDim(img).h > this.wDim().h || this.iDim(img).w > this.wDim().w ? '100%' : val) : val;
		val = (this.wDim().h > this.wDim().w) ? "auto 100%" : val;
		return val;
}

function wDiv(div) {
	return {w: div.getBoundingClientRect().width, h: div.getBoundingClientRect().height};
}

function wDim() {
	return {w: window.innerWidth, h: window.innerHeight};
}

function iDim(img) {
	return {w: img.naturalWidth, h: img.naturalHeight};
}

function imageOrientation(img) {

	if (img.naturalWidth > img.naturalHeight) {
		return 'l';
	} else if (img.naturalWidth < img.naturalHeight) {
		return 'p';
	} else {
		return 'e';
	}

	return orientation;
}

changeBackGround();