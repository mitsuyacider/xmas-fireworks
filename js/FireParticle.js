// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

export default class FireParticle {

    constructor (x, y, hu, firework, p5) {
				this.p5 = p5;
        this.pos = this.p5.createVector(x, y);
        this.firework = firework;
        this.lifespan = 255;
        this.hu = hu;
        this.acc = this.p5.createVector(0, 0);
        
        if (this.firework) {
          this.vel = this.p5.createVector(0, this.p5.random(-12, -8));
        } else {
					const P5 = require('p5')
					this.vel = P5.Vector.random2D();
          this.vel.mult(this.p5.random(2, 10));
        }    
    }
   
    applyForce (force) {
      this.acc.add(force);
    }
  
    update () {
      if (!this.firework) {
        this.vel.mult(0.9);
        this.lifespan -= 4;
      }
      
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    done () {
      if (this.lifespan < 0) {
        return true;
      } else {
        return false;
      }
    }
  
    show () {
      this.p5.colorMode(this.p5.HSB);
      
      if (!this.firework) {
        this.p5.strokeWeight(2);
        this.p5.stroke(this.hu, 255, 255, this.lifespan);
      } else {
        this.p5.strokeWeight(4);
        this.p5.stroke(this.hu, 255, 255);
      }
      
			// this.p5.point(this.pos.x, this.pos.y);
			this.p5.ellipse(this.pos.x, this.pos.y, 5, 5);
    }
  }