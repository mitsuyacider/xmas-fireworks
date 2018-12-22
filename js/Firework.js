// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

import FireParticle from '@/js/FireParticle.js'
export default class Firework {

    constructor(p5) {
			this.p5 = p5;
			this.hu = this.p5.random(255);
      this.firework = new FireParticle(this.p5.random(this.p5.width), this.p5.height, this.hu, true, this.p5);
      this.exploded = false;
			this.particles = [];  
			this.gravity = this.p5.createVector(0, 0.1);
	  }
  
    done () {
      if (this.exploded && this.particles.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  
    update () {
      if (!this.exploded) {
        this.firework.applyForce(this.gravity);
        this.firework.update();
        
        if (this.firework.vel.y >= 0) {
          this.exploded = true;
          this.explode();
        }
      }
      
      for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(this.gravity);
        this.particles[i].update();
        
        if (this.particles[i].done()) {
          this.particles.splice(i, 1);
        }
      }
    }
  
    explode () {
      for (var i = 0; i < 100; i++) {
        var p = new FireParticle(this.firework.pos.x, this.firework.pos.y, this.hu, false, this.p5);
        this.particles.push(p);
      }
    }
  
    show () {
      if (!this.exploded) {
        this.firework.show();
      }
      
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].show();
      }
    }
  }