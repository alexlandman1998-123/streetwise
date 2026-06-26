const addButtons = document.querySelectorAll(".add-button");
const cartCount = document.querySelector("#cartCount");

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextCount = Number(cartCount.textContent || 0) + 1;
    cartCount.textContent = nextCount;

    button.classList.remove("added");
    void button.offsetWidth;
    button.classList.add("added");
  });
});
