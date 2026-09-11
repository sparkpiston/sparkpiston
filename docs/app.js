const WHATSAPP_NUMBER = "916381759789";

const grid = document.querySelector("#product-grid");
const filters = document.querySelector("#filters");
const searchInput = document.querySelector("#search-input");
const template = document.querySelector("#product-template");
const resultsCount = document.querySelector("#results-count");
const productCount = document.querySelector("#product-count");
const dialog = document.querySelector("#product-dialog");

let products = [];
let selectedCategory = "All";

function formatPrice(price) {
  if (price === null || price === undefined || Number(price) <= 0) return "Price on request";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function whatsappLink(product) {
  const imageUrl = new URL(product.image, window.location.href).href;
  const message = [
    "Hello Spark Piston, I am interested in this product:",
    "",
    `Product: ${product.name}`,
    `Brand: ${product.brand || "Spark Piston collection"}`,
    `Price: ${formatPrice(product.price)}`,
    `Compatibility: ${product.compatibility}`,
    `Details: ${product.description}`,
    `Image: ${imageUrl}`,
    "",
    "Please confirm availability, fitment and delivery.",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function visibleProducts() {
  const query = searchInput.value.trim().toLowerCase();
  return products.filter((product) => {
    if (product.available === false) return false;
    const inCategory = selectedCategory === "All" || product.category === selectedCategory;
    const searchable = `${product.name} ${product.brand || ""} ${product.category} ${product.compatibility} ${product.description}`.toLowerCase();
    return inCategory && searchable.includes(query);
  });
}

function openDetails(product) {
  const image = document.querySelector("#dialog-image");
  const category = document.querySelector("#dialog-category");
  image.src = product.image;
  image.alt = product.name;
  const marker = document.createElement("span");
  category.replaceChildren(marker, document.createTextNode(`${product.category} · ${product.brand || "Performance part"}`));
  document.querySelector("#dialog-name").textContent = product.name;
  document.querySelector("#dialog-price").textContent = formatPrice(product.price);
  document.querySelector("#dialog-description").textContent = product.description;
  document.querySelector("#dialog-fit").textContent = product.compatibility;
  document.querySelector("#dialog-buy").href = whatsappLink(product);
  dialog.showModal();
}

function renderProducts() {
  const items = visibleProducts();
  grid.replaceChildren();
  resultsCount.textContent = `${items.length} product${items.length === 1 ? "" : "s"}`;

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No matching products. Message us on WhatsApp and we will help you find it.";
    grid.append(empty);
    return;
  }

  items.forEach((product) => {
    const card = template.content.cloneNode(true);
    const image = card.querySelector(".product-image");
    image.src = product.image;
    image.alt = product.name;
    card.querySelector(".product-category").textContent = product.category;
    card.querySelector(".product-brand").textContent = product.brand || "Spark Piston collection";
    card.querySelector(".product-name").textContent = product.name;
    card.querySelector(".product-fit").textContent = product.compatibility;
    card.querySelector(".product-description").textContent = product.description;
    card.querySelector(".product-price").textContent = formatPrice(product.price);
    card.querySelector(".buy-button").href = whatsappLink(product);
    const detailButton = card.querySelector(".product-image-button");
    detailButton.setAttribute("aria-label", `View details for ${product.name}`);
    detailButton.addEventListener("click", () => openDetails(product));
    grid.append(card);
  });
}

function renderFilters() {
  const categories = ["All", ...new Set(products.filter((product) => product.available !== false).map((product) => product.category))];
  filters.replaceChildren();
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${category === selectedCategory ? " active" : ""}`;
    button.textContent = category;
    button.setAttribute("aria-pressed", String(category === selectedCategory));
    button.addEventListener("click", () => {
      selectedCategory = category;
      renderFilters();
      renderProducts();
    });
    filters.append(button);
  });
}

searchInput.addEventListener("input", renderProducts);
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

fetch("./data/products.json")
  .then((response) => {
    if (!response.ok) throw new Error("Product file could not be loaded.");
    return response.json();
  })
  .then((data) => {
    products = Array.isArray(data) ? data : [];
    productCount.textContent = `${products.filter((product) => product.available !== false).length}+`;
    renderFilters();
    renderProducts();
  })
  .catch(() => {
    resultsCount.textContent = "";
    grid.innerHTML = '<p class="empty">Products could not be loaded. Please contact us on WhatsApp.</p>';
  });
