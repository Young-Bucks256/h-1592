
import { useEffect, useRef } from 'react';
import p5 from 'p5';

const ChromaticSmoke = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: any[] = [];
      const numParticles = 50; // Starting with fewer particles for better performance
      
      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        color: number;
        alpha: number;
        size: number;
        
        constructor() {
          // Random starting position
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          // Random initial velocity
          this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
          this.acc = p.createVector(0, 0);
          // Random color from a pleasing palette
          this.color = p.random([
            p.color(33, 195, 240), // Light blue
            p.color(230, 185, 128), // Sand color
            p.color(255, 255, 255)  // White
          ]);
          this.alpha = p.random(40, 80);
          this.size = p.random(100, 200);
        }
        
        update() {
          // Apply some perlin noise for organic movement
          const angle = p.noise(this.pos.x * 0.001, this.pos.y * 0.001, p.frameCount * 0.002) * p.TWO_PI * 2;
          const noiseForce = p5.Vector.fromAngle(angle);
          noiseForce.mult(0.1);
          this.acc.add(noiseForce);
          
          // Update position
          this.vel.add(this.acc);
          this.vel.limit(2); // Limit maximum speed
          this.pos.add(this.vel);
          this.acc.mult(0);
          
          // Wrap around edges
          if (this.pos.x < 0) this.pos.x = p.width;
          if (this.pos.x > p.width) this.pos.x = 0;
          if (this.pos.y < 0) this.pos.y = p.height;
          if (this.pos.y > p.height) this.pos.y = 0;
          
          // Slowly change size for breathing effect
          this.size = this.size + Math.sin(p.frameCount * 0.05) * 0.5;
        }
        
        display() {
          p.noStroke();
          const c = this.color;
          // Create a gradient effect
          for (let i = this.size; i > 0; i -= 8) {
            const alpha = (this.alpha * (i / this.size)) / 255;
            p.fill(p.red(c), p.green(c), p.blue(c), alpha);
            p.ellipse(this.pos.x, this.pos.y, i, i);
          }
        }
      }
      
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.style('display', 'block');
        canvas.parent(containerRef.current!);
        
        // Initialize particles
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle());
        }
        
        // Set blend mode for better visual effect
        p.blendMode(p.SCREEN);
      };
      
      p.draw = () => {
        p.clear();
        
        // Update and display all particles
        particles.forEach(particle => {
          particle.update();
          particle.display();
        });
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

  return <div ref={containerRef} className="fixed inset-0 w-full h-full" style={{ zIndex: -1 }} />;
};

export default ChromaticSmoke;
