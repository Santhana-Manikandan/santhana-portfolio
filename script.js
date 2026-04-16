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

//toggle Button
function toggleFab() {
  const btn = document.getElementById('fabBtn');
  const options = document.getElementById('fabOptions');
  btn.classList.toggle('open');
  options.classList.toggle('visible');
}

// Close if clicked outside
document.addEventListener('click', function (e) {
  const fab = document.getElementById('fabContainer');
  if (!fab.contains(e.target)) {
    closeFab();
  }
});

// Close on scroll
window.addEventListener('scroll', function () {
  closeFab();
});

// Close on touch move (swipe/scroll on mobile)
window.addEventListener('touchmove', function () {
  closeFab();
});

function closeFab() {
  document.getElementById('fabBtn').classList.remove('open');
  document.getElementById('fabOptions').classList.remove('visible');
}