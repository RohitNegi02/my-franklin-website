export default function decorate(block) {
  // [...block.children].forEach((row) => {
  //   if (row.querySelector("picture")) {
  //     row.className = "profile-images";
  //   }
  //   row.className = "profile-details";
  // });

  console.log("Hello Course");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer 435b1ec07f84682ee281eeba917db0bd");

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
      const parentEl = document.querySelector(".my-course");
      parentEl.insertAdjacentHTML("afterend", `<div class="numList"></div>`);
      renderMarkup(result.data, true);
      pagination();
    })
    .catch((error) => console.log("error", error));
}
const renderMarkup = function (result, value) {
  const parentEl = document.querySelector(".my-course");
  const pagEl = document.querySelector(".numList");
  const markup = generateMarkuploop();
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
  function generateMarkuploop() {
    const Mark = result.map((res) => generateMarkup(res)).join("");
    return Mark;
  }
  function generateMarkup(result) {
    return ` <div class="block-post-products dis" id="${result.attributes.localizedMetadata[0].overview}">
<img class="products-img" src="${result.attributes.imageUrl}" alt="" />
<div class="img-txt-products"><span>${result.attributes.localizedMetadata[0].name}</span></div>
</div>`;
  }
  return markup;
};
function pagination() {
  const courseList = document.querySelectorAll(".block-post-products");
  let num1 = courseList.length;
  let onepage = Math.ceil(num1 / 6);
  pagEl.innerHTML = "";
  for (let i = onepage; i > 0; i--) {
    pagEl.insertAdjacentHTML("afterbegin", `<span class="pageNum">${i}</span>`);
  }
  const pagBtn = document.querySelectorAll(".pageNum");
  for (let j = 0; j < 6; j++) {
    courseList[j].classList.remove("dis");
  }
  pagBtn.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      currentval = Number(btn.textContent);
      for (let i = 0; i < courseList.length; i++) {
        courseList[i].classList.add("dis");
      }
      for (
        let j = 0 + (currentval - 1) * 6;
        j < 6 * (currentval - 1 + 1);
        j++
      ) {
        courseList[j].classList.remove("dis");
      }
    });
  });
}
