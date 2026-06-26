const addButtons = document.querySelectorAll(".add-button");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("[data-cart-items]");
const cartTotal = document.querySelector("[data-cart-total]");
const menuOpenButton = document.querySelector("[data-menu-open]");
const cartOpenButton = document.querySelector("[data-cart-open]");
const menuPanel = document.querySelector("[data-menu-panel]");
const cartPanel = document.querySelector("[data-cart-panel]");
const drawerBackdrop = document.querySelector("[data-drawer-backdrop]");
const drawerCloseButtons = document.querySelectorAll("[data-drawer-close]");

let currentTotal = 11298;

const formatRand = (value) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("ZAR", "R");

const openDrawer = (panel) => {
  if (!panel || !drawerBackdrop) return;

  menuPanel?.classList.remove("is-open");
  cartPanel?.classList.remove("is-open");
  menuPanel?.setAttribute("hidden", "");
  cartPanel?.setAttribute("hidden", "");

  drawerBackdrop.removeAttribute("hidden");
  panel.removeAttribute("hidden");

  requestAnimationFrame(() => {
    drawerBackdrop.classList.add("is-open");
    panel.classList.add("is-open");
  });
};

const closeDrawers = () => {
  const openPanels = [menuPanel, cartPanel].filter(Boolean);

  drawerBackdrop?.classList.remove("is-open");
  openPanels.forEach((panel) => panel.classList.remove("is-open"));

  window.setTimeout(() => {
    drawerBackdrop?.setAttribute("hidden", "");
    openPanels.forEach((panel) => panel.setAttribute("hidden", ""));
  }, 220);
};

menuOpenButton?.addEventListener("click", () => openDrawer(menuPanel));
cartOpenButton?.addEventListener("click", () => openDrawer(cartPanel));
drawerBackdrop?.addEventListener("click", closeDrawers);
drawerCloseButtons.forEach((button) => {
  button.addEventListener("click", closeDrawers);
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextCount = Number(cartCount.textContent || 0) + 1;
    const productName = button.dataset.productName || "STREETWISE Gear";
    const productPrice = Number(button.dataset.productPrice || 0);

    cartCount.textContent = nextCount;
    currentTotal += productPrice;
    if (cartTotal) cartTotal.textContent = formatRand(currentTotal);

    if (cartItems) {
      const item = document.createElement("article");
      item.innerHTML = `<span>${productName}</span><strong>${formatRand(productPrice)}</strong>`;
      cartItems.append(item);
    }

    button.classList.remove("added");
    void button.offsetWidth;
    button.classList.add("added");

    openDrawer(cartPanel);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDrawers();
});
