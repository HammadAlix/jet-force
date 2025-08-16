import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Code, 
  Database, 
  Smartphone, 
  Globe, 
  Zap,
  Filter,
  Search,
  Calendar,
  Star,
  Award,
  Users
} from 'lucide-react';
import './Projects.css';
import assets from '../../assets/assets';

const Projects = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Projects data - easily extensible
  const projects = [
    {
      id: 1,
      title: 'Tomato - Food Delivery App',
      description: 'A full-stack food delivery platform built with React.js and Node.js featuring responsive UI, dynamic components, and optimized backend performance.',
      longDescription: 'Complete food delivery solution with user authentication, real-time order tracking, payment integration, and admin dashboard. Features include cart management, restaurant listings, order history, and delivery tracking.',
      category: 'web',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Stripe API', 'JWT'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://tomato-demo.com',
      githubUrl: 'https://github.com/hammad/tomato-app',
      status: 'completed',
      featured: true,
      date: '2024-08',
      duration: '3 months',
      team: 'Solo Project',
      highlights: [
        'Real-time order tracking',
        'Payment gateway integration',
        'Responsive design',
        'Admin dashboard'
      ]
    },
    {
      id: 2,
      title: 'Hannaford LLP - Law Firm Website',
      description: 'Professional website for a London-based law agency built with React.js and Node.js, ensuring seamless navigation and efficient data handling.',
      longDescription: 'Corporate website for a prestigious law firm featuring case studies, attorney profiles, contact forms, and blog functionality. Optimized for SEO and professional presentation.',
      category: 'web',
      technologies: ['React.js', 'Node.js', 'CSS3', 'MongoDB', 'Email API'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://hannaford-llp.com',
      githubUrl: 'https://github.com/hammad/hannaford-website',
      status: 'completed',
      featured: true,
      date: '2024-07',
      duration: '2 months',
      team: 'Solo Project',
      highlights: [
        'Professional UI/UX',
        'SEO optimized',
        'Contact forms',
        'Blog functionality'
      ]
    },
    {
      id: 3,
      title: 'Bathland - E-commerce Platform',
      description: 'MERN stack e-commerce platform integrated with Weather API and MailChimp for enhanced user experience and marketing automation.',
      longDescription: 'Full-featured e-commerce platform for bathroom fixtures and accessories. Includes product catalog, shopping cart, user accounts, order management, and integrated marketing tools.',
      category: 'web',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Weather API', 'MailChimp API'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://bathland-store.com',
      githubUrl: 'https://github.com/hammad/bathland-ecommerce',
      status: 'completed',
      featured: true,
      date: '2024-09',
      duration: '4 months',
      team: 'Solo Project',
      highlights: [
        'E-commerce functionality',
        'API integrations',
        'Marketing automation',
        'Inventory management'
      ]
    },
    
    {
      id: 4,
      title: 'Blog Application',
      description: 'Full-stack blog platform with Node.js, Express.js, MongoDB, and JWT authentication featuring role-based access control.',
      longDescription: 'Complete blogging platform with user authentication, role-based permissions, rich text editor, comment system, and admin panel for content management.',
      category: 'web',
      technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Rich Text Editor'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://blog-app-demo.com',
      githubUrl: 'https://github.com/hammad/blog-application',
      status: 'completed',
      featured: false,
      date: '2024-06',
      duration: '2 months',
      team: 'Solo Project',
      highlights: [
        'User authentication',
        'Role-based access',
        'Rich text editor',
        'Comment system'
      ]
    },
    {
      id: 5,
      title: 'AI Image Generator',
      description: 'AI-powered image generation application using OpenAI API with real-time processing and custom style options.',
      longDescription: 'Cutting-edge AI image generation tool with multiple style options, batch processing, image editing capabilities, and gallery management.',
      category: 'ai',
      technologies: ['React.js', 'OpenAI API', 'Node.js', 'Image Processing', 'WebSockets'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://ai-image-gen.com',
      githubUrl: 'https://github.com/hammad/ai-image-generator',
      status: 'in-progress',
      featured: true,
      date: '2024-10',
      duration: 'Ongoing',
      team: 'Solo Project',
      highlights: [
        'AI image generation',
        'Multiple styles',
        'Batch processing',
        'Gallery management'
      ]
    },
    {
      id: 6,
      title: 'React Native Fitness App',
      description: 'Cross-platform mobile fitness application with workout tracking, progress analytics, and social features.',
      longDescription: 'Comprehensive fitness app with workout plans, progress tracking, nutrition logging, social features, and integration with wearable devices.',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Redux', 'Charts.js', 'Push Notifications'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://fitness-app-demo.com',
      githubUrl: 'https://github.com/hammad/fitness-app',
      status: 'planned',
      featured: false,
      date: '2024-12',
      duration: '3 months',
      team: 'Solo Project',
      highlights: [
        'Workout tracking',
        'Progress analytics',
        'Social features',
        'Wearable integration'
      ]
    },
    {
  id: 7,
  title: 'Jetforce - Aviation Website',
  description: 'Modern React-based aviation website showcasing aircraft fleet, booking services, and aviation news.',
  longDescription: 'A sleek and responsive aviation website built with React.js. Features fleet showcase, flight booking inquiry forms, and aviation-related blog/news section. Designed with a focus on performance, accessibility, and an engaging user experience.',
  category: 'web',
  technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'EmailJS'],
  image: <img src={assets.jetForce} alt="" />, // Replace with actual Jetforce image path
  liveUrl: 'https://jetforce.com', // Replace with real live site URL
  githubUrl: 'https://github.com/hammad/jetforce', // Replace with actual repo
  status: 'completed',
  featured: true,
  date: '2025-08',
  duration: '2 months',
  team: 'Solo Project',
  highlights: [
    'Fleet showcase with animations',
    'Booking inquiry system',
    'Responsive design',
    'Smooth scrolling and interactive UI'
  ]
}

  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: <Globe size={18} />, count: projects.length },
    { id: 'web', label: 'Web Apps', icon: <Code size={18} />, count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile Apps', icon: <Smartphone size={18} />, count: projects.filter(p => p.category === 'mobile').length },
    { id: 'ai', label: 'AI Projects', icon: <Zap size={18} />, count: projects.filter(p => p.category === 'ai').length }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'featured', label: 'Featured First' },
    { id: 'title', label: 'Alphabetical' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

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
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.2,
        hue: Math.random() * 360
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      time += 0.01;

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        const alpha = particle.opacity * Math.sin(time + index * 0.1);
        const hue = (particle.hue + time * 20) % 360;
        
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${Math.abs(alpha)})`;
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#68d391';
      case 'in-progress': return '#f6e05e';
      case 'planned': return '#a78bfa';
      default: return '#888888';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      default: return 'Unknown';
    }
  };

  return (
    <section className="projects-section">
      <canvas ref={canvasRef} className="projects-canvas" />
      
      <div className="projects-container">
        {/* Header */}
        <div className={`projects-header ${isLoaded ? 'animate-in' : ''}`}>
          <h2 className="section-title">projects.</h2>
          <p className="section-subtitle">
            Showcasing innovative solutions and creative implementations across web, mobile, and AI domains
          </p>
        </div>

        {/* Controls */}
        <div className={`projects-controls ${isLoaded ? 'animate-in delay-200' : ''}`}>
          {/* Search */}
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Sort */}
          <div className="sort-container">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className={`category-filter ${isLoaded ? 'animate-in delay-300' : ''}`}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
            >
              {category.icon}
              <span>{category.label}</span>
              <span className="category-count">{category.count}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''} ${isLoaded ? 'animate-in' : ''}`}
              style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="project-image-container">
                <div className="project-image">
                  <div className="image-placeholder">
                    <Code size={48} />
                    <span>Project Preview</span>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="status-badge" style={{ backgroundColor: getStatusColor(project.status) }}>
                  {getStatusLabel(project.status)}
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="featured-badge">
                    <Star size={16} />
                    Featured
                  </div>
                )}

                {/* Overlay */}
                <div className={`project-overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                  <div className="overlay-content">
                    <button className="overlay-button primary">
                      <ExternalLink size={20} />
                      Live Demo
                    </button>
                    <button className="overlay-button secondary">
                      <Github size={20} />
                      Source Code
                    </button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    <span className="project-date">
                      <Calendar size={14} />
                      {new Date(project.date + '-01').toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}
                    </span>
                    <span className="project-duration">
                      {project.duration}
                    </span>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                {/* Technologies */}
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="project-highlights">
                  <h4 className="highlights-title">Key Features:</h4>
                  <ul className="highlights-list">
                    {project.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="highlight-item">
                        <Award size={12} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Footer */}
                <div className="project-footer">
                  <div className="project-team">
                    <Users size={16} />
                    {project.team}
                  </div>
                  <div className="project-actions">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="action-link">
                      <ExternalLink size={16} />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="action-link">
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">
              <Search size={48} />
            </div>
            <h3>No projects found</h3>
            <p>Try adjusting your search terms or category filter</p>
          </div>
        )}

        {/* Call to Action */}
        <div className={`projects-cta ${isLoaded ? 'animate-in delay-800' : ''}`}>
          <div className="cta-content">
            <h3 className="cta-title">Have a Project in Mind?</h3>
            <p className="cta-description">
              Let's collaborate and bring your ideas to life with cutting-edge technology and innovative solutions.
            </p>
            <div className="cta-buttons">
              <button className="cta-primary">
                <span>Start a Project</span>
                <Zap size={18} />
              </button>
              <button className="cta-secondary">
                <span>View All Work</span>
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;