// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu");
const navMenu = document.querySelector("nav ul.nav-menu");

if (mobileMenuButton && navMenu) {
  mobileMenuButton.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const isExpanded = navMenu.classList.contains("active");
    mobileMenuButton.setAttribute("aria-expanded", isExpanded);
    if (isExpanded) {
      mobileMenuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
      mobileMenuButton.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

// Hide header on scroll down, show on scroll up
const header = document.querySelector("header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    // Only hide after scrolling down 100px
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      header.classList.add("nav-hidden");
    } else {
      // Scrolling up
      header.classList.remove("nav-hidden");
    }
  } else {
    // Always show when close to top
    header.classList.remove("nav-hidden");
  }
  lastScrollY = window.scrollY;
});

// Dynamic Copyright Year
const currentYearSpan = document.getElementById("current-year");
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const hrefAttribute = this.getAttribute("href");
    // Ensure it's not just a placeholder # or a link to a different page section
    if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
      e.preventDefault();
      document.querySelector(hrefAttribute).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Image Gallery Functionality
const galleryItems = document.querySelectorAll(
  ".gallery-item img:not(.pet-image)"
);
if (galleryItems.length > 0) {
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Create lightbox
      const lightbox = document.createElement("div");
      lightbox.className = "lightbox";

      // Create image container
      const imgContainer = document.createElement("div");
      imgContainer.className = "lightbox-content";

      // Create image
      const img = document.createElement("img");
      img.src = this.src;

      // Create close button
      const closeBtn = document.createElement("span");
      closeBtn.className = "lightbox-close";
      closeBtn.innerHTML = "&times;";
      closeBtn.addEventListener("click", () => {
        document.body.removeChild(lightbox);
      });

      // Assemble lightbox
      imgContainer.appendChild(img);
      lightbox.appendChild(closeBtn);
      lightbox.appendChild(imgContainer);

      // Add to body
      document.body.appendChild(lightbox);

      // Close on click outside image
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
          document.body.removeChild(lightbox);
        }
      });
    });
  });
}

// Enhanced Scroll Animation System
document.addEventListener("DOMContentLoaded", () => {
  // Elements to animate
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  // Additional elements for new effects
  const fadeElements = document.querySelectorAll(".fade-in");
  const slideElements = document.querySelectorAll(".slide-in");
  const scaleElements = document.querySelectorAll(".scale-in");
  const rotateElements = document.querySelectorAll(".rotate-in");
  const staggeredElements = document.querySelectorAll(".staggered-animation");
  const parallaxElements = document.querySelectorAll(".parallax-scroll");

  // Set initial states for new animation types
  fadeElements.forEach((el) => (el.style.opacity = "0"));
  slideElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = el.classList.contains("slide-left")
      ? "translateX(-50px)"
      : el.classList.contains("slide-right")
      ? "translateX(50px)"
      : el.classList.contains("slide-up")
      ? "translateY(50px)"
      : "translateY(-50px)";
  });
  scaleElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "scale(0.8)";
  });
  rotateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "rotate(-10deg)";
  });

  // Prepare staggered elements
  let staggerGroups = {};
  staggeredElements.forEach((el) => {
    el.style.opacity = "0";
    const groupName = el.getAttribute("data-stagger-group") || "default";
    if (!staggerGroups[groupName]) {
      staggerGroups[groupName] = [];
    }
    staggerGroups[groupName].push(el);
  });

  // For each stagger group, assign sequential delay
  Object.values(staggerGroups).forEach((group) => {
    group.forEach((el, index) => {
      const delay = index * 0.15 + "s"; // 150ms delay between each element
      el.style.transitionDelay = delay;
    });
  });

  const checkIfInView = () => {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;
    const triggerPoint = windowHeight * 0.75; // Trigger when element is 75% visible

    // Original animation elements
    animatedElements.forEach((element) => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.offsetTop;
      const elementBottomPosition = elementTopPosition + elementHeight;

      // Check if element is in viewport
      if (
        elementBottomPosition >= windowTopPosition &&
        elementTopPosition <= windowBottomPosition
      ) {
        element.classList.add("animated");
      }
    });

    // New animation types
    const checkAndAnimate = (elements, className) => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= triggerPoint && rect.bottom >= 0;

        if (isInView) {
          element.classList.add(className);
          element.style.opacity = "1";
          element.style.transform = "none";
        }
      });
    };

    checkAndAnimate(fadeElements, "fade-active");
    checkAndAnimate(slideElements, "slide-active");
    checkAndAnimate(scaleElements, "scale-active");
    checkAndAnimate(rotateElements, "rotate-active");
    checkAndAnimate(staggeredElements, "staggered-active");

    // Parallax effect
    parallaxElements.forEach((element) => {
      const scrollPosition = window.scrollY;
      const speedFactor = parseFloat(
        element.getAttribute("data-parallax-speed") || "0.5"
      );
      element.style.transform = `translateY(${scrollPosition * speedFactor}px)`;
    });
  };

  // Run on initial load
  checkIfInView();

  // Run on scroll with throttling for performance
  let isScrolling = false;
  window.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        checkIfInView();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
});

// Create a scroll progress indicator
const createScrollProgressIndicator = () => {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
};

// Create a "reveal on scroll" effect for sections
const initRevealSections = () => {
  const sections = document.querySelectorAll(".reveal-section");

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    section.style.transform = "translateY(30px)";
  });

  const revealSection = () => {
    const triggerPoint = window.innerHeight * 0.8;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerPoint) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  };

  window.addEventListener("scroll", revealSection);
  revealSection(); // Check on load
};

// Add tilt effect to cards and images
const initTiltEffect = () => {
  const tiltElements = document.querySelectorAll(".tilt-effect");

  tiltElements.forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / 10;
      const tiltY = (centerX - x) / 10;

      element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });
};

// Initialize additional scroll effects when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  createScrollProgressIndicator();
  initRevealSections();
  initTiltEffect();

  // Optional: Add smooth scrolling to all internal links
  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
});

// Testimonial Slider
const setupTestimonialSlider = () => {
  const slider = document.querySelector(".testimonial-slider");
  if (!slider) return;

  const testimonials = slider.querySelectorAll(".testimonial-item");
  const prevBtn = slider.querySelector(".slider-prev");
  const nextBtn = slider.querySelector(".slider-next");

  if (testimonials.length <= 1) return;

  let currentIndex = 0;
  let autoSlideInterval;
  const autoSlideDelay = 7000;

  // Initialize slider
  const initSlider = () => {
    // Set initial state
    testimonials.forEach((item, index) => {
      if (index === 0) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Go to specified slide
  const goToSlide = (index) => {
    // Remove active class from all testimonials
    testimonials.forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to current testimonial
    testimonials[index].classList.add("active");

    // Update current index
    currentIndex = index;
  };

  // Previous slide
  const prevSlide = () => {
    const newIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(newIndex);
  };

  // Next slide
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    goToSlide(newIndex);
  };

  // Auto slide
  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  };

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoSlide(); // Reset the auto slide timer
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoSlide(); // Reset the auto slide timer
    });
  }

  // Pause auto slide on hover
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  // Initialize the slider
  initSlider();
  startAutoSlide();
};

// Run setup when DOM is loaded
document.addEventListener("DOMContentLoaded", setupTestimonialSlider);

// Back to top button
const createBackToTopButton = () => {
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = "&uarr;";
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  document.body.appendChild(backToTopBtn);

  // Show/hide based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

// Create back to top button
createBackToTopButton();

// Initialize accordion functionality
const initAccordion = () => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  if (accordionHeaders.length > 0) {
    // Close all accordion items initially
    document.querySelectorAll(".accordion-item").forEach((item) => {
      item.classList.remove("active");
      const content = item.querySelector(".accordion-content");
      if (content) {
        content.style.maxHeight = "0px";
      }
    });

    accordionHeaders.forEach((header) => {
      header.addEventListener("click", (e) => {
        e.preventDefault();
        const accordionItem = header.parentElement;

        // Toggle the active class
        const isActive = accordionItem.classList.contains("active");

        // Close all other accordion items
        document.querySelectorAll(".accordion-item.active").forEach((item) => {
          if (item !== accordionItem) {
            item.classList.remove("active");
            const content = item.querySelector(".accordion-content");
            if (content) {
              content.style.maxHeight = "0px";
            }
          }
        });

        // Toggle the clicked item
        if (isActive) {
          accordionItem.classList.remove("active");
          const content = accordionItem.querySelector(".accordion-content");
          if (content) {
            content.style.maxHeight = "0px";
          }
        } else {
          accordionItem.classList.add("active");
          const content = accordionItem.querySelector(".accordion-content");
          if (content) {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        }
      });
    });
  }
};

// Initialize FAQ functionality
const initFAQ = () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const faqItem = question.parentElement;

        // Close other open FAQ items
        document.querySelectorAll(".faq-item.active").forEach((item) => {
          if (item !== faqItem) {
            item.classList.remove("active");
          }
        });

        faqItem.classList.toggle("active");
      });
    });
  }
};

// Smooth scroll for service navigation
const initServiceNav = () => {
  const serviceNavItems = document.querySelectorAll(".service-nav-item");

  if (serviceNavItems.length > 0) {
    serviceNavItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerOffset = 80; // Reduced offset for smaller header
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Highlight active nav item
          serviceNavItems.forEach((navItem) => {
            navItem.classList.remove("active");
          });
          this.classList.add("active");
        }
      });
    });

    // Initial active state based on scroll position
    const handleScroll = () => {
      // ... existing code ...
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state
  }
};

// Initialize all service page features
document.addEventListener("DOMContentLoaded", () => {
  initAccordion();
  initFAQ();
  initServiceNav();
});

// You can add more JavaScript functionalities here as needed,
// such as form validation (though HTML5 validation is used),
// image sliders/carousels, or interactions for the Pet of the Week page.

// Prevent pet images from triggering default browser behavior
document.addEventListener("DOMContentLoaded", function () {
  // Get all pet images
  const petImages = document.querySelectorAll(".pet-image");

  // Add event listeners to prevent default behavior
  petImages.forEach(function (image) {
    image.addEventListener("click", function (e) {
      e.preventDefault();
      return false;
    });

    // Prevent dragging
    image.addEventListener("dragstart", function (e) {
      e.preventDefault();
      return false;
    });
  });
});
