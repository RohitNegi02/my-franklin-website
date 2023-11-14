export default function decorate(block) {
  [...block.children].forEach((div) => {
    if (div.children.length === 1 && div.querySelector("picture"))
      div.className = "profile-image";
    div.className = "profile-details";
  });
}
