/**
 * Decorates the CTA block
 * @param {Element} block The CTA block element
 */
export default function decorate(block) {
  block.classList.add('cta-container');

  // Get content from first row
  const content = block.children[0];
  content.classList.add('cta-content');

  // Style elements
  const heading = content.querySelector('h2');
  if (heading) {
    heading.classList.add('cta-heading');
  }

  const paragraph = content.querySelector('p');
  if (paragraph) {
    paragraph.classList.add('cta-text');
  }

  const form = content.querySelector('form');
  if (form) {
    form.classList.add('cta-form');

    // Add form submission handler
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

  // Create background
  const background = document.createElement('div');
  background.classList.add('cta-background');

  // Restructure the block
  block.textContent = '';
  block.appendChild(background);
  block.appendChild(content);
}
