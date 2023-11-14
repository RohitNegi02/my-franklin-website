export default function decorate(block) {
  [...block.children].forEach((row) => {
    if (row.querySelector("picture")) row.className = "profile-image";
    row.className = "profile-details";
  });
}
