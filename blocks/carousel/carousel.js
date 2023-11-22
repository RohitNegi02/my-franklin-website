export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = "slide";
  });
}
