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
  myHeaders.append("Authorization", "Bearer 2b39ac53a29d968b6339a2465715cd87");

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

function pagination() {
  const pagEl = document.querySelector(".numList");
  const courseList = document.querySelectorAll(".block-post-products");
  let num1 = courseList.length;
  let onepage = Math.ceil(num1 / 3);
  console.log(onepage);
  pagEl.innerHTML = "";
  for (let i = onepage; i > 0; i--) {
    pagEl.insertAdjacentHTML("afterbegin", `<span class="pageNum">${i}</span>`);
  }
  const pagBtn = document.querySelectorAll(".pageNum");
  for (let j = 0; j < 3; j++) {
    courseList[j].classList.remove("dis");
  }
  pagBtn.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      let currentval = Number(btn.textContent);
      for (let i = 0; i < courseList.length; i++) {
        courseList[i].classList.add("dis");
      }
      for (
        let j = 0 + (currentval - 1) * 3;
        j < 3 * (currentval - 1 + 1);
        j++
      ) {
        courseList[j].classList.remove("dis");
      }
    });
  });
}
