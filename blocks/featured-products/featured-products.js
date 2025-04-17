import { createOptimizedPicture } from '../../scripts/aem.js';
import { fetchProducts } from '../../scripts/commerce.js';

/**
 * Decorates the featured products block
 * @param {Element} block The featured products block element
 */
export default async function decorate(block) {
  block.classList.add('featured-products-container');

  // Get category from block data
  const category = block.dataset.category || '';

  // Fetch products
  const products = await fetchProducts(category, 4);

  // Create heading
  const heading = document.createElement('h2');
  heading.textContent = block.children[0].textContent.trim() || 'Featured Products';
  heading.classList.add('featured-products-heading');

  // Create product grid
  const productGrid = document.createElement('div');
  productGrid.classList.add('product-grid');

  // Add products to grid
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Create product image
    const productImage = createOptimizedPicture(product.image, {
      alt: product.name,
      breakpoints: [{ width: 400 }],
    });
    productImage.classList.add('product-image');

    // Create product info
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const productName = document.createElement('h3');
    productName.textContent = product.name;
    productName.classList.add('product-name');

    const productPrice = document.createElement('p');
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productPrice.classList.add('product-price');

    // Create product link
    const productLink = document.createElement('a');
    productLink.href = `/products/${product.slug}`;
    productLink.classList.add('product-link');
    productLink.setAttribute('aria-label', `View ${product.name}`);

    // Assemble product card
    productInfo.append(productName, productPrice);
    productCard.append(productImage, productInfo);
    productLink.append(productCard);
    productGrid.append(productLink);
  });

  // Create "View All" button
  const viewAllLink = document.createElement('a');
  viewAllLink.href = `/shop${category ? `/${category}` : ''}`;
  viewAllLink.textContent = 'View All Products';
  viewAllLink.classList.add('button', 'view-all');

  // Clear original content and add new elements
  block.textContent = '';
  block.append(heading, productGrid, viewAllLink);
}
