export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = "slide";
  });
  const slider = document.querySelector(".carousel");
  slider.style.transform = "scale(0.5)";
  slider.style.overflow = "visible";
  const slides = document.querySelectorAll(".slide");
  slides.forEach((s, i) => {
    console.log("slide");
    s.style.transform = `translateX(${100 * i}%)`;
  });
  slider.innerHTML = `<button class="slider__btn slider__btn--left" type="button"  aria-label="Button Left">
  &larr;
      </button><button class="slider__btn slider__btn--right" type="button"  aria-label="Button right">
      &rarr;
          </button>`;
}
