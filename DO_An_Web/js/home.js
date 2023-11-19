const productContainers = [...document.querySelectorAll(".product-container")];





document
  .querySelector(".scrollTopButton")
  .addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });

  if (close) {
    close.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  }
}
