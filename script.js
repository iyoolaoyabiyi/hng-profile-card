// Theme toggle
const themeButtons = Array.from(document.querySelectorAll('[data-theme-control]'));
const storedTheme = localStorage.getItem('hng_theme');
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)');

if (themeButtons.length) {
  const initial = storedTheme || (prefersDark?.matches ? 'dark' : 'light');
  applyTheme(initial);
  updateThemeButtons(initial);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosen = button.getAttribute('data-theme-control') === 'light' ? 'light' : 'dark';
      applyTheme(chosen);
      updateThemeButtons(chosen);
      localStorage.setItem('hng_theme', chosen);
    });
  });

  if (!storedTheme && prefersDark && typeof prefersDark.addEventListener === 'function') {
    const handleMediaChange = (event) => {
      const nextTheme = event.matches ? 'dark' : 'light';
      applyTheme(nextTheme);
      updateThemeButtons(nextTheme);
    };
    prefersDark.addEventListener('change', handleMediaChange);
  }
} else if (storedTheme) {
  applyTheme(storedTheme);
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function updateThemeButtons(active) {
  themeButtons.forEach((button) => {
    const buttonTheme = button.getAttribute('data-theme-control');
    button.setAttribute('aria-pressed', String(buttonTheme === active));
  });
}

// Time
const timeEl = document.querySelector('[data-testid="test-user-time"]');
function updateTime() { timeEl.textContent = String(Date.now()); }
if (timeEl) {
  updateTime();
  setInterval(updateTime, 1000);
}
