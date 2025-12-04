// Minimal Scroll Effects for MMAM Website

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal sections
    const revealSections = document.querySelectorAll('.reveal');
    revealSections.forEach(section => {
        observer.observe(section);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Console branding
    const styles = [
        'font-size: 16px',
        'font-weight: bold',
        'color: #2563EB',
        'padding: 8px'
    ].join(';');

    console.log('%cMMAM', styles);
    console.log('Media Multicast Address Manager');
    console.log('https://github.com/taqq505/mmam-docker');

    const modal = document.getElementById('mockup-modal');
    const titleEl = document.getElementById('mockup-modal-title');
    const descEl = document.getElementById('mockup-modal-desc');
    const previewEl = modal ? modal.querySelector('.mockup-modal__preview') : null;
    const triggers = document.querySelectorAll('.mockup-trigger');

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('is-visible');
            modal.setAttribute('aria-hidden', 'true');
        }
    };

    const openModal = (title, desc, image) => {
        if (!modal) return;
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = desc;
        if (previewEl) {
            if (image) {
                previewEl.style.backgroundImage = `url(${image})`;
                previewEl.style.backgroundColor = '#0e1525';
                previewEl.classList.add('has-image');
            } else {
                previewEl.style.backgroundImage = 'linear-gradient(125deg, rgba(110,231,183,0.16), rgba(59,130,246,0.25))';
                previewEl.style.backgroundColor = 'transparent';
                previewEl.classList.remove('has-image');
            }
        }
        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            openModal(trigger.dataset.title, trigger.dataset.desc, trigger.dataset.image);
        });
    });

    if (modal) {
        modal.addEventListener('click', event => {
            if (event.target.closest('[data-close-modal]')) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    const showcaseTrack = document.querySelector('[data-showcase-track]');
    const showcaseNavs = document.querySelectorAll('.showcase__nav');
    showcaseNavs.forEach(button => {
        button.addEventListener('click', () => {
            if (!showcaseTrack) return;
            const card = showcaseTrack.querySelector('.showcase__card');
            const offset = card ? card.offsetWidth + 24 : 320;
            const direction = Number(button.dataset.direction || 1);
            showcaseTrack.scrollBy({
                left: offset * direction,
                behavior: 'smooth'
            });
        });
    });
});
