export default function decorate(block) {
  [...block.children].forEach((row) => {
    // console.log();

    if (row.querySelector("p")) {
      row.className = "profile-details";
    } else {
      row.className = "profile-images";
    }
  });
}
