
export default class Particle {

	constructor (p5) {
		this.p5 = p5;
		this.size = 10;
		this.red = 255;
		this.green = 255;
		this.blue = 255;
		this.x = 0;
		this.y = 0;
		this.speedY = 1;
		this.amplitude = 0;
		this.wavingSpeed = 0;
		this.angle = 0;	
		this.isOver = false;
		this.rotateAngle = p5.random(360);
		this.rotateSpeed = 2
	}
	
	drawParticle () {
		this.p5.push();
		this.p5.ellipseMode(this.p5.CENTER);
		this.p5.noStroke();
		for (var i = 1; i < 3 * 5; i += 5) {			
			this.p5.fill(this.red, this.green, this.blue, 100);
			this.p5.ellipse(this.x, this.y, this.size + i, this.size + i);			
		}
		this.p5.pop();
	}

	drawSnow () {
		this.p5.push();
		this.p5.translate(this.x, this.y)
		this.p5.rotate(this.p5.radians(this.rotateAngle))
		this.p5.ellipseMode(this.p5.CENTER);
		this.p5.noStroke();
		// this.p5.textSize(this.size)
		this.p5.rectMode(this.p5.CENTER)
		const size = this.size * 2

		this.p5.fill(this.red, this.green, this.blue, 100);
		this.p5.stroke(this.red, this.green, this.blue, 100);
		var dx = size / 2
		var dy = size / 2
		var length = size / 10 / 2
		
		// rotate(radians(60))
		
		this.p5.strokeWeight(5)
		this.p5.line(0 - dx + size / length, 0 - dy + size / length, size - dx - size / length, size - dy - size / length);
		this.p5.line(size - dx - size / length, 0 - dy + size / length, 0 - dx + size / length, size - dy - size / length);
		
		this.p5.strokeWeight(2)
		this.p5.line(0 - dx, size / 2 - dy, size - dx, size / 2 - dy);
		this.p5.line(size / 2 - dx, 0 - dy, size / 2 - dx, size - dy);
		this.p5.line(size / 2 - size / 10 * 2 - dx, size / 8 - dy, size / 2 + size / 10 * 2 - dx, size / 8 - dy);	
		this.p5.line(size / 2 - size / 10 * 2 - dx, size - size / 8 - dy, size / 2 + size / 10 * 2 - dx, size - size / 8 - dy);
		this.p5.line(size - size / 8 - dx, size / 2 - size / 10 * 2 - dy, size - size / 8 - dx, size / 2 + size / 10 * 2 - dy);	
		this.p5.line(size / 8 - dx, size / 2 - size / 10 * 2 - dy, size / 8 - dx, size / 2 + size / 10 * 2 - dy);	

		// this.p5.text('❄️', 0, 0)		

		this.p5.pop();
	}
	
	updatePosition () {
		
		if (this.isOver) return;

		this.x = this.x + this.p5.sin(this.p5.radians(this.angle)) * this.amplitude;
		this.y += this.speedY;
		if (this.y > this.p5.height + this.size) {
			// this.y = -this.size;
			this.isOver = true;
		}
		
		this.angle += this.wavingSpeed;
		this.rotateAngle += this.rotateSpeed;
	}

	done () {
		return this.isOver;
	}
}
