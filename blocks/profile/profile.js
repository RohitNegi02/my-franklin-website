export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add(`mystyle ${row}`);
    console.log("under the profile card s");
  });
}
