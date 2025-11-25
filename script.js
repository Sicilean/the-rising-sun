// ============================================
// NavBar Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('home');

function handleNavbarScroll() {
  const heroHeight = heroSection.offsetHeight;
  const scrollPosition = window.scrollY;

  if (scrollPosition > heroHeight - 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll);
window.addEventListener('load', handleNavbarScroll);

// ============================================
// Mobile Menu Toggle
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ============================================
// Gallery Lightbox
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map(item => {
  return item.querySelector('img').src;
});

// Open lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
});

// Close lightbox
lightboxClose.addEventListener('click', () => {
  closeLightbox();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox('prev');
    } else if (e.key === 'ArrowRight') {
      navigateLightbox('next');
    }
  }
});

// Previous/Next navigation
lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  navigateLightbox('prev');
});

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  navigateLightbox('next');
});

function navigateLightbox(direction) {
  if (direction === 'prev') {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  } else {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  }
  updateLightboxImage();
}

function updateLightboxImage() {
  lightboxImg.src = galleryImages[currentImageIndex];
  lightboxImg.alt = `Gallery immagine ${currentImageIndex + 1}`;
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.punto-forza, .gallery-item, .selinunte-content, .selinunte-image');
animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ============================================
// Lazy Loading Enhancement
// ============================================
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ============================================
// WhatsApp Floating Button Handler
// ============================================
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
  whatsappFloat.addEventListener('click', (e) => {
    // The link should be properly formatted in HTML
    // This is just for tracking/analytics if needed
    console.log('WhatsApp floating button clicked');
  });
}

// ============================================
// Performance Optimization
// ============================================
// Throttle scroll events
let ticking = false;

function optimizedScroll() {
  handleNavbarScroll();
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(optimizedScroll);
    ticking = true;
  }
});

// ============================================
// Console Message
// ============================================
console.log('%cThe Rising Sun', 'color: #1c8791; font-size: 24px; font-weight: bold;');
console.log('%cSviluppato da Sicilean', 'color: #189db3; font-size: 14px;');
console.log('%chttps://www.sicilean.tech', 'color: #73c2cd; font-size: 12px;');
