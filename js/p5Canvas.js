import Particle from '@/js/Particle'

let p5;
let angle;
let speed;
let particleStore;
let snowNum = 500;

export function mainCanvas(_p5) {
	
	p5 = _p5

	p5.preload = _ => {
		// img = p5.loadImage('img/download.png');
	}

	p5.keyPressed = (keyCode) => {
	}

	p5.setup = _ => {
		// NOTE: キャンバスを親要素のキャンバス内に配置するようにする
		// http://p5aholic.hatenablog.com/entry/2015/05/16/163251
		var canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight)
		canvas.parent("canvas");
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
	}

	p5.draw = _ => {
		p5.background(60, 46, 64, 0)
	}
}  