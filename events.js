
/* =========================================================
   MRA INTERNATIONAL — EVENTS TIMELINE
   ========================================================= */

const EVENT_CONTACT = {
  address: "8 St. Lucia Crescent, The Hub, Kingston, Jamaica",
  email: "mukesh@mraintltd.com",
};

// Event data
const eventData = {
  1: {
    title: "ReMA 2026 Convention & Exposition",
    date: "April 13–16, 2026",
    location: "Mandalay Bay, Las Vegas, Nevada, U.S.A.",
    description:
      "The ReMA 2026 Convention & Exposition brought together professionals from across the recycling industry to discuss developments in materials recovery, commodity markets, recycling technology, and the circular economy. The convention provided a platform for industry networking, knowledge-sharing, and exploring opportunities across the global recycled-materials supply chain. For MRA International, the event's industry focus aligns with our work in the international trade of recyclable metals, paper, and plastics.",
    images: [
      "public/images/rema-2026/rema1.jpeg",
      "public/images/rema-2026/rema2.jpeg",
      "public/images/rema-2026/rema3.jpeg",
    ],
  },

  2: {
    title: "Plastics Recycling Conference 2026",
    date: "February 23–25, 2026",
    location: "San Diego, California, U.S.A.",
    description:
      "The Plastics Recycling Conference 2026 brought together professionals from across the plastics recycling value chain to discuss market developments, policy, recycling infrastructure, and emerging technologies. Key industry topics included extended producer responsibility, improvements in recycled-resin quality, and approaches to expanding plastics recovery. These discussions highlight the importance of collaboration and innovation in building more effective recycling systems and advancing the circular use of plastics.",
    images: [
      "public/images/prc-2026/prc1.jpeg",
      "public/images/prc-2026/prc2.jpeg",
      "public/images/prc-2026/prc3.jpeg",
    ],
  },

  3: {
    title: "ReMA 2025 Convention & Exposition",
    date: "May 12–15, 2025",
    location: "San Diego, California, U.S.A.",
    description:
      "The ReMA 2025 Convention & Exposition brought together professionals from the recycled-materials industry for several days of networking, education, and discussion. Topics across the industry included recycled commodities, international trade, sustainability, market trends, and advances in recycling equipment and technology. The event offered opportunities to learn about developments affecting the sourcing, processing, and movement of recyclable materials around the world.",
    images: [
      "public/images/rema1.cr2",
      "public/images/rema2.cr2",
      "public/images/rema3.cr2",
    ],
  },

  4: {
    title: "Plastics Recycling Conference 2024",
    date: "March 25–27, 2024",
    location: "Grapevine, Texas, U.S.A.",
    description:
      "The Plastics Recycling Conference 2024 focused on the business, policy, and technology shaping plastics recycling. Industry discussions addressed regulation, market conditions, recycling infrastructure, processing technologies, and design for recyclability. The conference provided an opportunity to learn about the challenges and opportunities facing the plastics recycling sector and the work needed to support more effective recovery and reuse of plastic materials.",
    images: [
      "public/images/psc1.cr2",
      "public/images/psc2.cr2",
      "public/images/psc3.cr2",
    ],
  },

  5: {
    title: "ISRI 2023 Convention & Exposition",
    date: "April 17–20, 2023",
    location: "Music City Center, Nashville, Tennessee, U.S.A.",
    description:
      "The ISRI 2023 Convention & Exposition brought together members of the recycling industry for educational sessions, professional networking, and discussions about the industry's direction. Topics included international market developments, changing industry conditions, recycling trends, and opportunities for collaboration. The event highlighted the importance of sharing knowledge and adapting to changes in the global recycled-materials market.",
    images: [
      "public/images/isri1.cr2",
      "public/images/isri2.cr2",
      "public/images/isri3.cr2",
    ],
  },
};

/* =========================================================
   TIMELINE ANIMATIONS
   ========================================================= */

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  }
);

document.querySelectorAll(".timeline-item").forEach((item) => {
  timelineObserver.observe(item);
});

/* =========================================================
   EVENT MODAL
   ========================================================= */

const modal = document.getElementById("eventModal");
const closeModalBtn = document.querySelector(".close-modal");
const viewDetailsBtns = document.querySelectorAll(".view-details-btn");

const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalDescription = document.getElementById("modalDescription");
const modalGallery = document.getElementById("modalGallery");

let previouslyFocusedElement = null;

function closeEventModal() {
  if (!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = "";

  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
}

function renderEventContact() {
  if (!modalDescription) return;

  const modalBody = modalDescription.parentElement;
  if (!modalBody) return;

  // Create the contact section only once.
  let contactSection = document.getElementById("modalContact");

  if (!contactSection) {
    contactSection = document.createElement("section");
    contactSection.id = "modalContact";
    contactSection.className = "modal-contact";
    contactSection.setAttribute("aria-label", "MRA International contact details");

    modalBody.appendChild(contactSection);
  }

  contactSection.replaceChildren();

  const heading = document.createElement("h3");
  heading.textContent = "Contact MRA International";
  contactSection.appendChild(heading);

  const addressRow = document.createElement("p");
  const addressLabel = document.createElement("strong");
  addressLabel.textContent = "Address: ";
  addressRow.appendChild(addressLabel);
  addressRow.appendChild(document.createTextNode(EVENT_CONTACT.address));
  contactSection.appendChild(addressRow);

  const emailRow = document.createElement("p");
  const emailLabel = document.createElement("strong");
  emailLabel.textContent = "Email: ";
  emailRow.appendChild(emailLabel);

  const emailLink = document.createElement("a");
  emailLink.href = `mailto:${EVENT_CONTACT.email}`;
  emailLink.textContent = EVENT_CONTACT.email;
  emailLink.setAttribute("aria-label", `Email ${EVENT_CONTACT.email}`);

  emailRow.appendChild(emailLink);
  contactSection.appendChild(emailRow);
}

function openEventModal(event, button) {
  if (!modal || !event) return;

  previouslyFocusedElement = button;

  if (modalTitle) {
    modalTitle.textContent = event.title;
  }

  if (modalDate) {
    modalDate.textContent = `${event.date} | ${event.location}`;
  }

  if (modalDescription) {
    modalDescription.textContent = event.description;
  }

  if (modalGallery) {
    modalGallery.replaceChildren();

    event.images.forEach((imgSrc) => {
      const img = document.createElement("img");

      img.src = imgSrc;
      img.alt = `${event.title} event photo`;
      img.loading = "lazy";
      img.decoding = "async";

      img.addEventListener("error", () => {
        img.classList.add("image-unavailable");
        img.alt = `${event.title} image unavailable`;
      });

      modalGallery.appendChild(img);
    });
  }

  renderEventContact();

  document.body.style.overflow = "hidden";
  modal.classList.add("active");

  if (closeModalBtn) {
    closeModalBtn.focus();
  }
}

viewDetailsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const eventId = btn.getAttribute("data-event");
    const event = eventData[eventId];

    if (!event) {
      console.warn(`[Events Timeline] Event ${eventId} was not found.`);
      return;
    }

    openEventModal(event, btn);

    // Ripple animation
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");

    ripple.className = "event-ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);

    ripple.addEventListener("animationend", () => ripple.remove(), {
      once: true,
    });

    // Fallback for browsers where animationend does not fire.
    setTimeout(() => ripple.remove(), 700);
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeEventModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeEventModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("active")) {
    closeEventModal();
  }

  // Keep keyboard focus inside the open modal.
  if (e.key === "Tab" && modal?.classList.contains("active")) {
    const focusable = modal.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* =========================================================
   ANIMATION STYLES
   ========================================================= */

if (!document.getElementById("eventAnimationStyles")) {
  const style = document.createElement("style");

  style.id = "eventAnimationStyles";
  style.textContent = `
    .event-ripple {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.6) 0%,
        transparent 70%
      );
      transform: scale(0);
      pointer-events: none;
      animation: rippleEffect 0.6s ease-out forwards;
    }

    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;

  document.head.appendChild(style);
}

/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

let scrollTicking = false;

window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;

    scrollTicking = true;

    window.requestAnimationFrame(() => {
      const header = document.querySelector("header");
      const scrolled = window.pageYOffset;

      if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
        header.style.opacity = Math.max(0, 1 - scrolled / 500);
      }

      scrollTicking = false;
    });
  },
  { passive: true }
);

/* =========================================================
   FADE-IN SECTIONS
   ========================================================= */

const fadeSections = document.querySelectorAll(".fade-section");

if ("IntersectionObserver" in window) {
  const fadeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeSectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeSections.forEach((section) => {
    fadeSectionObserver.observe(section);
  });
} else {
  fadeSections.forEach((section) => section.classList.add("visible"));
}

/* =========================================================
   TIMELINE MARKER ANIMATIONS
   ========================================================= */

document.querySelectorAll(".timeline-marker").forEach((marker, index) => {
  setTimeout(() => {
    marker.style.animation = "pulse-marker 2s ease-in-out infinite";
  }, index * 200);
});

/* =========================================================
   MOBILE MENU
   ========================================================= */

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinksContainer = document.querySelector("nav ul");
const navLinks = document.querySelectorAll("nav ul li a");

function closeMobileMenu() {
  if (!mobileMenuToggle || !navLinksContainer) return;

  mobileMenuToggle.classList.remove("active");
  navLinksContainer.classList.remove("active");
  document.body.classList.remove("menu-open");
  mobileMenuToggle.setAttribute("aria-expanded", "false");
}

if (mobileMenuToggle && navLinksContainer) {
  mobileMenuToggle.setAttribute(
    "aria-expanded",
    mobileMenuToggle.classList.contains("active") ? "true" : "false"
  );

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("active");

    mobileMenuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (e) => {
    if (
      navLinksContainer.classList.contains("active") &&
      !navLinksContainer.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
}

console.log("[Events Timeline] events.js loaded successfully.");
