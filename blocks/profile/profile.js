export default function decorate(block) {
  [...block.children].forEach((div) => {
    // console.log();
    if (div.querySelector("picture") != null) div.className = "profile-image";
    div.className = "profile-details";
  });
}
