// splash Card
window.onload = () => {
  const splash = document.getElementById("splash");
  const mainContent = document.getElementById("main-content");

  splash.style.top = "0";

  setTimeout(() => {
    splash.style.animation = "slideUp 1s ease forwards";

    setTimeout(() => {
      splash.style.display = "none";
      mainContent.style.display = "block";

      setTimeout(() => {
        mainContent.style.opacity = "1";
      }, 50);
    }, 1000);
  }, 2500);
};

//Nav bar
const sections = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

sections.forEach((section) => {
  observer.observe(section);
});
const allSections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  allSections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
// ===== Desktop dropdown =====
const projectsToggle = document.getElementById("projectsToggle");
const projectsDropdown = document.getElementById("projectsDropdown");

projectsToggle.addEventListener("click", (e) => {
  e.preventDefault(); // stop jumping to #projects on first tap
  const isOpen = projectsDropdown.classList.contains("open");
  projectsDropdown.classList.toggle("open", !isOpen);
  projectsToggle.classList.toggle("open", !isOpen);
});

// Close desktop dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    !projectsToggle.contains(e.target) &&
    !projectsDropdown.contains(e.target)
  ) {
    projectsDropdown.classList.remove("open");
    projectsToggle.classList.remove("open");
  }
});

// Close after selecting a project (desktop)
projectsDropdown.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    projectsDropdown.classList.remove("open");
    projectsToggle.classList.remove("open");
  });
});

// ===== Mobile dropdown (accordion) =====
const mobileProjectsToggle = document.getElementById("mobileProjectsToggle");
const mobileProjectsDropdown = document.getElementById(
  "mobileProjectsDropdown",
);

mobileProjectsToggle.addEventListener("click", () => {
  const isOpen = mobileProjectsDropdown.classList.contains("open");
  mobileProjectsDropdown.classList.toggle("open", !isOpen);
  mobileProjectsToggle.classList.toggle("open", !isOpen);
});

//toggle Button
function toggleFab() {
  const btn = document.getElementById("fabBtn");
  const options = document.getElementById("fabOptions");
  btn.classList.toggle("open");
  options.classList.toggle("visible");
}

// Close if clicked outside
document.addEventListener("click", function (e) {
  const fab = document.getElementById("fabContainer");
  if (!fab.contains(e.target)) {
    closeFab();
  }
});

// Close on scroll
window.addEventListener("scroll", function () {
  closeFab();
});

// Close on touch move (swipe/scroll on mobile)
window.addEventListener("touchmove", function () {
  closeFab();
});

function closeFab() {
  document.getElementById("fabBtn").classList.remove("open");
  document.getElementById("fabOptions").classList.remove("visible");
}
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const navOverlay = document.getElementById("navOverlay");

  // Open / close toggle
  hamburgerBtn.addEventListener("click", function () {
    mobileNav.classList.toggle("open");
    navOverlay.classList.toggle("open");
  });

  // Close when overlay (dark background) is clicked
  navOverlay.addEventListener("click", function () {
    mobileNav.classList.remove("open");
    navOverlay.classList.remove("open");
  });

  // Each nav link — close menu THEN scroll to section
  document.querySelectorAll(".mobile-nav a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // stop default jump

      // Close the menu
      mobileNav.classList.remove("open");
      navOverlay.classList.remove("open");

      // Get the target section
      const targetId = this.getAttribute("href"); // e.g. "#home"
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Small delay so menu slides out before scroll
        setTimeout(function () {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    });
  });
});

// Project card image arrows (cycles through images listed in data-images,
// comma-separated. If a card only has one image, arrows auto-hide.)
document.querySelectorAll(".proj-image-wrap").forEach((wrap) => {
  const imgEl = wrap.querySelector(".proj-img");
  const leftBtn = wrap.querySelector(".proj-arrow.left");
  const rightBtn = wrap.querySelector(".proj-arrow.right");
  const images = (wrap.dataset.images || imgEl.src)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (images.length <= 1) {
    if (leftBtn) leftBtn.hidden = true;
    if (rightBtn) rightBtn.hidden = true;
    return;
  }

  let index = 0;

  function showImage(newIndex) {
    index = (newIndex + images.length) % images.length;
    imgEl.src = images[index];
  }

  if (leftBtn) leftBtn.addEventListener("click", () => showImage(index - 1));
  if (rightBtn) rightBtn.addEventListener("click", () => showImage(index + 1));
});

//contact
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-message");
const button = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  button.innerText = "Sending...";
  button.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch(
      "https://santhana-portfolio.onrender.com/send-message",
      {
        method: "POST",
        body: formData,
      },
    );

    // 🔥 SAFE JSON PARSE
    let result = {};
    try {
      result = await response.json();
    } catch {
      console.warn("Response is not JSON");
    }

    if (response.ok) {
      form.style.display = "none";
      successMsg.style.display = "block";
      form.reset();
    } else {
      alert(result.error || "Something went wrong ");
      button.innerText = "Send Message";
      button.disabled = false;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Server not reachable ");

    button.innerText = "Send Message";
    button.disabled = false;
  }
});