
import { useEffect, useRef } from 'react';
import p5 from 'p5';

const ChromaticSmoke = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: any[] = [];
      const numParticles = 100; // Increased for better coverage
      
      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        hue: number;
        size: number;
        opacity: number;
        
        constructor() {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p.createVector(p.random(-0.2, 0.2), p.random(-0.2, 0.2));
          this.acc = p.createVector(0, 0);
          this.hue = p.random(200, 240); // Blue hues
          this.size = p.random(150, 300);
          this.opacity = p.random(20, 40);
        }
        
        update() {
          // Perlin noise movement
          const noiseScale = 0.002;
          const noiseVal = p.noise(
            this.pos.x * noiseScale, 
            this.pos.y * noiseScale, 
            p.frameCount * 0.005
          );
          
          const angle = noiseVal * p.TWO_PI * 2;
          const force = p5.Vector.fromAngle(angle);
          force.mult(0.1);
          this.acc.add(force);
          
          // Update physics
          this.vel.add(this.acc);
          this.vel.limit(1);
          this.pos.add(this.vel);
          this.acc.mult(0);
          
          // Wrap around edges
          if (this.pos.x < -this.size) this.pos.x = p.width + this.size;
          if (this.pos.x > p.width + this.size) this.pos.x = -this.size;
          if (this.pos.y < -this.size) this.pos.y = p.height + this.size;
          if (this.pos.y > p.height + this.size) this.pos.y = -this.size;
        }
        
        display() {
          p.noStroke();
          // Create gradient effect
          const gradientSteps = 8;
          for (let i = gradientSteps; i > 0; i--) {
            const ratio = i / gradientSteps;
            const currentSize = this.size * ratio;
            const currentOpacity = this.opacity * ratio;
            
            p.fill(this.hue, 70, 60, currentOpacity);
            p.ellipse(this.pos.x, this.pos.y, currentSize, currentSize);
          }
        }
      }
      
      p.setup = () => {
        // Create canvas with pixel density handling
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.pixelDensity(1);
        canvas.style('display', 'block');
        canvas.parent(containerRef.current!);
        
        // Initialize particles
        for (let i = 0; i < numParticles; i++) {
          particles.push(new Particle());
        }
        
        // Set color mode to HSL for better control
        p.colorMode(p.HSL, 360, 100, 100, 100);
        p.blendMode(p.SCREEN);
      };
      
      p.draw = () => {
        p.clear();
        
        // Update and display particles
        particles.forEach(particle => {
          particle.update();
          particle.display();
        });
      };
      
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    // Create P5 instance
    const p5Instance = new p5(sketch);
    
    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full bg-[#090909]" 
      style={{ zIndex: -1 }}
    />
  );
};

export default ChromaticSmoke;
