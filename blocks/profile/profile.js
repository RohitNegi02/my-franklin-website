export default function decorate(block) {
  [...block.children].forEach((div) => {
    if (div.querySelectorAll("picture")) div.className = "profile-image";
    div.className = "profile-details";
  });
}
