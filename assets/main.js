'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);


document.addEventListener('DOMContentLoaded', function() {
  const popup = document.getElementById('timed-popup');
  const closeBtn = document.getElementById('close-popup');
  let popupTimer;

  // Show popup
  popup.style.display = 'block';
  
  // Set timer to hide popup after 10 seconds
  popupTimer = setTimeout(function() {
    popup.style.display = 'none';
  }, 10000);

  // Close button functionality
  closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
    clearTimeout(popupTimer); // Clear the timer when manually closed
  });
});



const scrollToTopButton = document.getElementById("scroll-to-top");

// Function to scroll to the top
const scrollToTop = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scrolling effect
  });
}

// Event listener for button click
scrollToTopButton.addEventListener("click", scrollToTop);

// Optional: Show/hide the button based on scroll position
const toggleScrollToTopButton = function () {
  if (window.scrollY > 100) {
    scrollToTopButton.style.display = "block"; // Show button
  } else {
    scrollToTopButton.style.display = "none"; // Hide button
  }
}

// Event listener for scroll event
window.addEventListener("scroll", toggleScrollToTopButton);

// Initial call to set the button state
toggleScrollToTopButton();






document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
      const answer = button.nextElementSibling;

      // Toggle the active class
      button.classList.toggle('active');

      // Expand or collapse the answer
      if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
      } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
      }
  });
});


const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
let interval;

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

createDots();
updateSlider();
resetInterval();













