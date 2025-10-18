// === Time in milliseconds ===
const timeEl = document.querySelector('[data-testid="test-user-time"]');
function updateTime() { timeEl.textContent = String(Date.now()); }
updateTime();
setInterval(updateTime, 1000);

// Theme toggle buttons
const themeButtons = Array.from(document.querySelectorAll('[data-theme-control]'));
const storedTheme = localStorage.getItem('hng_theme');
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.setAttribute('data-theme', 'light');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
}

function updateThemeButtons(active) {
  themeButtons.forEach((button) => {
    const buttonTheme = button.getAttribute('data-theme-control');
    button.setAttribute('aria-pressed', String(buttonTheme === active));
  });
}

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
