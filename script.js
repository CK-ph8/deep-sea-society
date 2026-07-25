//Mobile nav menu
function toggleMobileMenu() {
  document.getElementById("mobile-menu").classList.toggle("open");
  document.getElementById("hamburger-btn").classList.toggle("open");
}

//Lightbox gallery (used on the Featured Works page)
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  renderLightbox();
  document.getElementById("lightbox-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox-modal").classList.remove("open");
  document.body.style.overflow = "";
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  renderLightbox();
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  renderLightbox();
}

function lightboxGoTo(i) {
  lightboxIndex = i;
  renderLightbox();
}

function renderLightbox() {
  const img = document.getElementById("lightbox-img");
  img.src = lightboxImages[lightboxIndex];
  img.alt = "Image " + (lightboxIndex + 1);

  const arrows = document.querySelectorAll(".lightbox-arrow");
  arrows.forEach((a) => (a.style.display = lightboxImages.length > 1 ? "flex" : "none"));

  const dotsWrap = document.getElementById("lightbox-dots");
  dotsWrap.style.display = lightboxImages.length > 1 ? "flex" : "none";
  dotsWrap.innerHTML = "";
  lightboxImages.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "lightbox-dot" + (i === lightboxIndex ? " active" : "");
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      lightboxGoTo(i);
    });
    dotsWrap.appendChild(dot);
  });
}

document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("lightbox-modal");
  if (!modal || !modal.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lightboxPrev();
  if (e.key === "ArrowRight") lightboxNext();
});
