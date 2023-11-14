export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = "cards-card-image";
    console.log("under the profile card s");
  });
}
