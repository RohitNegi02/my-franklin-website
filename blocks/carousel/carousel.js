export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = "slide";
  });

  const slider = document.querySelector(".carousel");
  let currentSlide = 0;
  const leftButton = document.createElement("button");
  slider.append(leftButton);
  leftButton.classList.add("slider__btn");
  leftButton.classList.add("slider__btn--left");
  leftButton.innerHTML = `&larr;`;
  const rightButton = document.createElement("button");
  slider.append(rightButton);
  rightButton.classList.add("slider__btn");
  rightButton.classList.add("slider__btn--right");
  rightButton.innerHTML = `&rarr;`;

  slider.style.transform = "scale(0.5)";
  slider.style.overflow = "visible";
  const slides = document.querySelectorAll(".slide");
  const totalSlide = slides.length;
  slides.forEach((s, i) => {
    console.log("slide");
    s.style.transform = `translateX(${100 * i}%)`;
  });
  rightButton.addEventListener("click", function () {
    if (currentSlide == totalSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
  });
  leftButton.addEventListener("click", function () {
    currentSlide--;
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i + currentSlide)}%)`;
    });
  });
}
