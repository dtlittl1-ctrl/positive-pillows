const galleryImages = [
  "gallery-images/IMG_2349.png",
  "gallery-images/IMG_2350.png",
  "gallery-images/IMG_2357.png",
  "gallery-images/IMG_1359.png",
  "gallery-images/IMG_1515.png",
  "gallery-images/IMG_1998.png",
  "gallery-images/IMG_0143.png",
  "gallery-images/IMG_0144.png",
  "gallery-images/IMG_0209.png",
  "gallery-images/IMG_0451.png",
  "gallery-images/IMG_0973.png",
  "gallery-images/IMG_0980.png",
  "gallery-images/IMG_1001.png"
];

const galleryMainImg = document.getElementById("gallery-image");
const galleryPrevImg = document.getElementById("gallery-image-prev");
const galleryNextImg = document.getElementById("gallery-image-next");
const galleryPrevBtn = document.getElementById("gallery-prev");
const galleryNextBtn = document.getElementById("gallery-next");

let galleryIndex = 0;

function updateGalleryImages() {
  if (!galleryMainImg) return;

  const total = galleryImages.length;
  const current = galleryIndex;
  const prev = (galleryIndex - 1 + total) % total;
  const next = (galleryIndex + 1) % total;

  galleryMainImg.src = galleryImages[current];

  if (galleryPrevImg) {
    galleryPrevImg.src = galleryImages[prev];
  }
  if (galleryNextImg) {
    galleryNextImg.src = galleryImages[next];
  }
}

if (galleryMainImg && galleryPrevBtn && galleryNextBtn) {
  updateGalleryImages();

  galleryPrevBtn.addEventListener("click", () => {
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImages();
  });

  galleryNextBtn.addEventListener("click", () => {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateGalleryImages();
  });
}

const wizardSteps = document.querySelectorAll(".wizard-step");
const wizardOptionButtons = document.querySelectorAll(".wizard-option");
const wizardNextButtons = document.querySelectorAll(".wizard-next");

let pillowSelection = {
  type: "",
  notes: "",
  size: ""
};

function showStep(stepNumber) {
  wizardSteps.forEach(stepEl => {
    const step = stepEl.getAttribute("data-step");
    if (step === String(stepNumber)) {
      stepEl.classList.add("active");
    } else {
      stepEl.classList.remove("active");
    }
  });

  if (String(stepNumber) === "4") {
    const typeSpan = document.getElementById("summary-type");
    const notesP = document.getElementById("summary-notes");
    const sizeSpan = document.getElementById("summary-size");

    if (typeSpan) typeSpan.textContent = pillowSelection.type || "—";
    if (notesP) notesP.textContent = pillowSelection.notes || "—";
    if (sizeSpan) sizeSpan.textContent = pillowSelection.size || "—";
  }
}

if (wizardSteps.length > 0) {
  wizardOptionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const field = btn.getAttribute("data-field");
      const value = btn.getAttribute("data-value");
      const nextStep = btn.getAttribute("data-next");

      if (field === "type") {
        pillowSelection.type = value;
      } else if (field === "size") {
        pillowSelection.size = value;
      }

      if (nextStep) {
        showStep(nextStep);
      }
    });
  });

  wizardNextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const nextStep = btn.getAttribute("data-next");
      const notesEl = document.getElementById("wizard-notes");

      if (notesEl) {
        pillowSelection.notes = notesEl.value.trim();
      }

      if (nextStep) {
        showStep(nextStep);
      }
    });
  });

  showStep(1);
}
