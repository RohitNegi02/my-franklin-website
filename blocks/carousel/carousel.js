export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = "slide";
  });
  const slides = document.querySelectorAll(".slide");
  slides.forEach((s, i) => {
    console.log("slide");
    s.style.transform = `translateX(${100 * i}%)`;
  });
}
