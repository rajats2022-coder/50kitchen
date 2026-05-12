const header = document.querySelector('.site-header');
const toggle = document.querySelector('.mobile-toggle');
if (toggle && header) {
  toggle.addEventListener('click', () => {
    header.classList.toggle('open');
    toggle.setAttribute('aria-expanded', header.classList.contains('open') ? 'true' : 'false');
  });
}

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('[data-category]').forEach((item) => {
      item.style.display = filter === 'all' || item.dataset.category === filter ? '' : 'none';
    });
  });
});
