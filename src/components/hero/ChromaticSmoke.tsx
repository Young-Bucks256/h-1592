
import { useEffect, useRef } from 'react';
import p5 from 'p5';

const ChromaticSmoke = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: any[] = [];
      const numParticles = 50;
      const mouseRepelRadius = 100; // Radius of mouse influence
      const mouseRepelStrength = 2; // Strength of repulsion
      
      // Array of flag emojis
      const flags = [
        "🇺🇸", "🇬🇧", "🇫🇷", "🇩🇪", "🇮🇹", "🇪🇸", "🇵🇹", "🇯🇵",
        "🇰🇷", "🇨🇳", "🇮🇳", "🇧🇷", "🇲🇽", "🇨🇦", "🇦🇺", "🇳🇿",
        "🇿🇦", "🇸🇪", "🇳🇴", "🇫🇮", "🇩🇰", "🇳🇱", "🇧🇪", "🇨🇭"
      ];
      
      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        flag: string;
        size: number;
        opacity: number;
        rotation: number;
        
        constructor() {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
          this.acc = p.createVector(0, 0);
          this.flag = flags[Math.floor(p.random(flags.length))];
          this.size = p.random(20, 30);
          this.opacity = p.random(0.3, 0.8);
          this.rotation = p.random(p.TWO_PI);
        }
        
        applyMouseForce(mousePos: p5.Vector) {
          // Calculate direction from mouse to particle
          const dir = p5.Vector.sub(this.pos, mousePos);
          const distance = dir.mag();
          
          // Only apply force if within influence radius
          if (distance < mouseRepelRadius) {
            dir.normalize();
            // Force inversely proportional to distance
            const force = p.map(distance, 0, mouseRepelRadius, mouseRepelStrength, 0);
            dir.mult(force);
            this.acc.add(dir);
          }
        }
        
        update() {
          // Apply mouse repulsion
          const mousePos = p.createVector(p.mouseX, p.mouseY);
          this.applyMouseForce(mousePos);
          
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
          this.vel.limit(0.8);
          this.pos.add(this.vel);
          this.acc.mult(0);
          
          // Gentle rotation
          this.rotation += 0.01;
          
          // Wrap around edges
          if (this.pos.x < -this.size) this.pos.x = p.width + this.size;
          if (this.pos.x > p.width + this.size) this.pos.x = -this.size;
          if (this.pos.y < -this.size) this.pos.y = p.height + this.size;
          if (this.pos.y > p.height + this.size) this.pos.y = -this.size;
        }
        
        display() {
          p.push();
          p.translate(this.pos.x, this.pos.y);
          p.rotate(this.rotation);
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(this.size);
          p.text(this.flag, 0, 0);
          p.pop();
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
