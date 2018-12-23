import Particle from '@/js/Particle'
import Firework from '@/js/Firework'

const HANDS_THRESHOLD = 50
const MAX_SNOW_NUM = 250;
let p5;
let angle;
let speed;
let particleBack;
let particleFront;
let snowNum = 500;
let human;
let humanPos;
let frontImage;
let fireworks = [];
let bgImg;
let whiteBgImg;



export function mainCanvas(_p5) {
	
	p5 = _p5

	p5.preload = _ => {
		// NOTE: staticフォルダから参照
		human = p5.loadImage('img/human.png');
		frontImage = p5.loadImage('img/front.png')
		bgImg = p5.loadImage('img/background.png')
		whiteBgImg = p5.loadImage('img/white.png')
	}

	p5.keyPressed = (keyCode) => {
	}

	p5.setup = _ => {
		// NOTE: キャンバスを親要素のキャンバス内に配置するようにする
		// http://p5aholic.hatenablog.com/entry/2015/05/16/163251
		var canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
		canvas.parent("p5Canvas");
		// p5.createCanvas(width, height)
		p5.background(60, 46, 64, 0)

		angle = 0;
		speed = 0.5;
		particleFront = [];
		particleBack = []

		humanPos = p5.createVector(0, p5.height / 2);

		// for (var i = 0; i < MAX_SNOW_NUM / 2; i++) {
		// 	addSnow(particleBack);
		// 	// addSnow(particleFront);
		// }

		p5.stroke(255);
		p5.strokeWeight(4);
	}

	p5.draw = _ => {
		p5.clear();
		p5.colorMode(p5.RGB);
		p5.image(bgImg, 0, 0, p5.width, p5.height);
		// p5.image(whiteBgImg, 0, 0, p5.width, p5.height);
		drawSnow(particleBack);
		p5.image(human, humanPos.x, humanPos.y);

		p5.colorMode(p5.RGB);
		drawParticle(particleFront);
		p5.image(frontImage, 0, 0, p5.width, p5.height);
		drawFireworks()

		updatePosition();
		
	}
}  

function addSnow(store) {
	if (store.length > MAX_SNOW_NUM) {
		return
	}

	var p = new Particle(p5);
	p.size = p5.random(10, 20);
	p.x = p5.random(0, p5.width);
	p.y = -p.size;
	p.speedY = p5.random(1, 5);
	p.amplitude = p5.random(0.1, 2);
	p.wavingSpeed = p5.random(0.1, 4);
	p.angle = 0;	
	p.rotateSpeed = p5.random(-6, 6);

	store.push(p)
}

function drawFireworks() {		
	for (var i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].update();
		fireworks[i].show();
		
		if (fireworks[i].done()) {
			fireworks.splice(i, 1);
		}
	}
}

function drawSnow(store) {
	// 背景の雪(半分)を描画
	for (var i = 0; i < store.length; i++) {
		// 一つのparticleを取り出す
		var p = store[i];
		p.updatePosition();
		p.drawSnow();
		if (p.done()) {
			store.splice(i, 1);
		}
	}	
}

function drawParticle(store) {
	// 背景の雪(半分)を描画
	for (var i = 0; i < store.length; i++) {
		// 一つのparticleを取り出す
		var p = store[i];
		p.updatePosition();
		p.drawParticle();
		if (p.done()) {
			store.splice(i, 1);
		}
	}	
}

function updatePosition () {
	angle += speed;

	if (angle > 5 || angle < -5) {
		speed *= -1;
	}		
}

/*
  NOTE: ミノブロックの位置をボーンデータに応じて更新させる
  @param keypoins : ボーンポジションデータ
  0:"nose"
  1:"leftEye"
  2:"rightEye"
  3:"leftEar"
  4:"rightEar"
  5:"leftShoulder"
  6:"rightShoulder"
  7:"leftElbow"
  8:"rightElbow"
  9:"leftWrist"
  10:"rightWrist"
  11:"leftHip"
  12:"rightHip"
  13:"leftKnee"
  14:"rightKnee"
  15:"leftAnkle"
  16:"rightAnkle"
*/
export function setKeyPoints (keypoints) {
	const x = p5.map(keypoints[0].position.x, 0, 640, 0, p5.width)
	const y = p5.map(keypoints[0].position.y, 0, 480, 0, p5.height)
	humanPos.x = x
	humanPos.y = p5.height / 5 + y;
	if (humanPos.y < p5.height - p5.height / 2) {
		humanPos.y = p5.height - p5.height / 2;
	}

	const left = keypoints[9].position
	const right = keypoints[10].position
	if (left.x > 600 || left.y > 400 || 
			right.x > 600 || right.y > 400) {
		// NOTE: NOT FOUND
		return
	}

	const distance = p5.dist(left.x, left.y, right.x, right.y)
	if (distance < HANDS_THRESHOLD) {
		console.log(left.x + " / y: " + left.y)
		addSnow(particleFront)
		addSnow(particleBack)

		fireworks.push(new Firework(p5));
	}
}