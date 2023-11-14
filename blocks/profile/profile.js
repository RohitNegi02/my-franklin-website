export default function decorate(block) {
  [...block.children].forEach((row) => {
    // console.log();

    if (row.querySelector("p")) row.className = "profile-details";
    row.className = "profile-images";
  });
}
