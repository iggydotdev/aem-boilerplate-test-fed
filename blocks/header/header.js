import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * Decorates the header, adding the navigation and search functionality
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Fetch nav content
  const navMeta = getMetadata("nav");
  console.log(">>> META", navMeta);
  const navPath = navMeta ? new URL(navMeta).pathname : "/nav";
  console.log(">>> PATH", navPath);
  const fragment = await loadFragment(navPath);
  console.log(">>> FRAGMENT", fragment);

  const html = "HELLO WORLD";

  // Create header DOM structure
  const header = document.createElement("div");
  header.classList.add("header-wrapper");

  // Logo section
  const logoWrapper = document.createElement("div");
  logoWrapper.classList.add("logo-wrapper");

  const logoLink = document.createElement("a");
  logoLink.href = "/";
  logoLink.setAttribute("aria-label", "Evergreen Outdoors Home");

  const logo = document.createElement("img");
  logo.src = "/icons/evergreen-logo.svg";
  logo.alt = "Evergreen Outdoors";
  logo.width = 180;
  logo.height = 40;

  logoLink.append(logo);
  logoWrapper.append(logoLink);

  // Nav section
  const nav = document.createElement("nav");
  nav.classList.add("nav");
  nav.innerHTML = html;

  // Add mobile menu toggle
  const mobileMenuToggle = document.createElement("button");
  mobileMenuToggle.classList.add("nav-toggle");
  mobileMenuToggle.setAttribute("aria-label", "Toggle navigation menu");
  mobileMenuToggle.innerHTML = "<span></span><span></span><span></span>";
  mobileMenuToggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    mobileMenuToggle.classList.toggle("nav-toggle-active");
    document.body.classList.toggle("nav-is-open");
  });

  // Add search and cart icons
  const actionIcons = document.createElement("div");
  actionIcons.classList.add("action-icons");

  const searchButton = document.createElement("button");
  searchButton.classList.add("search-toggle");
  searchButton.setAttribute("aria-label", "Search products");
  searchButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';

  const cartLink = document.createElement("a");
  cartLink.href = "/cart";
  cartLink.classList.add("cart-link");
  cartLink.setAttribute("aria-label", "View cart");
  cartLink.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span class="cart-count">0</span>';

  actionIcons.append(searchButton, cartLink);

  // Assemble header
  header.append(logoWrapper, nav, mobileMenuToggle, actionIcons);

  // Add search overlay
  const searchOverlay = document.createElement("div");
  searchOverlay.classList.add("search-overlay");
  searchOverlay.innerHTML = `
      <div class="search-container">
        <form action="/search" method="get">
          <input type="text" name="q" placeholder="Search for products..." aria-label="Search">
          <button type="submit" aria-label="Submit search">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </form>
        <button class="close-search" aria-label="Close search">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    `;

  // Toggle search overlay
  searchButton.addEventListener("click", () => {
    searchOverlay.classList.add("search-open");
    searchOverlay.querySelector("input").focus();
  });

  searchOverlay.querySelector(".close-search").addEventListener("click", () => {
    searchOverlay.classList.remove("search-open");
  });

  // Replace original content
  block.textContent = "";
  block.append(header, searchOverlay);
}
