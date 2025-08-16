import React, { useState, useEffect, useRef } from 'react';
import { Code, Coffee, Trophy, BookOpen, Zap, Target, Users, Lightbulb } from 'lucide-react';
import './About.css';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  const [visibleStats, setVisibleStats] = useState({});
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const statsRef = useRef(null);

  const stats = [
    { id: 'projects', value: 50, label: 'Projects Completed', icon: <Code size={24} />, suffix: '+' },
    { id: 'coffee', value: 500, label: 'Cups of Coffee', icon: <Coffee size={24} />, suffix: '+' },
    { id: 'experience', value: 3, label: 'Years Experience', icon: <Trophy size={24} />, suffix: '+' },
    { id: 'technologies', value: 12, label: 'Technologies', icon: <Zap size={24} />, suffix: '+' }
  ];

  const skills = [
    { name: 'JavaScript', level: 95, color: '#f7df1e' },
    { name: 'React.js', level: 90, color: '#61dafb' },
    { name: 'Node.js', level: 85, color: '#68d391' },
    { name: 'MongoDB', level: 80, color: '#4fd1c7' },
    { name: 'Express.js', level: 85, color: '#ff6b6b' },
    { name: 'CSS/Tailwind', level: 90, color: '#a78bfa' },
    { name: 'Git/GitHub', level: 88, color: '#fd79a8' },
    { name: 'RESTful APIs', level: 85, color: '#00cec9' }
  ];

  const timeline = [
    {
      year: '2022',
      title: 'Started Journey',
      description: 'Enrolled in Software Engineering at Air University, Islamabad',
      icon: <BookOpen size={20} />,
      type: 'education'
    },
    {
      year: '2023',
      title: 'Self-Taught MERN',
      description: 'Mastered MERN stack development through intensive self-learning',
      icon: <Code size={20} />,
      type: 'skill'
    },
    {
      year: '2024',
      title: 'First Internship',
      description: 'MERN Stack Developer at SoftThrive - Built scalable client projects',
      icon: <Target size={20} />,
      type: 'work'
    },
    {
      year: '2024',
      title: 'Business Pitch',
      description: 'Presented tech startup idea at Air University Business Incubation Center',
      icon: <Lightbulb size={20} />,
      type: 'achievement'
    },
    {
      year: '2025',
      title: 'Full-Stack Expert',
      description: 'Currently building innovative solutions and exploring AI integration',
      icon: <Zap size={20} />,
      type: 'current'
    }
  ];

  const tabs = [
    { id: 'story', label: 'My Story', icon: <Users size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
    { id: 'journey', label: 'Journey', icon: <Target size={18} /> }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animated counter for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat) => {
              if (!visibleStats[stat.id]) {
                setVisibleStats(prev => ({ ...prev, [stat.id]: true }));
                animateCounter(stat.id, stat.value);
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [visibleStats]);

  const animateCounter = (id, targetValue) => {
    let currentValue = 0;
    const increment = targetValue / 60; // 60 frames for 1 second
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      const element = document.getElementById(`stat-${id}`);
      if (element) {
        element.textContent = Math.floor(currentValue);
      }
    }, 16); // ~60fps
  };

  // Particle system canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 360,
        life: Math.random() * 100 + 100
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      time += 0.01;

      particles.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        // Reset particle if life ends
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.offsetWidth;
          particle.y = Math.random() * canvas.offsetHeight;
          particle.life = Math.random() * 100 + 100;
          particle.hue = Math.random() * 360;
        }

        // Draw particle
        const alpha = particle.opacity * Math.sin(time + index * 0.1);
        const hue = (particle.hue + time * 50) % 360;
        
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${Math.abs(alpha)})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particles.forEach((other, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              const connectionAlpha = (1 - distance / 100) * 0.2;
              ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${connectionAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="about-section">
      <canvas ref={canvasRef} className="about-canvas" />
      
      <div className="about-container">
        <div className={`about-header ${isLoaded ? 'animate-in' : ''}`}>
          <h2 className="section-title">about.</h2>
          <p className="section-subtitle">
            Passionate developer crafting digital experiences with code and creativity
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className={`stats-grid ${isLoaded ? 'animate-in delay-200' : ''}`}>
          {stats.map((stat, index) => (
            <div key={stat.id} className="stat-card" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-number">
                  <span id={`stat-${stat.id}`}>0</span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className={`tab-navigation ${isLoaded ? 'animate-in delay-400' : ''}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'story' && (
            <div className="story-content animate-fade-in">
              <div className="story-text">
                <h3 className="content-title">My Story</h3>
                <p className="story-paragraph">
                  Hey there! I'm Hammad, a passionate full-stack developer currently pursuing Software Engineering 
                  at Air University, Islamabad. My journey into the world of programming began with curiosity 
                  and evolved into a deep passion for creating digital solutions that make a difference.
                </p>
                <p className="story-paragraph">
                  What sets me apart is my self-taught mastery of the MERN stack. While studying the fundamentals 
                  of software engineering academically, I dove deep into modern web development, teaching myself 
                  React, Node.js, MongoDB, and Express.js through countless hours of practice and real-world projects.
                </p>
                <p className="story-paragraph">
                  During my internship at SoftThrive, I had the opportunity to work on real client projects, 
                  delivering scalable web applications and gaining invaluable experience in professional 
                  software development. This experience taught me the importance of writing clean, maintainable 
                  code and working effectively in team environments.
                </p>
                <p className="story-paragraph">
                  I'm not just a coder – I'm a problem solver who loves turning complex challenges into elegant, 
                  user-friendly solutions. Whether it's building responsive UIs, optimizing database queries, 
                  or integrating cutting-edge AI technologies, I approach every project with enthusiasm and 
                  attention to detail.
                </p>
              </div>
              <div className="story-highlights">
                <div className="highlight-item">
                  <Lightbulb className="highlight-icon" />
                  <span>Innovation-driven mindset</span>
                </div>
                <div className="highlight-item">
                  <Users className="highlight-icon" />
                  <span>Collaborative team player</span>
                </div>
                <div className="highlight-item">
                  <Target className="highlight-icon" />
                  <span>Results-oriented approach</span>
                </div>
                <div className="highlight-item">
                  <BookOpen className="highlight-icon" />
                  <span>Continuous learner</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="skills-content animate-fade-in">
              <h3 className="content-title">Technical Skills</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="skill-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ 
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                          boxShadow: `0 0 10px ${skill.color}40`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="additional-skills">
                <h4>Additional Expertise</h4>
                <div className="skill-tags">
                  <span className="skill-tag">Agile/Scrum</span>
                  <span className="skill-tag">Design Patterns</span>
                  <span className="skill-tag">Performance Optimization</span>
                  <span className="skill-tag">API Integration</span>
                  <span className="skill-tag">Payment Gateways</span>
                  <span className="skill-tag">JWT Authentication</span>
                  <span className="skill-tag">Database Design</span>
                  <span className="skill-tag">Responsive Design</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'journey' && (
            <div className="journey-content animate-fade-in">
              <h3 className="content-title">My Journey</h3>
              <div className="timeline">
                {timeline.map((item, index) => (
                  <div key={index} className={`timeline-item ${item.type}`} style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="timeline-marker">
                      <div className="timeline-icon">{item.icon}</div>
                      <div className="timeline-line" />
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-year">{item.year}</div>
                      <h4 className="timeline-title">{item.title}</h4>
                      <p className="timeline-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className={`about-cta ${isLoaded ? 'animate-in delay-800' : ''}`}>
          <h3 className="cta-title">Let's Build Something Amazing Together</h3>
          <p className="cta-description">
            Ready to turn your ideas into reality? I'm always excited to work on new projects 
            and collaborate with fellow innovators.
          </p>
          <div className="cta-buttons">
            <button className="cta-primary">
              <span>Start a Project</span>
              <Zap size={18} />
            </button>
            <button className="cta-secondary">
              <span>Download Resume</span>
              <BookOpen size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;