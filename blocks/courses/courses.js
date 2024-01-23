export default function decorate(block) {
  // [...block.children].forEach((row) => {
  //   if (row.querySelector("picture")) {
  //     row.className = "profile-images";
  //   }
  //   row.className = "profile-details";
  // });
  const parentEl = document.querySelector(".courses");
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
      renderMarkup(result.data, true);
    })
    .catch((error) => console.log("error", error));
}
const renderMarkup = function (result, value) {
  const markup = generateMarkuploop();
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
  function generateMarkuploop() {
    const Mark = result.map((res) => generateMarkup(res)).join("");
    return Mark;
  }
  function generateMarkup(result) {
    return ` <div class="block-post-products dis" id="${result.attributes.authorNames[0]}">
<img class="products-img" src="${result.attributes.imageUrl}" alt="" />
<div class="img-txt-products"><span>${result.attributes.localizedMetadata[0].name}</span></div>
</div>`;
  }
  return markup;
};
