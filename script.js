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

// Mobile navigation toggle
window.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
    // Optional: close menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const isMobile = window.innerWidth <= 600;
      if (!isMobile) return;
      if (
        mobileNav.classList.contains('active') &&
        !mobileNav.contains(e.target) &&
        e.target !== menuBtn &&
        !menuBtn.contains(e.target)
      ) {
        mobileNav.classList.remove('active');
      }
    });
  }
}); 

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.event-type-card');
  if (!cards.length) return;
  let current = 0;
  let interval;

  function updateCards() {
    cards.forEach((card, idx) => {
      card.classList.remove('active', 'prev', 'next');
      if (idx === current) {
        card.classList.add('active');
      } else if (idx === (current - 1 + cards.length) % cards.length) {
        card.classList.add('prev');
      } else if (idx === (current + 1) % cards.length) {
        card.classList.add('next');
      }
    });
  }

  function nextCard() {
    current = (current + 1) % cards.length;
    updateCards();
  }

  function startAutoSlide() {
    interval = setInterval(nextCard, 2500); // 2.5 seconds
  }

  updateCards();
  startAutoSlide();

  // Optional: Pause on hover (desktop)
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => clearInterval(interval));
    card.addEventListener('mouseleave', startAutoSlide);
  });

  // Customer Stories Carousel
  const storyCards = document.querySelectorAll('.customer-story-card');
  const prevBtn = document.querySelector('.customer-stories-prev');
  const nextBtn = document.querySelector('.customer-stories-next');
  const dotsContainer = document.querySelector('.customer-stories-dots');
  let storyCurrent = 0;
  let storyInterval;

  if (storyCards.length) {
    function updateStoryCards() {
      storyCards.forEach((card, idx) => {
        card.classList.remove('active', 'prev', 'next');
        if (idx === storyCurrent) {
          card.classList.add('active');
        } else if (idx === (storyCurrent - 1 + storyCards.length) % storyCards.length) {
          card.classList.add('prev');
        } else if (idx === (storyCurrent + 1) % storyCards.length) {
          card.classList.add('next');
        }
      });
      // Update dots
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < storyCards.length; i++) {
          const dot = document.createElement('span');
          if (i === storyCurrent) dot.classList.add('active');
          dot.addEventListener('click', () => {
            storyCurrent = i;
            updateStoryCards();
            resetStoryInterval();
          });
          dotsContainer.appendChild(dot);
        }
      }
    }

    function nextStory() {
      storyCurrent = (storyCurrent + 1) % storyCards.length;
      updateStoryCards();
    }
    function prevStory() {
      storyCurrent = (storyCurrent - 1 + storyCards.length) % storyCards.length;
      updateStoryCards();
    }
    function startStoryInterval() {
      storyInterval = setInterval(nextStory, 3500);
    }
    function resetStoryInterval() {
      clearInterval(storyInterval);
      startStoryInterval();
    }
    updateStoryCards();
    startStoryInterval();
    if (nextBtn) nextBtn.addEventListener('click', () => { nextStory(); resetStoryInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevStory(); resetStoryInterval(); });
    // Pause on hover (desktop)
    storyCards.forEach(card => {
      card.addEventListener('mouseenter', () => clearInterval(storyInterval));
      card.addEventListener('mouseleave', startStoryInterval);
    });
  }
}); 