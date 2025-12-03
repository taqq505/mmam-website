document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('guide-sidebar');
    const toggle = document.getElementById('guide-sidebar-toggle');
    const links = document.querySelectorAll('.guide-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    const closeSidebar = () => {
        if (window.innerWidth < 1024 && sidebar && !sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
        }
    };

    links.forEach(link => {
        link.addEventListener('click', () => closeSidebar());
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    links.forEach(link => {
                        link.classList.toggle('bg-white/20', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach(section => observer.observe(section));
});
