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
}
