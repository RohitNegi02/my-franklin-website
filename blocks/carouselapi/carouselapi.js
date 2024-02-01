export default function decorate(block) {
  // [...block.children].forEach((row) => {
  //   row.className = "slide";
  // });
  function getCookie() {
    let name = "access_token" + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getCookie()}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://captivateprime.adobe.com/primeapi/v2/learningObjects?page[limit]=10&filter.loTypes=course&sort=name&filter.ignoreEnhancedLP=true",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data);
      renderMarkup(result.data, true);
    })
    .catch((error) => console.log("error", error));
  const renderMarkup = function (result, value) {
    const markup = generateMarkuploop();
    const parentEl = document.querySelector(".carouselapi");
    parentEl.innerHTML = "";
    parentEl.insertAdjacentHTML("afterbegin", markup);
    function generateMarkuploop() {
      const Mark = result.map((res) => generateMarkup(res)).join("");
      return Mark;
    }
    function generateMarkup(result) {
      return `<div class="slide" id="${result.attributes.localizedMetadata[0].overview}">
      <div>
    <picture><source  srcset="${result.attributes.imageUrl}" alt="" ><img loading="lazy" src="${result.attributes.imageUrl}"></picture>
   
    </div>
    </div>`;
    }
    return markup;
    // <div class="img-txt-products"><span>${result.attributes.localizedMetadata[0].name}</span>
  };
  const slider = document.querySelector(".carouselapi");
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

  const slides = document.querySelectorAll(".slide");
  const totalSlide = slides.length;
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  goToSlide(0);
  rightButton.addEventListener("click", function () {
    if (currentSlide == totalSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  });
  leftButton.addEventListener("click", function () {
    if (currentSlide == 0) {
      currentSlide = totalSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  });
}
