const placeholderLinks = document.querySelectorAll('[data-placeholder="true"]');

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const existing = document.querySelector(".inline-toast");
    if (existing) existing.remove();

    const note = document.createElement("p");
    note.className = "inline-toast";
    note.textContent = link.dataset.placeholderMessage || "這裡之後可以替換成你的正式預約連結。";
    link.insertAdjacentElement("afterend", note);

    window.setTimeout(() => {
      note.remove();
    }, 3600);
  });
});

const sticky = document.querySelector(".mobile-sticky");

const updateSticky = () => {
  if (!sticky) return;
  sticky.classList.toggle("is-visible", window.scrollY > 540);
};

updateSticky();
window.addEventListener("scroll", updateSticky, { passive: true });

const zoomableImages = document.querySelectorAll(".feedback-proof-board img");
const canHoverZoom = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (zoomableImages.length && canHoverZoom) {
  const preview = document.createElement("div");
  const previewImage = document.createElement("img");

  preview.className = "image-zoom-preview";
  preview.setAttribute("aria-hidden", "true");
  preview.append(previewImage);
  document.body.append(preview);

  const showPreview = (image) => {
    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt || "";
    preview.classList.add("is-visible");
  };

  const hidePreview = () => {
    preview.classList.remove("is-visible");
  };

  zoomableImages.forEach((image) => {
    image.tabIndex = 0;
    image.addEventListener("pointerenter", () => showPreview(image));
    image.addEventListener("pointerleave", hidePreview);
    image.addEventListener("focus", () => showPreview(image));
    image.addEventListener("blur", hidePreview);
  });
}

document
  .querySelectorAll(
    ".pain-list, .pillars, .fit-list, .program-list, .case-gallery, .proof-strip, .faq-list"
      + ", .testimonial-cards"
  )
  .forEach((group) => {
    [...group.children].forEach((child, index) => {
      child.style.setProperty("--delay", `${Math.min(index * 70, 420)}ms`);
    });
  });

const revealTargets = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((target) => revealObserver.observe(target));
