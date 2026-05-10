function enableDarkMode() {
    const e = document.documentElement;
    e.classList.add('dark');
    localStorage.setItem('is_darkmode_set', e.classList.contains('dark'));
}

function toggleDarkMode() {
    const e = document.documentElement;
    e.classList.toggle('dark');
    localStorage.setItem('is_darkmode_set', e.classList.contains('dark'));
    syncDarkModeToggleState();
}

function syncDarkModeToggleState() {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    if (!darkModeToggle) return;

    darkModeToggle.setAttribute(
        'aria-pressed',
        document.documentElement.classList.contains('dark') ? 'true' : 'false',
    );
}

function toggleBackToTop() {
    const e = document.getElementById('back-to-top');
    if (!e) return;

    if (window.scrollY === 0) e.classList.add('hidden');
    else e.classList.remove('hidden');
}

function backToTop() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
}

if (localStorage.getItem('is_darkmode_set') === 'true') enableDarkMode();
syncDarkModeToggleState();

const darkModeToggle = document.getElementById('darkmode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    backToTopButton.addEventListener('click', backToTop);
    toggleBackToTop();
}

window.addEventListener('scroll', toggleBackToTop);

