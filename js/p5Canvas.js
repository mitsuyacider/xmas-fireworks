import Particle from '@/js/Particle'
import Firework from '@/js/Firework'
let p5;
let angle;
let speed;
let particleStore;
let snowNum = 500;
let human;
let humanPos;
let frontImage;
let fireworks = [];

export function mainCanvas(_p5) {
	
	p5 = _p5

	p5.preload = _ => {
		// NOTE: staticフォルダから参照
		human = p5.loadImage('img/human.png');
		frontImage = p5.loadImage('img/front.png')
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
		particleStore = [];
		
		// 雪の数だけパーティクルを生成する
		for (var i = 0; i < snowNum; i++) {
			var p = new Particle(p5);
			p.size = p5.random(10, 20);
			p.x = p5.random(0, p5.width);
			p.y = p5.random(0, p5.height);
			p.speedY = p5.random(1, 5);
			p.amplitude = p5.random(0.1, 2);
			p.wavingSpeed = p5.random(0.1, 4);
			p.angle = 0;
			
			particleStore.push(p);
		}	
		
		humanPos = p5.createVector(0, p5.height / 2);

		p5.stroke(255);
		p5.strokeWeight(4);
	}

	p5.draw = _ => {
		p5.clear();
		p5.colorMode(p5.RGB);
		drawSnow(true);
		p5.image(human, humanPos.x, humanPos.y);
		drawFireworks()

		p5.colorMode(p5.RGB);
		drawSnow(false);
		p5.image(frontImage, 0, 0, p5.width, p5.height);

		updatePosition();
		
	}
}  

function drawFireworks() {
	if (p5.random(1) < 0.03) {
		fireworks.push(new Firework(p5));
	}
		
	for (var i = fireworks.length - 1; i >= 0; i--) {
		fireworks[i].update();
		fireworks[i].show();
		
		if (fireworks[i].done()) {
			fireworks.splice(i, 1);
		}
	}
}

function drawSnow(isFront) {
	if (isFront) {
		// 背景の雪(半分)を描画
		for (var i = 0; i < snowNum / 2; i++) {
			// 一つのparticleを取り出す
			var p = particleStore[i];
			p.updatePosition();
			p.drawParticle();
		}	
	} else {	
		// 背景の雪(残り半分)を描画
		for (var i = snowNum / 2; i < snowNum; i++) {
			// 一つのparticleを取り出す
			var p = particleStore[i];
			p.updatePosition();
			p.drawParticle();
		}
	}
}

function updatePosition () {
	angle += speed;

	if (angle > 5 || angle < -5) {
		speed *= -1;
	}		
}

export function setKeyPoints (keypoints) {
	const x = p5.map(keypoints[0].position.x, 0, 640, 0, p5.width)
	const y = p5.map(keypoints[0].position.y, 0, 480, 0, p5.height)
	humanPos.x = x
	humanPos.y = p5.height / 5 + y;
	if (humanPos.y < p5.height - p5.height / 2) {
		humanPos.y = p5.height - p5.height / 2;
	}
}