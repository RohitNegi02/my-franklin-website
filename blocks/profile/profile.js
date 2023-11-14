export default function decorate(block) {
  [...block.children].forEach((div) => {
    if (div.querySelector("img")) div.className = "profile-image";
    div.className = "profile-details";
  });
}
