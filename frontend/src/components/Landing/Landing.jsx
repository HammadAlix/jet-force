import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const greetings = [
    "grüetzi.", // Swiss German
    "hello.",
    "hola.",
    "bonjour.",
    "ciao.",
    "namaste.",
    "konnichiwa.",
    "guten tag.",
    "salaam."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Hacking Style Code Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    let time = 0;
    const codeLines = [];
    const jsLogo = { x: canvas.width / 2, y: 60, scale: 1, pulse: 0 };
    
    // Hacking-style code snippets
    const hackingCode = [
      'function hackTheMatrix() {',
      '  const data = await fetch("/api");',
      '  return data.json();',
      '}',
      '',
      'const secrets = [',
      '  "console.log(\'Hello World\')",',
      '  "npm install -g hacker-tools",',
      '  "git push origin master",',
      '  "sudo rm -rf /*", // just kidding!',
      '];',
      '',
      'class Developer {',
      '  constructor(name) {',
      '    this.name = name;',
      '    this.skills = [\'React\', \'Node\'];',
      '    this.coffee = Infinity;',
      '  }',
      '',
      '  code() {',
      '    while(this.coffee > 0) {',
      '      this.createAwesomeStuff();',
      '      this.coffee--;',
      '    }',
      '  }',
      '}',
      '',
      'const hammad = new Developer("Hammad");',
      'hammad.code();',
      '',
      '// System Status: ONLINE',
      '// Servers: Running...',
      '// Database: Connected',
      '// APIs: Responding',
      '',
      'if (user.isAwesome) {',
      '  console.log("Welcome to the matrix!");',
      '}',
      '',
      'const matrix = Array(100).fill(0)',
      '  .map(() => Math.random() > 0.5 ? 1 : 0);',
      '',
      'export default () => {',
      '  return <div>The Future is Now</div>;',
      '};'
    ];

    // Initialize scrolling code lines
    for (let i = 0; i < hackingCode.length; i++) {
      codeLines.push({
        text: hackingCode[i],
        y: i * 20 + canvas.height,
        opacity: Math.random() * 0.5 + 0.5,
        glitch: Math.random() < 0.1
      });
    }

    const animate = () => {
      // Dark background with slight transparency for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.02;

      // Draw JavaScript Logo at the top
      jsLogo.pulse += 0.1;
      jsLogo.scale = 1 + Math.sin(jsLogo.pulse) * 0.1;

      // Draw JS logo background (official yellow)
      ctx.save();
      ctx.translate(jsLogo.x, jsLogo.y);
      ctx.scale(jsLogo.scale, jsLogo.scale);
      
      // Yellow square background
      ctx.fillStyle = '#F7DF1E';
      ctx.fillRect(-25, -25, 50, 50);
      
      // Black "JS" text
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JS', 0, 0);
      
      // Glow effect
      ctx.shadowColor = '#F7DF1E';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = '#F7DF1E';
      ctx.lineWidth = 2;
      ctx.strokeRect(-25, -25, 50, 50);
      ctx.shadowBlur = 0;
      
      ctx.restore();

      // Scrolling code effect
      codeLines.forEach((line, index) => {
        // Move code up
        line.y -= 1.5;
        
        // Reset when off screen
        if (line.y < -20) {
          line.y = canvas.height + (Math.random() * 100);
          line.text = hackingCode[Math.floor(Math.random() * hackingCode.length)];
          line.opacity = Math.random() * 0.5 + 0.5;
          line.glitch = Math.random() < 0.05;
        }

        // Random glitch effect
        if (Math.random() < 0.001) {
          line.glitch = !line.glitch;
        }

        // Draw code line
        ctx.font = '12px "JetBrains Mono", "Courier New", monospace';
        ctx.textAlign = 'left';
        
        if (line.glitch && Math.random() < 0.5) {
          // Glitch effect - random characters
          let glitchedText = '';
          for (let i = 0; i < line.text.length; i++) {
            glitchedText += Math.random() < 0.1 ? 
              String.fromCharCode(33 + Math.floor(Math.random() * 94)) : 
              line.text[i];
          }
          ctx.fillStyle = `rgba(255, 0, 0, ${line.opacity * 0.8})`;
          ctx.fillText(glitchedText, 20 + Math.random() * 4 - 2, line.y + Math.random() * 2 - 1);
        }
        
        // Main text in hacker green/yellow
        const intensity = 0.3 + 0.7 * Math.sin(time + index * 0.1);
        ctx.fillStyle = `rgba(255, 255, 0, ${line.opacity * intensity})`;
        ctx.fillText(line.text, 20, line.y);
        
        // Add cursor blink effect on some lines
        if (index % 7 === 0 && Math.sin(time * 3) > 0) {
          ctx.fillStyle = '#F7DF1E';
          ctx.fillText('█', 20 + ctx.measureText(line.text).width, line.y);
        }

        // Random syntax highlighting
        if (line.text.includes('function') || line.text.includes('const') || line.text.includes('class')) {
          ctx.fillStyle = `rgba(100, 255, 100, ${line.opacity * 0.6})`;
          ctx.fillText(line.text, 20, line.y);
        }
        
        if (line.text.includes('//')) {
          const commentIndex = line.text.indexOf('//');
          const beforeComment = line.text.substring(0, commentIndex);
          const comment = line.text.substring(commentIndex);
          
          ctx.fillStyle = `rgba(255, 255, 0, ${line.opacity})`;
          ctx.fillText(beforeComment, 20, line.y);
          
          ctx.fillStyle = `rgba(128, 128, 128, ${line.opacity * 0.7})`;
          ctx.fillText(comment, 20 + ctx.measureText(beforeComment).width, line.y);
        }
      });

      // Matrix-style falling characters in background
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width;
        const char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
        ctx.font = '10px monospace';
        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.3})`;
        ctx.fillText(char, x, Math.random() * canvas.height);
      }

      // Status indicators
      const statusY = canvas.height - 60;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00FF00';
      ctx.fillText('● SYSTEM ONLINE', 10, statusY);
      ctx.fillStyle = '#F7DF1E';
      ctx.fillText('● COMPILING...', 10, statusY + 15);
      ctx.fillStyle = '#00BFFF';
      ctx.fillText('● SERVER RUNNING', 10, statusY + 30);

      // Terminal cursor
      if (Math.sin(time * 4) > 0) {
        ctx.fillStyle = '#F7DF1E';
        ctx.fillText('█', 130, statusY + 30);
      }

      // Random binary numbers
      if (Math.random() < 0.1) {
        ctx.font = '8px monospace';
        ctx.fillStyle = `rgba(255, 255, 0, ${Math.random() * 0.5})`;
        const binary = Math.random().toString(2).substring(2);
        ctx.fillText(binary, Math.random() * canvas.width, Math.random() * canvas.height);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`landing-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="content-wrapper">
        <div className="hero-section">
          <div className="hero-text">
            <div className={`greeting-line slide-from-left ${isLoaded ? 'slide-in' : ''}`}>
              <span className="changing-greeting">{greetings[currentGreeting]}</span>
            </div>
            
            <div className={`intro-line slide-from-left delay-100 ${isLoaded ? 'slide-in' : ''}`}>
              i'm
            </div>
            
            <div className={`name-line slide-from-left delay-200 ${isLoaded ? 'slide-in' : ''}`}>
              hammad.
            </div>
            
            <p className={`description fade-in-up delay-300 ${isLoaded ? 'slide-in' : ''}`}>
             I’m a full-stack developer specializing in the MERN stack and AI technologies, building scalable and responsive web applications.
My focus lies in combining clean code with engaging user experiences.
I aslo explore AI technologies, working with neural networks for creative and functional applications.
I use Flux.jl to build deep learning models and implement Stable Diffusion for image generation.
My goal is to bridge the gap between intelligent systems and seamless digital design.
            </p>
            
            <button className={`cta-button fade-in-up delay-400 ${isLoaded ? 'slide-in' : ''}`}>
              →say hi
            </button>
          </div>
          
          <div className={`canvas-container slide-from-right delay-300 ${isLoaded ? 'slide-in' : ''}`}>
            <div className="canvas-wrapper">
              <canvas 
                ref={canvasRef}
                className="dev-canvas"
              />
              
              {/* Floating tech labels */}
              <div className="tech-label react">
                React.js
              </div>
              <div className="tech-label node">
                Node.js
              </div>
              <div className="tech-label mongo">
                MongoDB
              </div>
              <div className="tech-label js">
                JavaScript
              </div>
            </div>
          </div>
        </div>
        
        <div className={`social-links slide-from-bottom delay-600 ${isLoaded ? 'slide-in' : ''}`}>
          <a href="https://linkedin.com/in/hammad-ali417399" target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github size={20} />
          </a>
          <a href="mailto:hammad@example.com">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;