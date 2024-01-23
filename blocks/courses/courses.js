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
    "https://captivateprime.adobe.com/primeapi/v2/recommendations",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
