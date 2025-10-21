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

// Contact form validation
const contactForm = document.querySelector('[data-testid="test-contact-form"]');
if (contactForm) {
  const successMessage = contactForm.querySelector('[data-testid="test-contact-success"]');
  const formFields = contactForm.querySelector('[data-testid="test-contact-fields"]');

  const fields = [
    {
      input: contactForm.querySelector('[data-testid="test-contact-name"]'),
      error: contactForm.querySelector('[data-testid="test-contact-error-name"]'),
      validate: (value) => (value.trim().length ? '' : 'Please enter your full name.')
    },
    {
      input: contactForm.querySelector('[data-testid="test-contact-email"]'),
      error: contactForm.querySelector('[data-testid="test-contact-error-email"]'),
      validate: (value) => {
        if (!value.trim()) return 'Please enter your email address.';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value.trim()) ? '' : 'Enter a valid email like name@example.com.';
      }
    },
    {
      input: contactForm.querySelector('[data-testid="test-contact-subject"]'),
      error: contactForm.querySelector('[data-testid="test-contact-error-subject"]'),
      validate: (value) => (value.trim().length ? '' : 'Please add a subject.')
    },
    {
      input: contactForm.querySelector('[data-testid="test-contact-message"]'),
      error: contactForm.querySelector('[data-testid="test-contact-error-message"]'),
      validate: (value) => {
        const trimmed = value.trim();
        if (!trimmed.length) return 'Please include a message.';
        if (trimmed.length < 10) return 'Your message must be at least 10 characters.';
        return '';
      }
    }
  ];

  const setFieldState = (field, message) => {
    if (!field.input || !field.error) return;
    if (message) {
      field.input.setAttribute('aria-invalid', 'true');
      field.error.textContent = message;
      field.error.hidden = false;
    } else {
      field.input.removeAttribute('aria-invalid');
      field.error.textContent = '';
      field.error.hidden = true;
    }
  };

  const validateField = (field) => {
    const value = field.input?.value ?? '';
    const message = field.validate(value);
    setFieldState(field, message);
    return !message;
  };

  fields.forEach((field) => {
    if (!field.input) return;
    setFieldState(field, '');
    field.input.addEventListener('input', () => {
      validateField(field);
      if (successMessage) {
        successMessage.hidden = true;
      }
    });
    field.input.addEventListener('blur', () => validateField(field));
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;
    fields.forEach((field) => {
      const ok = validateField(field);
      if (!ok) isValid = false;
    });
    if (!successMessage) return;
    if (isValid) {
      successMessage.classList.remove('hidden');
      formFields.classList.add('hidden');
    } else {
      successMessage.classList.add('hidden');
      const firstInvalid = fields.find((field) => field.input?.getAttribute('aria-invalid') === 'true');
      firstInvalid?.input?.focus();
    }
  });
  successMessage.querySelector('button').addEventListener('click', () => {
    contactForm.reset();
    fields.forEach((field) => setFieldState(field, ''));
    successMessage.classList.add('hidden');
    formFields.classList.remove('hidden');
    contactForm.querySelector('[data-testid="test-contact-name"]').focus();
  })
}