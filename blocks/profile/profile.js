export default function decorate(block) {
  [...block.children].forEach((row) => {
    element.classList.add(`mystyle ${row}`);
    console.log("under the profile card s");
  });
}
