import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Decorates the footer.
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = null//getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  if (fragment) {
    // Create footer structure
    const footer = document.createElement('div');
    footer.classList.add('footer-wrapper');

    // Top section with columns
    const topSection = document.createElement('div');
    topSection.classList.add('footer-top');

    const cols = [...fragment.firstElementChild.children];
    console.log('>>>COLS', cols);

    // Column 1: About
    const aboutColumn = document.createElement('div');
    aboutColumn.classList.add('footer-column');
    aboutColumn.innerHTML = `
      <h3>About Evergreen Outdoors</h3>
      <p>Empowering outdoor enthusiasts with sustainable gear for responsible adventures since 2010.</p>
      <div class="social-links">
        <a href="https://instagram.com/evergreenoutdoors" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://facebook.com/evergreenoutdoors" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="https://twitter.com/evergreenout" aria-label="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
        </a>
        <a href="https://pinterest.com/evergreenoutdoors" aria-label="Pinterest">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12h8"></path><path d="M12 8v8"></path><circle cx="12" cy="12" r="10"></circle></svg>
        </a>
      </div>
    `;

    // Column 2: Quick Links
    const linksColumn = document.createElement('div');
    linksColumn.classList.add('footer-column');
    linksColumn.innerHTML = `
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/shop">Shop All</a></li>
        <li><a href="/hiking">Hiking</a></li>
        <li><a href="/camping">Camping</a></li>
        <li><a href="/climbing">Climbing</a></li>
        <li><a href="/water-sports">Water Sports</a></li>
        <li><a href="/winter">Winter</a></li>
      </ul>
    `;

    // Column 3: Customer Service
    const serviceColumn = document.createElement('div');
    serviceColumn.classList.add('footer-column');
    serviceColumn.innerHTML = `
      <h3>Customer Service</h3>
      <ul>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/shipping">Shipping & Returns</a></li>
        <li><a href="/warranty">Warranty</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/size-guide">Size Guide</a></li>
      </ul>
    `;

    // Column 4: Newsletter
    const newsletterColumn = document.createElement('div');
    newsletterColumn.classList.add('footer-column');
    newsletterColumn.innerHTML = `
      <h3>Stay Connected</h3>
      <p>Subscribe to our newsletter for exclusive offers and outdoor inspiration.</p>
      <form class="newsletter-form">
        <input type="email" placeholder="Your email address" required aria-label="Email for newsletter">
        <button type="submit">Subscribe</button>
      </form>
    `;

    topSection.append(aboutColumn, linksColumn, serviceColumn, newsletterColumn);

    // Bottom section with copyright
    const bottomSection = document.createElement('div');
    bottomSection.classList.add('footer-bottom');
    bottomSection.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} Evergreen Outdoors. All rights reserved.</p>
      <ul class="footer-legal">
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/accessibility">Accessibility</a></li>
      </ul>
    `;

    // Assemble footer
    footer.append(topSection, bottomSection);

    // Add sustainability badge
    const sustainabilityBadge = document.createElement('div');
    sustainabilityBadge.classList.add('sustainability-badge');
    sustainabilityBadge.innerHTML = `
      <div class="badge-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
        <span>Committed to Sustainable Outdoor Adventures</span>
      </div>
    `;

    footer.append(sustainabilityBadge);

    // Replace original content
    block.textContent = '';
    block.append(footer);

    // Add newsletter form functionality
    const form = block.querySelector('.newsletter-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;

      // Simulate form submission
      const button = form.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Subscribing...';
      button.disabled = true;

      setTimeout(() => {
        form.innerHTML = '<p class="success-message">Thanks for subscribing! Check your inbox soon.</p>';
      }, 1000);
    });
  }
}
