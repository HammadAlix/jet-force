import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Phone, 
  MapPin, 
  Send, 
  ArrowUp, 
  Heart,
  Code2,
  Zap,
  Globe,
  Coffee,
  ExternalLink,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Social links data
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github size={20} />,
      url: 'https://github.com/hammad',
      color: '#333333',
      hoverColor: '#24292e'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      url: 'https://linkedin.com/in/hammad',
      color: '#0077b5',
      hoverColor: '#005885'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      url: 'https://twitter.com/hammad',
      color: '#1da1f2',
      hoverColor: '#0d8bd9'
    },
    {
      name: 'Email',
      icon: <Mail size={20} />,
      url: 'mailto:hammad@example.com',
      color: '#ea4335',
      hoverColor: '#d23321'
    }
  ];

  // Quick links data
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  // Services data
  const services = [
    { name: 'Web Development', href: '#web-dev' },
    { name: 'Mobile Apps', href: '#mobile-dev' },
    { name: 'AI Solutions', href: '#ai-dev' },
    { name: 'Consulting', href: '#consulting' },
    { name: 'Maintenance', href: '#maintenance' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Update current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  // Particle animation for background
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
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.2 + 0.1,
        hue: Math.random() * 60 + 180 // Blue-green range
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      time += 0.005;

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        const alpha = particle.opacity * Math.sin(time + index * 0.2);
        const hue = (particle.hue + time * 10) % 360;
        
        ctx.fillStyle = `hsla(${hue}, 60%, 50%, ${Math.abs(alpha)})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
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

  // Handle contact form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setEmail('');
      setMessage('');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Format current time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <footer className="footer-section">
      <canvas ref={canvasRef} className="footer-canvas" />
      
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className={`footer-main ${isLoaded ? 'animate-in' : ''}`}>
          {/* Contact & About Column */}
          <div className="footer-column footer-about">
            <div className="footer-logo">
              <Code2 size={32} className="logo-icon" />
              <span className="logo-text">hammad.</span>
            </div>
            
            <p className="footer-description">
              Full-stack developer passionate about creating innovative digital solutions. 
              Specializing in React.js, Node.js, and modern web technologies to bring 
              your ideas to life.
            </p>

            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={18} />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+92 300 1234567</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>hammad@example.com</span>
              </div>
              <div className="contact-item">
                <Clock size={18} />
                <span>PKT {formatTime(currentTime)}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ 
                    animationDelay: `${index * 0.1 + 0.3}s`,
                    '--hover-color': social.hoverColor 
                  }}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column footer-links">
            <h3 className="footer-column-title">
              <Globe size={20} />
              Quick Links
            </h3>
            <ul className="footer-link-list">
              {quickLinks.map((link, index) => (
                <li key={link.name} style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
                  <a href={link.href} className="footer-link">
                    <span>{link.name}</span>
                    <ExternalLink size={14} className="link-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-column footer-services">
            <h3 className="footer-column-title">
              <Zap size={20} />
              Services
            </h3>
            <ul className="footer-link-list">
              {services.map((service, index) => (
                <li key={service.name} style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                  <a href={service.href} className="footer-link">
                    <span>{service.name}</span>
                    <ExternalLink size={14} className="link-icon" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form Column */}
          <div className="footer-column footer-contact">
            <h3 className="footer-column-title">
              <Send size={20} />
              Get In Touch
            </h3>
            
            <form className="footer-contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`form-submit ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus && (
                <div className={`form-status ${submitStatus}`}>
                  {submitStatus === 'success' ? (
                    <>
                      <Heart size={16} />
                      Message sent successfully!
                    </>
                  ) : (
                    <>
                      <span>❌</span>
                      Failed to send message. Please try again.
                    </>
                  )}
                </div>
              )}
            </form>

            {/* Stats */}
            <div className="footer-stats">
              <div className="stat-item">
                <Code2 size={16} />
                <span>50+ Projects</span>
              </div>
              <div className="stat-item">
                <Coffee size={16} />
                <span>1000+ Coffees</span>
              </div>
              <div className="stat-item">
                <User size={16} />
                <span>Happy Clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`footer-bottom ${isLoaded ? 'animate-in delay-600' : ''}`}>
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <span>© 2024 Hammad. Made with</span>
              <Heart size={16} className="heart-icon" />
              <span>in Pakistan</span>
            </div>

            <div className="footer-tech-stack">
              <span>Built with React.js + Node.js</span>
            </div>

            <button 
              className="scroll-to-top"
              onClick={scrollToTop}
              title="Back to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;