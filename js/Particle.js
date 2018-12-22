
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
	
	updatePosition () {
		
		if (this.isOver) return;

		this.x = this.x + this.p5.sin(this.p5.radians(this.angle)) * this.amplitude;
		this.y += this.speedY;
		if (this.y > this.p5.height + this.size) {
			// this.y = -this.size;
			this.isOver = true;
		}
		
		this.angle += this.wavingSpeed;
	}

	done () {
		return this.isOver;
	}
}
