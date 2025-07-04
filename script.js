// script.js
// Placeholder for interactivity (e.g., mobile menu toggle)

// Example: Mobile menu toggle (to be implemented if needed)
// document.querySelector('.menu-toggle').addEventListener('click', function() {
//   document.querySelector('.nav-links').classList.toggle('active');
// }); 

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
if (menuToggle && navbar) {
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });
} 

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    // Close all other items
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });
    // Toggle current item
    item.classList.toggle('active');
  });
}); 

// Fade-in on scroll for sections
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new window.IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => fadeObserver.observe(el)); 

// Seamless marquee logo duplication and dynamic width for perfect loop
window.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.logos-track');
  if (track) {
    // Only duplicate if not already duplicated
    if (track.children.length <= 8) {
      track.innerHTML += track.innerHTML;
    }
    // Measure width of one set
    const logos = track.querySelectorAll('.partner-logo');
    const setLength = logos.length / 2;
    let setWidth = 0;
    for (let i = 0; i < setLength; i++) {
      setWidth += logos[i].offsetWidth + parseFloat(getComputedStyle(logos[i]).marginLeft) + parseFloat(getComputedStyle(logos[i]).marginRight);
    }
    track.style.width = (setWidth * 2) + 'px';
    track.style.setProperty('--marquee-width', setWidth + 'px');
  }
}); 

// Rotating hero words
window.addEventListener('DOMContentLoaded', () => {
  const words = document.querySelectorAll('.rotating-words .rotating-word');
  let idx = 0;
  setInterval(() => {
    words[idx].classList.remove('visible');
    idx = (idx + 1) % words.length;
    words[idx].classList.add('visible');
  }, 5000);
}); 