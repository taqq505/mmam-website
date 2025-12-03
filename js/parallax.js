// Advanced Parallax & Scroll Effects for MMAM Website

document.addEventListener('DOMContentLoaded', function() {
    // Scroll Progress Indicator
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-progress-bar';
        document.body.prepend(indicator);
        return indicator;
    };

    const scrollIndicator = createScrollIndicator();

    // Update scroll progress
    const updateScrollProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        scrollIndicator.style.width = progress + '%';
    };

    // Parallax effect for hero section
    const heroSection = document.getElementById('home');
    let ticking = false;

    const applyParallax = (scrollPos) => {
        if (heroSection) {
            const heroContent = heroSection.querySelector('.max-w-4xl');
            if (heroContent) {
                const speed = 0.5;
                const yPos = scrollPos * speed;
                heroContent.style.transform = `translateY(${yPos}px)`;
                heroContent.style.opacity = 1 - (scrollPos / 600);
            }
        }
    };

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        fadeInObserver.observe(section);
    });

    // Parallax for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        fadeInObserver.observe(card);
    });

    // Parallax for screenshot cards
    const screenshotCards = document.querySelectorAll('.screenshot-card');
    screenshotCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        fadeInObserver.observe(card);
    });

    // Mouse parallax effect for hero section
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    });

    const animateMouseParallax = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        const badges = document.querySelectorAll('.badge');
        badges.forEach((badge, index) => {
            const depth = (index + 1) * 0.5;
            badge.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
        });

        requestAnimationFrame(animateMouseParallax);
    };

    animateMouseParallax();

    // Scroll event handler with throttling
    const handleScroll = () => {
        const scrollPos = window.pageYOffset;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                applyParallax(scrollPos);

                // Header blur effect
                const header = document.querySelector('header');
                if (scrollPos > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                ticking = false;
            });

            ticking = true;
        }
    };

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Parallax layers for different sections
    const createParallaxLayers = () => {
        const problemSection = document.getElementById('problem');
        if (problemSection) {
            const problemObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const items = entry.target.querySelectorAll('.space-y-6 > div');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, index * 150);
                        });
                    }
                });
            }, { threshold: 0.3 });

            problemObserver.observe(problemSection);
        }
    };

    createParallaxLayers();

    // Continuous background animation
    const createFloatingParticles = () => {
        const canvas = document.createElement('canvas');
        canvas.className = 'particles-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.3';

        heroSection.style.position = 'relative';
        heroSection.insertBefore(canvas, heroSection.firstChild);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };

    if (heroSection) {
        createFloatingParticles();
    }

    // Initialize scroll effects
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    // 3D tilt effect on cards
    const initTiltEffect = () => {
        const cards = document.querySelectorAll('.feature-card, .screenshot-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    };

    initTiltEffect();

    // Reveal text animation
    const initTextReveal = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    entry.target.textContent = '';
                    entry.target.style.opacity = '1';

                    let index = 0;
                    const interval = setInterval(() => {
                        if (index < text.length) {
                            entry.target.textContent += text[index];
                            index++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 30);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Apply to specific elements if needed
        // document.querySelectorAll('.animate-text').forEach(el => observer.observe(el));
    };

    // Console Easter Egg
    console.log('%cMMAM - Media Multicast Address Manager', 'font-size: 20px; font-weight: bold; color: #2563EB;');
    console.log('%cBuilt with FastAPI + Vue.js + PostgreSQL', 'font-size: 14px; color: #10B981;');
    console.log('%cGitHub: https://github.com/taqq505/mmam-docker', 'font-size: 12px; color: #666;');
});
