export default function decorate(block) {
  [...block.children].forEach((row) => {
    if (row.querySelector("p")) {
      row.className = "profile-details";
    }
    row.className = "profile-images";
  });
}
