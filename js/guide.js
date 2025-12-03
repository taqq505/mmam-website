document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('guide-sidebar');
    const toggle = document.getElementById('guide-sidebar-toggle');
    const links = document.querySelectorAll('[data-guide-link]');
    const current = document.body.getAttribute('data-guide-page');

    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    links.forEach(link => {
        if (link.dataset.guideLink === current) {
            link.classList.add('bg-white/20');
        }

        link.addEventListener('click', () => {
            if (window.innerWidth < 1024 && sidebar) {
                sidebar.classList.add('-translate-x-full');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && sidebar) {
            sidebar.classList.remove('-translate-x-full');
        }
    });
});
