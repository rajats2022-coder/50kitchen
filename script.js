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

const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
if (heroSlides.length > 1) {
  let heroSlideIndex = 0;
  window.setInterval(() => {
    heroSlides[heroSlideIndex].classList.remove('active');
    heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
    heroSlides[heroSlideIndex].classList.add('active');
  }, 4200);
}

const mobileStoryTrigger = document.querySelector('#mobileStoryTrigger');
const storyModal = document.querySelector('#storyModal');
const storyModalClose = document.querySelector('#storyModalClose');
if (mobileStoryTrigger && storyModal) {
  mobileStoryTrigger.addEventListener('click', () => {
    if (typeof storyModal.showModal === 'function') storyModal.showModal();
    else storyModal.setAttribute('open', '');
  });
}
if (storyModalClose && storyModal) {
  storyModalClose.addEventListener('click', () => storyModal.close());
  storyModal.addEventListener('click', (event) => {
    if (event.target === storyModal) storyModal.close();
  });
}

function openFeatureModal(modal) {
  if (!modal) return;
  if (typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open', '');
}

document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    const nestedInteractive = event.target.closest('a, iframe');
    if (nestedInteractive && trigger.contains(nestedInteractive)) return;
    openFeatureModal(document.getElementById(trigger.dataset.openModal));
  });
  trigger.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openFeatureModal(document.getElementById(trigger.dataset.openModal));
  });
});

document.querySelectorAll('dialog').forEach((modal) => {
  modal.querySelectorAll('[data-close-modal], .story-modal-close').forEach((button) => {
    button.addEventListener('click', () => modal.close());
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
});


document.querySelectorAll('dialog a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    const modal = link.closest('dialog');
    if (!target || !modal) return;
    event.preventDefault();
    modal.close();
    window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  });
});
