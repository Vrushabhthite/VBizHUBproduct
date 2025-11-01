document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const sortSelect = document.getElementById("sortSelect");
  const categorySelect = document.getElementById("categorySelect");
  const container = document.querySelector(".grid-container");
  const allProducts = Array.from(document.querySelectorAll(".grid-item"));

  let currentCategory = "";
  let currentSearch = "";
  let currentSort = "";

  // Function to update displayed products
  function renderProducts() {
    let filtered = [...allProducts];

    // Filter by Category
    if (currentCategory !== "") {
      filtered = filtered.filter((p) => {
        const category = p.getAttribute("data-category")?.toLowerCase() || "";
        return category === currentCategory;
      });
    }

    //  Search within current category (not globally)
    if (currentSearch !== "") {
      filtered = filtered.filter((p) => {
        const text = p.innerText.toLowerCase();
        return text.includes(currentSearch);
      });
    }

    //  Sort by price
    if (currentSort !== "") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.querySelector("h1").innerText.replace(/[^\d.]/g, ""));
        const priceB = parseFloat(b.querySelector("h1").innerText.replace(/[^\d.]/g, ""));
        return currentSort === "asc" ? priceA - priceB : priceB - priceA;
      });
    }

    //  Render
    container.innerHTML = "";
    if (filtered.length === 0) {
      container.innerHTML = `<h2 style="text-align:center; color:gray;">No products found</h2>`;
    } else {
      filtered.forEach((p) => container.appendChild(p));
    }
  }

  // Search event
  searchBox.addEventListener("keyup", () => {
    currentSearch = searchBox.value.toLowerCase().trim();
    renderProducts();
  });

  // Category event
  categorySelect.addEventListener("change", () => {
    currentCategory = categorySelect.value.toLowerCase();
    renderProducts();
  });

  // Sort event
  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    renderProducts();
  });

  // Initial render
  renderProducts();
});
