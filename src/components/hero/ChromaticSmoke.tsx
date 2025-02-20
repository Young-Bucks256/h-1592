
import { useEffect, useRef } from 'react';
import p5 from 'p5';

const ChromaticSmoke = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: Particle[] = [];
      const numParticles = 150; // Increased number of particles
      
      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        hue: number;
        lifespan: number;
        
        constructor() {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p.createVector(0, -1);
          this.acc = p.createVector(0, 0);
          this.hue = p.random(360);
          this.lifespan = 255;
        }
        
        applyForce(force: p5.Vector) {
          this.acc.add(force);
        }
        
        run() {
          this.update();
          this.display();
        }
        
        update() {
          this.vel.add(this.acc);
          this.pos.add(this.vel);
          this.acc.mult(0);
          this.vel.mult(0.95);
          this.lifespan -= 1;
          
          // Mouse repulsion
          const mouse = p.createVector(p.mouseX, p.mouseY);
          const dir = p5.Vector.sub(this.pos, mouse);
          const d = dir.mag();
          if (d < 100) {
            dir.normalize();
            dir.mult(1 / d * 100);
            this.applyForce(dir);
          }
          
          // Add some noise movement
          const noiseVal = p.noise(this.pos.x * 0.01, this.pos.y * 0.01, p.frameCount * 0.01);
          const noiseForce = p.createVector(p.cos(noiseVal * p.TWO_PI), p.sin(noiseVal * p.TWO_PI));
          noiseForce.mult(0.1);
          this.applyForce(noiseForce);
          
          // Keep particles within bounds
          if (this.pos.x < 0) this.pos.x = p.width;
          if (this.pos.x > p.width) this.pos.x = 0;
          if (this.pos.y < 0) this.pos.y = p.height;
          if (this.pos.y > p.height) this.pos.y = 0;
        }
        
        display() {
          p.noStroke();
          p.colorMode(p.HSL);
          const alpha = this.lifespan / 255 * 0.6; // Increased opacity further
          p.fill(this.hue, 70, 50, alpha);
          p.ellipse(this.pos.x, this.pos.y, 100, 100); // Increased particle size
        }
        
        isDead() {
          return this.lifespan < 0;
        }
      }
      
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.style('display', 'block'); // Ensure canvas takes full space
        canvas.parent(containerRef.current!);
        p.blendMode(p.ADD);
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle());
        }
      };
      
      p.draw = () => {
        p.clear();
        p.blendMode(p.ADD);
        
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];
          particle.run();
          if (particle.isDead()) {
            particles.splice(i, 1);
            particles.push(new Particle());
          }
        }
      };
      
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const p5Instance = new p5(sketch);
    
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10 w-full h-full" />;
};

export default ChromaticSmoke;
