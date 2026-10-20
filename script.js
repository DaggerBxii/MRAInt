// Smooth scroll for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -20px 0px",
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-section").forEach((section) => {
    observer.observe(section);
  });
} else {
  document.querySelectorAll(".fade-section").forEach((section) => {
    section.classList.add("visible");
  });
}

// Parallax header and nav scroll effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");

  if (header) {
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
    header.style.opacity = Math.max(0, 1 - scrolled / 500);
  }

  if (nav) {
    if (scrolled > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
});

// Materials Slideshow Data
const materialsData = {
  "Paper Recycling": [
    {
      name: "Old Corrugated Cardboard (OCC)",
      image: "public/images/occ_slide.png",
      description: "We collect and process high-grade corrugated cardboard boxes and packaging. These are baled to meet strict export-quality standards for global paper mills."
    },
    {
      name: "White Ledger & Sorted Office Paper",
      image: "public/images/white_ledger_slide.png",
      description: "Premium office waste including letterheads, copy paper, and notebook paper. We ensure these materials are sorted for maximum brightness and recycling yield."
    },
    {
      name: "Mixed Paper & Magazines",
      image: "public/images/mixed_paper_slide.png",
      description: "A combination of various paper grades such as magazines, mailers, and catalogs. This versatile stream is processed for use in cardboard and tissue manufacturing."
    },
    {
      name: "Newsprint & Newspapers",
      image: "public/images/newspaper.png",
      description: "Standard newspapers and newsprint materials. We collect and process these for repurposing into new paper products and insulation materials."
    },
    {
      name: "Kraft Paper",
      image: "public/images/kraft.png",
      description: "Durable brown kraft paper used in bags and industrial wrapping. Its strong fibers make it a valuable commodity in the recycling market."
    }
  ],
  "Metal Recycling": [
    {
      name: "Ferrous Metals (Steel & Iron)",
      image: "public/images/ferrous_metals.png",
      description: "Handling all types of scrap steel and iron. From industrial offcuts to structural beams, we process ferrous materials for heavy manufacturing reuse."
    },
    {
      name: "Aluminum (Cans & Sheets)",
      image: "public/images/aluminum_cans_slide.png",
      description: "Recycling beverage cans and sheet frames. Aluminum is infinitely recyclable, saving up to 95% of the energy needed to produce it from scratch."
    },
    {
      name: "Copper (Wires, Pipes, Motors)",
      image: "public/images/copper.png",
      description: "Processing various copper grades including industrial wiring, plumbing pipes, and electric motors. Copper is a critical material for modern infrastructure."
    },
    {
      name: "Brass & Lead",
      image: "public/images/brass.png",
      description: "Safe handling of brass fixtures, valves, and hardware, alongside lead batteries and industrial scrap. We ensure all hazardous materials are handled responsibly."
    },
    {
      name: "Stainless Steel & Zinc",
      image: "public/images/zinc.png",
      description: "Managing kitchen and automotive stainless steel parts, plus zinc roofing and die-cast items. We sort by alloy to ensure the highest recovery value."
    }
  ],
  "Plastic Recycling": [
    {
      name: "PET (Water & Beverage Bottles)",
      image: "public/images/pet_bottles.jpg",
      description: "Polyethylene Terephthalate is the most common plastic for beverage containers. We process it into clean flakes and bales for new products."
    },
    {
      name: "HDPE (Detergent & Milk Jugs)",
      image: "public/images/detergent.png",
      description: "High-Density Polyethylene from milk jugs, shampoo bottles, and detergent containers. A robust plastic that is highly valued for repurposing."
    },
    {
      name: "PVC & LDPE (Pipes & Films)",
      image: "public/images/pvc_pipes.jpg",
      description: "Managing PVC construction pipes and LDPE wrapping films or plastic bags. We use specialized sorting to ensure these complex plastics are recycled correctly."
    },
    {
      name: "PP, PS & Mixed Plastics",
      image: "public/images/mixed_plastics.jpg",
      description: "Handling Polypropylene (caps, food containers), Polystyrene (styrofoam), and assorted non-hazardous mixed plastics for comprehensive waste diversion."
    }
  ]
};

// Modal and Slideshow Logic
const modal = document.getElementById("material-modal");
const modalContent = document.getElementById("slideshow-container");
const dotsContainer = document.getElementById("slide-dots");
const closeBtn = document.querySelector(".close-modal");
const prevBtn = document.getElementById("prev-slide");
const nextBtn = document.getElementById("next-slide");

let currentSlideIndex = 0;
let currentSlidesData = [];

function openSlideshow(categoryName) {
  const cleanCategoryName = categoryName.trim();

  const matchingKey = Object.keys(materialsData).find(
    key => key.toLowerCase() === cleanCategoryName.toLowerCase()
  );

  currentSlidesData = materialsData[matchingKey || cleanCategoryName] || [];

  if (currentSlidesData.length === 0 || !modal || !modalContent || !dotsContainer) {
    console.error("No slideshow data found for category:", cleanCategoryName);
    return;
  }

  currentSlideIndex = 0;
  renderSlides();
  modal.classList.add("visible");
  document.body.style.overflow = "hidden";
}

function renderSlides() {
  modalContent.innerHTML = "";
  dotsContainer.innerHTML = "";

  currentSlidesData.forEach((slide, index) => {
    const slideEl = document.createElement("div");
    slideEl.className = `slide ${index === 0 ? "active" : ""}`;

    const imageContainer = document.createElement("div");
    imageContainer.className = "slide-image";

    const img = document.createElement("img");
    img.src = slide.image;
    img.alt = slide.name;
    imageContainer.appendChild(img);

    const info = document.createElement("div");
    info.className = "slide-info";

    const heading = document.createElement("h2");
    heading.textContent = slide.name;

    const description = document.createElement("p");
    description.textContent = slide.description;

    info.appendChild(heading);
    info.appendChild(description);
    slideEl.appendChild(imageContainer);
    slideEl.appendChild(info);
    modalContent.appendChild(slideEl);

    const dot = document.createElement("span");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("aria-label", `Show slide ${index + 1}`);

    dot.addEventListener("click", () => showSlide(index));
    dot.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showSlide(index);
      }
    });

    dotsContainer.appendChild(dot);
  });
}

function showSlide(index) {
  if (!modalContent || !dotsContainer) return;

  const slides = modalContent.querySelectorAll(".slide");
  const dots = dotsContainer.querySelectorAll(".dot");

  if (slides.length === 0) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlideIndex = index;
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => showSlide(currentSlideIndex - 1));
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => showSlide(currentSlideIndex + 1));
}

function closeSlideshow() {
  if (modal) modal.classList.remove("visible");
  document.body.style.overflow = "";
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeSlideshow);
}

if (modal) {
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeSlideshow();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("visible")) {
      closeSlideshow();
    }
  });
}

// Handle Material Card Clicks
document.querySelectorAll(".material-card").forEach(card => {
  card.style.cursor = "pointer";

  card.addEventListener("click", () => {
    const titleEl = card.querySelector("h3");
    const title = titleEl ? titleEl.innerText : "";
    openSlideshow(title);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (event.target.closest("a, button")) return;
      event.preventDefault();
      const titleEl = card.querySelector("h3");
      if (titleEl) openSlideshow(titleEl.innerText);
    }
  });
});

// Prevent material buttons from triggering the slideshow
document.querySelectorAll(".material-btn").forEach(btn => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

// CEO image interaction
const ceoImage = document.querySelector(".ceo-image");

if (ceoImage) {
  ceoImage.addEventListener("mousemove", (event) => {
    const rect = ceoImage.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const rotateX = y / 20;
    const rotateY = -x / 20;

    ceoImage.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  ceoImage.addEventListener("mouseleave", () => {
    ceoImage.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
}

// Mobile Menu Toggle Logic
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinksContainer = document.querySelector("nav ul");
const navLinks = document.querySelectorAll("nav ul li a");

if (mobileMenuToggle && navLinksContainer) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    navLinksContainer.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    const isExpanded = mobileMenuToggle.classList.contains("active");
    mobileMenuToggle.setAttribute("aria-expanded", String(isExpanded));
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      navLinksContainer.classList.remove("active");
      document.body.classList.remove("menu-open");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !navLinksContainer.contains(event.target) &&
      !mobileMenuToggle.contains(event.target) &&
      navLinksContainer.classList.contains("active")
    ) {
      mobileMenuToggle.classList.remove("active");
      navLinksContainer.classList.remove("active");
      document.body.classList.remove("menu-open");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Contact Form Handling
// Opens the visitor's email app with the message prepared.
// The visitor must press Send in their email application.
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Basic browser email validation
    const emailInput = document.getElementById("email");
    if (emailInput && !emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    const recipient = "mukesh@mraintltd.com";
    const emailSubject = subject || `Website inquiry from ${name}`;

    const emailBody =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`;

    const mailtoLink =
      `mailto:${recipient}` +
      `?subject=${encodeURIComponent(emailSubject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    // Open the visitor's default email application
    window.location.href = mailtoLink;
  });
}

console.log("MRA International - Scripts initialized.");
