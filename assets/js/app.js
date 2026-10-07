const products = [
  {file:'01-gold-crystal-hookah.png', title:'Inferno Gold Crystal', category:'gold'},
  {file:'02-carbon-gold-hose-hookah.png', title:'Carbon Gold Classic', category:'gold'},
  {file:'03-blue-spring-purple-hookah.png', title:'Midnight Blue Spring', category:'blue'},
  {file:'04-ruby-crystal-hookah.png', title:'Ruby Crystal', category:'red'},
  {file:'05-red-sport-hookah.png', title:'Red Sport Edition', category:'red'},
  {file:'06-copper-gold-cutglass-hookah.png', title:'Copper Ember', category:'gold'},
  {file:'07-blue-diamond-speckled-hookah.png', title:'Blue Diamond Flame', category:'blue'},
  {file:'08-portable-black-shisha.png', title:'Black Portable', category:'special'},
  {file:'09-black-gold-crystal-hookah.png', title:'Black Gold Tower', category:'gold'},
  {file:'10-compact-white-pink-shisha.png', title:'Pearl Compact', category:'special'},
  {file:'11-blue-diamond-crystal-hookah.png', title:'Electric Blue Crystal', category:'blue'},
  {file:'12-blue-spring-smoke-hookah.png', title:'Blue Spring Smoke', category:'blue'},
  {file:'13-red-glass-hookah.png', title:'Crimson Glass', category:'red'},
  {file:'14-red-crystal-longstem-hookah.png', title:'Ruby Longstem', category:'red'},
  {file:'15-red-slim-crystal-hookah.png', title:'Scarlet Slim', category:'red'},
  {file:'16-white-marble-hookah.png', title:'White Marble Signature', category:'special'},
  {file:'17-blue-angular-hookah.png', title:'Blue Angular', category:'blue'},
  {file:'18-red-amber-glass-hookah.png', title:'Amber Red Classic', category:'red'},
  {file:'19-blue-spring-marble-hookah.png', title:'Blue Marble Spring', category:'blue'},
  {file:'20-white-marble-signature-hookah.png', title:'Marble Hell Edition', category:'special'}
];

const gallery = document.querySelector('#gallery');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let activeIndex = 0;

function renderGallery(filter='all') {
  gallery.innerHTML = '';
  products.forEach((product, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'gallery-card';
    card.dataset.category = product.category;
    if (filter !== 'all' && product.category !== filter) card.hidden = true;
    card.innerHTML = `
      <img src="assets/images/gallery/${product.file}" alt="${product.title} hookah in Smok'in Hell red neon lounge" loading="lazy">
      <span class="gallery-meta"><strong>${product.title}</strong><span>View</span></span>`;
    card.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(card);
  });
}

function openLightbox(index) {
  activeIndex = index;
  const product = products[index];
  lightboxImage.src = `assets/images/gallery/${product.file}`;
  lightboxImage.alt = `${product.title} hookah`;
  lightboxCaption.textContent = product.title;
  lightbox.showModal();
}

function changeImage(direction) {
  activeIndex = (activeIndex + direction + products.length) % products.length;
  const p = products[activeIndex];
  lightboxImage.src = `assets/images/gallery/${p.file}`;
  lightboxImage.alt = `${p.title} hookah`;
  lightboxCaption.textContent = p.title;
}

renderGallery();

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
    button.classList.add('is-active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.gallery-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => changeImage(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => changeImage(1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
document.addEventListener('keydown', event => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft') changeImage(-1);
  if (event.key === 'ArrowRight') changeImage(1);
});

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}));
