// Smooth scroll for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href")

    if (targetId.startsWith("#")) {
      e.preventDefault()
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-section").forEach((section) => {
  observer.observe(section)
})

// Parallax header and nav scroll effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const header = document.querySelector("header")
  const nav = document.querySelector("nav")

  if (header) {
    header.style.transform = `translateY(${scrolled * 0.5}px)`
    header.style.opacity = 1 - scrolled / 500
  }

  if (nav) {
    if (scrolled > 100) {
      nav.classList.add("scrolled")
    } else {
      nav.classList.remove("scrolled")
    }
  }
})

// Materials Slideshow Data - COMPREHENSIVE LIST
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
      image: "public/images/metal_recycling.png",
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
      image: "public/images/plastic_recycling.png",
      description: "Polyethylene Terephthalate is the most common plastic for beverage containers. We process it into clean flakes and bales for new products."
    },
    {
      name: "HDPE (Detergent & Milk Jugs)",
      image: "public/images/plastic_recycling.png",
      description: "High-Density Polyethylene from milk jugs, shampoo bottles, and detergent containers. A robust plastic that is highly valued for repurposing."
    },
    {
      name: "PVC & LDPE (Pipes & Films)",
      image: "public/images/plastic_recycling.png",
      description: "Managing PVC construction pipes and LDPE wrapping films or plastic bags. We use specialized sorting to ensure these complex plastics are recycled correctly."
    },
    {
      name: "PP, PS & Mixed Plastics",
      image: "public/images/plastic_recycling.png",
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
  currentSlidesData = materialsData[categoryName] || [];
  if (currentSlidesData.length === 0) return;

  currentSlideIndex = 0;
  renderSlides();
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("visible"), 10);
  document.body.style.overflow = "hidden"; // Prevent scroll
}

function renderSlides() {
  modalContent.innerHTML = "";
  dotsContainer.innerHTML = "";

  currentSlidesData.forEach((slide, index) => {
    const slideEl = document.createElement("div");
    slideEl.className = `slide ${index === 0 ? "active" : ""}`;
    slideEl.innerHTML = `
      <div class="slide-image">
        <img src="${slide.image}" alt="${slide.name}">
      </div>
      <div class="slide-info">
        <h3>${slide.name}</h3>
        <p>${slide.description}</p>
      </div>
    `;
    modalContent.appendChild(slideEl);

    const dot = document.createElement("span");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.onclick = () => showSlide(index);
    dotsContainer.appendChild(dot);
  });
}

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlideIndex = index;
}

prevBtn.onclick = () => showSlide(currentSlideIndex - 1);
nextBtn.onclick = () => showSlide(currentSlideIndex + 1);

closeBtn.onclick = function () {
  modal.classList.remove("visible");
  setTimeout(() => modal.style.display = "none", 400);
  document.body.style.overflow = "auto";
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeBtn.onclick();
  }
};

// Handle Card Clicks
document.querySelectorAll(".material-card").forEach(card => {
  card.style.cursor = "pointer";
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent;
    openSlideshow(title);
  });
});

// Prevent buttons from triggering the slideshow
document.querySelectorAll(".material-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

// CEO image interaction (from original script)
const ceoImage = document.querySelector(".ceo-image")
if (ceoImage) {
  ceoImage.addEventListener("mousemove", (e) => {
    const rect = ceoImage.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = y / 20
    const rotateY = -x / 20
    ceoImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
  })
  ceoImage.addEventListener("mouseleave", () => {
    ceoImage.style.transform = "rotateX(0) rotateY(0) scale(1)"
  })
}

console.log("MRA International - Scripts initialized.");
