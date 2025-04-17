import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the sustainability block
 * @param {Element} block The sustainability block element
 */
export default function decorate(block) {
  block.classList.add('sustainability-container');

  const cols = [...block.firstElementChild.children];

  if (cols.length > 1) {
    // Content column
    const contentCol = cols[0];
    contentCol.classList.add('sustainability-content');

    // Image column
    const imageCol = cols[1];
    const picture = imageCol.querySelector('picture');

    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPicture = createOptimizedPicture(img.src, {
        alt: img.alt,
        breakpoints: [{ width: 400 }, { width: 600 }],
      });

      imageCol.textContent = '';
      imageCol.appendChild(optimizedPicture);
      imageCol.classList.add('sustainability-image');
    }

    // Style elements in content column
    const heading = contentCol.querySelector('h2');
    if (heading) {
      heading.classList.add('sustainability-heading');
    }

    const paragraphs = contentCol.querySelectorAll('p');
    paragraphs.forEach((p) => p.classList.add('sustainability-text'));

    const list = contentCol.querySelector('ul');
    if (list) {
      list.classList.add('sustainability-list');
    }

    const link = contentCol.querySelector('a');
    if (link) {
      link.classList.add('button', 'primary');
    }

    // Restructure the block
    block.textContent = '';

    const container = document.createElement('div');
    container.classList.add('sustainability-wrapper');
    container.appendChild(contentCol);
    container.appendChild(imageCol);

    block.appendChild(container);
  }
}
