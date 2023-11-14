export default function decorate(block) {
  [...block.children].forEach((row) => {
    console.log("under the profile card");
  });
}
