import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add('hero-container');
  console.log(">>> HERO COLS", cols);
  // Check if we have an image column
  if (cols.length > 1) {
    const pictureCol = cols[1];
    const picture = pictureCol.querySelector('picture');

    if (picture) {
      // Create optimized responsive picture
      const optimizedPicture = createOptimizedPicture(picture.querySelector('img').src, {
        alt: picture.querySelector('img').alt,
        breakpoints: [{ width: 400 }, { width: 750 }, { width: 1000 }, { width: 1200 }],
      });

      // Replace original picture with optimized one
      picture.replaceWith(optimizedPicture);

      // Add lazy loading to image
      const img = optimizedPicture.querySelector('img');
      img.loading = 'eager'; // Hero images should load eagerly
      img.classList.add('hero-image');
    }

    // Style the content column
    const contentCol = cols[0];
    contentCol.classList.add('hero-content');

    // Extract and style heading
    const heading = contentCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      heading.classList.add('hero-heading');
    }

    // Style paragraphs
    const paragraphs = contentCol.querySelectorAll('p');
    paragraphs.forEach((p) => p.classList.add('hero-text'));

    // Style buttons/links
    const links = contentCol.querySelectorAll('a');
    links.forEach((link) => {
      if (link.textContent.trim()) {
        link.classList.add('button');
        if (link === links[0]) {
          link.classList.add('primary');
        } else {
          link.classList.add('secondary');
        }
      }
    });

    // Create overlay for better text readability
    const overlay = document.createElement('div');
    overlay.classList.add('hero-overlay');

    // Restructure the hero
    block.textContent = '';
    block.append(overlay);
    block.append(pictureCol);
    block.append(contentCol);
  }
}
