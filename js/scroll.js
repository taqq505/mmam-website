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
                previewEl.innerHTML = `<img src="${image}" alt="${title} preview">`;
                previewEl.classList.add('has-image');
            } else {
                previewEl.innerHTML = '';
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

    const parallaxPanel = document.querySelector('[data-parallax-panel]');
    if (parallaxPanel) {
        const heroSection = document.querySelector('#home');
        const stopSelector = parallaxPanel.getAttribute('data-parallax-stop');
        const stopSection =
            (stopSelector && document.querySelector(stopSelector)) ||
            document.querySelector('#capabilities .capabilities__grid') ||
            document.querySelector('#capabilities');
        const fadeStartSelector = parallaxPanel.getAttribute('data-parallax-fade');
        const fadeEndSelector = parallaxPanel.getAttribute('data-parallax-fade-end');
        const fadeStartSection = fadeStartSelector ? document.querySelector(fadeStartSelector) : null;
        const fadeEndSection = fadeEndSelector ? document.querySelector(fadeEndSelector) : null;
        let current = 20;
        const minOffset = 20;
        const ease = 0.18;
        const maxTravel = Number(parallaxPanel.getAttribute('data-parallax-max') || 380);

        const getStopBoundary = () => {
            if (!heroSection) return 0;
            if (stopSection) {
                return stopSection.offsetTop + stopSection.offsetHeight;
            }
            return heroSection.offsetTop + heroSection.offsetHeight;
        };

        const updateParallax = () => {
            if (!heroSection) return;
            const heroTop = heroSection.offsetTop;
            const stopBoundary = getStopBoundary();
            const panelHeight = parallaxPanel.offsetHeight;
            const available = Math.min(Math.max(stopBoundary - heroTop - panelHeight - 40, 0), maxTravel);
            const scrollY = window.scrollY;
            const clampedScroll = Math.min(Math.max(scrollY - heroTop, 0), available);
            const target = minOffset + clampedScroll;
            current += (target - current) * ease;
            parallaxPanel.style.transform = `translate3d(20px, ${current}px, 0)`;
            if (fadeStartSection || fadeEndSection) {
                const fadeStartTop = fadeStartSection ? fadeStartSection.offsetTop : heroTop;
                const fadeEndTop = fadeEndSection ? fadeEndSection.offsetTop : fadeStartTop + 400;
                const fadeRange = Math.max(fadeEndTop - fadeStartTop, 1);
                const fadeProgress = Math.min(Math.max(scrollY - fadeStartTop, 0), fadeRange);
                const opacity = Math.max(0, 1 - (fadeProgress / fadeRange));
                parallaxPanel.style.opacity = opacity;
            } else {
                parallaxPanel.style.opacity = '';
            }
            requestAnimationFrame(updateParallax);
        };

        requestAnimationFrame(updateParallax);
    }

    document.addEventListener('click', async event => {
        const button = event.target.closest('.step__copy');
        if (!button) return;
        const text = button.dataset.copy || '';
        if (!text) return;
        const copyLabel = button.dataset.copyLabel || 'Copy';
        const copiedLabel = button.dataset.copiedLabel || 'Copied';
        try {
            await navigator.clipboard.writeText(text);
            button.classList.add('copied');
            button.textContent = copiedLabel;
            setTimeout(() => {
                button.classList.remove('copied');
                button.textContent = copyLabel;
            }, 1800);
        } catch (err) {
            console.warn('Clipboard unavailable', err);
            button.textContent = 'Manual copy';
            setTimeout(() => {
                button.textContent = copyLabel;
            }, 2000);
        }
    });
});
