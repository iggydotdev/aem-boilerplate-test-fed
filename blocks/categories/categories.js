import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the categories block
 * @param {Element} block The categories block element
 */
export default function decorate(block) {
  block.classList.add('categories-container');

  // Get heading from first row
  const heading = block.children[0];
  heading.classList.add('categories-heading');

  // Get categories from second row
  const categoriesRow = block.children[1];

  // Create categories grid
  const categoriesGrid = document.createElement('div');
  categoriesGrid.classList.add('categories-grid');

  // Process each category
  Array.from(categoriesRow.children).forEach((category) => {
    const link = category.querySelector('a');

    if (link) {
      const categoryCard = document.createElement('div');
      categoryCard.classList.add('category-card');

      // Get image
      const picture = category.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPicture = createOptimizedPicture(img.src, {
          alt: img.alt,
          breakpoints: [{ width: 400 }],
        });
        categoryCard.appendChild(optimizedPicture);
      }

      // Get category name
      const categoryName = category.querySelector('h3');
      if (categoryName) {
        categoryName.classList.add('category-name');
        categoryCard.appendChild(categoryName);
      }

      // Create wrapper link
      const categoryLink = document.createElement('a');
      categoryLink.href = link.href;
      categoryLink.classList.add('category-link');
      categoryLink.setAttribute('aria-label', `Browse ${categoryName ? categoryName.textContent : ''} products`);

      categoryLink.appendChild(categoryCard);
      categoriesGrid.appendChild(categoryLink);
    }
  });

  // Replace original content
  block.textContent = '';
  block.appendChild(heading);
  block.appendChild(categoriesGrid);
}
