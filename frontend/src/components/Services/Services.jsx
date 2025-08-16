import React, { useState, useEffect, useRef } from 'react';
import { Code, Smartphone, Sparkles, ArrowRight, Database, Globe, Cpu } from 'lucide-react';
import './Services.css'; // Assuming you have a CSS file for styles

const Services = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const canvasRefs = [useRef(null), useRef(null), useRef(null)];
  const animationRefs = [useRef(null), useRef(null), useRef(null)];

  const services = [
    {
      id: 'fullstack',
      title: 'Full Stack Web Development',
      description: 'Building scalable web applications with the MERN stack. From responsive frontends to robust backend APIs, I deliver complete digital solutions.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript', 'RESTful APIs'],
      color: '#61dafb',
      icon: <Code size={32} />,
      features: [
        'Responsive UI/UX Design',
        'RESTful API Development',
        'Database Design & Optimization',
        'Authentication & Authorization',
        'Performance Optimization',
        'Third-party Integrations'
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      description: 'Creating cross-platform mobile applications with React Native. Delivering native performance with shared codebase efficiency.',
      technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript', 'Native APIs'],
      color: '#68d391',
      icon: <Smartphone size={32} />,
      features: [
        'Cross-platform Development',
        'Native Performance',
        'Push Notifications',
        'Offline Functionality',
        'App Store Deployment',
        'Real-time Features'
      ]
    },
    {
      id: 'ai',
      title: 'AI Image Generation',
      description: 'Integrating cutting-edge AI models for image generation and processing. Creating intelligent visual solutions for modern applications.',
      technologies: ['OpenAI API', 'Stable Diffusion', 'TensorFlow', 'Python', 'Computer Vision', 'ML Models'],
      color: '#f6e05e',
      icon: <Sparkles size={32} />,
      features: [
        'Custom AI Model Integration',
        'Image Generation APIs',
        'Real-time Processing',
        'Style Transfer',
        'Image Enhancement',
        'Automated Workflows'
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Canvas animations for each service
  useEffect(() => {
    const setupCanvas = (canvas, serviceId, color) => {
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      canvas.width = 300;
      canvas.height = 200;

      let time = 0;
      const particles = [];
      const nodes = [];

      // Initialize particles and nodes based on service type
      if (serviceId === 'fullstack') {
        // Code-like visualization
        for (let i = 0; i < 20; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            char: String.fromCharCode(65 + Math.floor(Math.random() * 26))
          });
        }
      } else if (serviceId === 'mobile') {
        // Mobile device visualization
        for (let i = 0; i < 15; i++) {
          nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            size: Math.random() * 4 + 2
          });
        }
      } else if (serviceId === 'ai') {
        // AI neural network visualization
        for (let i = 0; i < 12; i++) {
          nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 5 + 3,
            pulse: Math.random() * Math.PI * 2
          });
        }
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        time += 0.02;

        if (serviceId === 'fullstack') {
          // Animated code visualization
          particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            const alpha = 0.3 + 0.7 * Math.sin(time + index * 0.1);
            ctx.fillStyle = `rgba(97, 218, 251, ${alpha})`;
            ctx.font = '12px "JetBrains Mono", monospace';
            ctx.fillText(particle.char, particle.x, particle.y);

            // Draw connections
            particles.forEach((other, otherIndex) => {
              if (index !== otherIndex) {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                  ctx.strokeStyle = `rgba(97, 218, 251, ${0.1 * (1 - distance / 80)})`;
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  ctx.moveTo(particle.x, particle.y);
                  ctx.lineTo(other.x, other.y);
                  ctx.stroke();
                }
              }
            });
          });

          // Draw floating brackets and symbols
          const symbols = ['{', '}', '<', '>', '(', ')', '[', ']'];
          for (let i = 0; i < 5; i++) {
            const symbol = symbols[Math.floor(time * 2 + i) % symbols.length];
            const x = 50 + Math.sin(time + i) * 100;
            const y = 50 + Math.cos(time + i * 0.7) * 60;
            const alpha = 0.2 + 0.3 * Math.sin(time + i);
            
            ctx.fillStyle = `rgba(97, 218, 251, ${alpha})`;
            ctx.font = '16px "JetBrains Mono", monospace';
            ctx.fillText(symbol, x, y);
          }
        } else if (serviceId === 'mobile') {
          // Mobile device visualization
          nodes.forEach((node, index) => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            const alpha = 0.4 + 0.6 * Math.sin(time + index * 0.2);
            ctx.fillStyle = `rgba(104, 211, 145, ${alpha})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fill();

            // Draw mobile device outline
            if (index === 0) {
              ctx.strokeStyle = 'rgba(104, 211, 145, 0.6)';
              ctx.lineWidth = 2;
              ctx.strokeRect(canvas.width / 2 - 30, canvas.height / 2 - 40, 60, 80);
              ctx.strokeRect(canvas.width / 2 - 25, canvas.height / 2 - 30, 50, 60);
            }
          });

          // Draw signal waves
          for (let i = 0; i < 3; i++) {
            const radius = 20 + i * 15 + Math.sin(time * 2) * 5;
            ctx.strokeStyle = `rgba(104, 211, 145, ${0.3 - i * 0.1})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(canvas.width / 2 + 40, canvas.height / 2 - 20, radius, 0, Math.PI / 2);
            ctx.stroke();
          }
        } else if (serviceId === 'ai') {
          // AI neural network visualization
          nodes.forEach((node, index) => {
            node.pulse += 0.1;
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 20 || node.x > canvas.width - 20) node.vx *= -1;
            if (node.y < 20 || node.y > canvas.height - 20) node.vy *= -1;

            const alpha = 0.5 + 0.5 * Math.sin(node.pulse);
            const size = node.size + Math.sin(node.pulse) * 2;
            
            ctx.fillStyle = `rgba(246, 224, 94, ${alpha})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            ctx.fill();

            // Draw neural connections
            nodes.forEach((other, otherIndex) => {
              if (index !== otherIndex) {
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                  const connectionStrength = 1 - distance / 100;
                  ctx.strokeStyle = `rgba(246, 224, 94, ${connectionStrength * 0.3})`;
                  ctx.lineWidth = connectionStrength * 3;
                  ctx.beginPath();
                  ctx.moveTo(node.x, node.y);
                  ctx.lineTo(other.x, other.y);
                  ctx.stroke();
                }
              }
            });
          });

          // Draw AI brain outline
          ctx.strokeStyle = 'rgba(246, 224, 94, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, Math.PI * 2);
          ctx.stroke();

          // Draw processing indicators
          for (let i = 0; i < 8; i++) {
            const angle = (time + i * Math.PI / 4) % (Math.PI * 2);
            const x = canvas.width / 2 + Math.cos(angle) * 70;
            const y = canvas.height / 2 + Math.sin(angle) * 70;
            const alpha = 0.3 + 0.7 * Math.sin(time * 3 + i);
            
            ctx.fillStyle = `rgba(246, 224, 94, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        animationRefs[services.findIndex(s => s.id === serviceId)].current = requestAnimationFrame(animate);
      };

      animate();
    };

    services.forEach((service, index) => {
      setupCanvas(canvasRefs[index].current, service.id, service.color);
    });

    return () => {
      animationRefs.forEach(ref => {
        if (ref.current) {
          cancelAnimationFrame(ref.current);
        }
      });
    };
  }, []);

  return (
    <section className="services-section">
      <div className="services-container">
        <div className={`section-header ${isLoaded ? 'slide-in' : ''}`}>
          <h2 className="section-title">services.</h2>
          <p className="section-description">
            Transforming ideas into digital reality through cutting-edge technology and innovative solutions.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${isLoaded ? 'slide-in' : ''}`}
              style={{ transitionDelay: `${index * 0.2 + 0.3}s` }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="service-header">
                <div className="service-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
              </div>

              <div className="service-canvas-container">
                <canvas
                  ref={canvasRefs[index]}
                  className="service-canvas"
                />
              </div>

              <p className="service-description">{service.description}</p>

              <div className="service-technologies">
                {service.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag" style={{ borderColor: `${service.color}40` }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="service-features">
                <h4 className="features-title">Key Features:</h4>
                <ul className="features-list">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item">
                      <ArrowRight size={14} style={{ color: service.color }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className="service-cta"
                style={{ 
                  borderColor: hoveredService === service.id ? service.color : '#333333',
                  color: hoveredService === service.id ? service.color : '#ffffff'
                }}
              >
                Get Started
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className={`services-footer ${isLoaded ? 'slide-in' : ''}`} style={{ transitionDelay: '0.9s' }}>
          <p className="footer-text">
            Ready to bring your project to life? Let's discuss your requirements and create something amazing together.
          </p>
          <button className="contact-cta">
            Start a Project
            <Sparkles size={18} />
          </button>
        </div>
      </div>

    </section>
  );
};

export default Services;