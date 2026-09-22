const header = document.querySelector('#site-header');
const progress = document.querySelector('#scroll-progress');
const navLinks = document.querySelector('#nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const backTop = document.querySelector('.back-top');
const toast = document.querySelector('.toast');

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
};

const updateScrollState = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percentage}%`;
  header.classList.toggle('scrolled', window.scrollY > 24);
  backTop.classList.toggle('visible', window.scrollY > 500);
};
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const storedTheme = localStorage.getItem('bashid-theme');
if (storedTheme === 'light') document.documentElement.dataset.theme = 'light';
themeToggle.addEventListener('click', () => {
  const light = document.documentElement.dataset.theme !== 'light';
  document.documentElement.dataset.theme = light ? 'light' : '';
  localStorage.setItem('bashid-theme', light ? 'light' : 'dark');
  themeToggle.setAttribute('aria-label', light ? 'Toggle dark theme' : 'Toggle light theme');
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('.placeholder-link').forEach((link) => link.addEventListener('click', (event) => {
  if (link.getAttribute('href') === '#') {
    event.preventDefault();
    showToast(`Replace this placeholder with your ${link.dataset.label || 'link'}.`);
  }
}));

const terminalOutput = document.querySelector('#terminal-output');
const terminalLines = [
  ['$ whoami', 'bashid-ahmed'],
  ['$ skills', 'HTML · CSS · JavaScript · Web Development · Automation'],
  ['$ current_focus', 'Building useful digital experiences'],
];
let terminalIndex = 0;
const typeTerminalLine = () => {
  if (terminalIndex >= terminalLines.length) return;
  const [command, output] = terminalLines[terminalIndex];
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.innerHTML = `<span class="prompt"></span><span class="output"></span>`;
  terminalOutput.appendChild(line);
  const prompt = line.querySelector('.prompt');
  const outputElement = line.querySelector('.output');
  let characterIndex = 0;
  const typeCommand = () => {
    prompt.textContent = command.slice(0, characterIndex);
    characterIndex += 1;
    if (characterIndex <= command.length) window.setTimeout(typeCommand, 34);
    else window.setTimeout(() => {
      outputElement.textContent = output;
      terminalIndex += 1;
      window.setTimeout(typeTerminalLine, 320);
    }, 180);
  };
  typeCommand();
};
const terminalObserver = new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    typeTerminalLine();
    observer.disconnect();
  }
}, { threshold: 0.4 });
terminalObserver.observe(document.querySelector('.terminal-wrap'));

const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    formNote.textContent = 'Please complete each field with a valid value.';
    contactForm.reportValidity();
    return;
  }
  formNote.textContent = 'Thanks. Connect your form service to send this message.';
  showToast('Message ready to be connected.');
  contactForm.reset();
});
