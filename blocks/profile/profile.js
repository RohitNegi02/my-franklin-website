export default function decorate(block) {
  [...block.children].forEach((div) => {
    for (let i = 0; i <= div.children.length - 1; i++) {
      // check if the element is an IMG (image type).
      console.log(div.children);
      if (div.childNodes[i].tagName == "picture") {
        div.className = "profile-image"; // show the ID of each image.
      } else {
        div.className = "profile-details";
      }
    }
    // if (div.querySelectorAll("picture")) div.className = "profile-image";
    // div.className = "profile-details";
  });
}
