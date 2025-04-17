/**
 * Decorates the testimonials block
 * @param {Element} block The testimonials block element
 */
export default function decorate(block) {
  block.classList.add('testimonials-container');

  // Get heading from first row
  const heading = block.children[0];
  heading.classList.add('testimonials-heading');

  // Get testimonials from second row
  const testimonialsRow = block.children[1];

  // Create testimonials slider
  const testimonialsSlider = document.createElement('div');
  testimonialsSlider.classList.add('testimonials-slider');

  // Process each testimonial
  Array.from(testimonialsRow.children).forEach((testimonial) => {
    const testimonialCard = document.createElement('div');
    testimonialCard.classList.add('testimonial-card');

    // Get testimonial text and author
    const paragraphs = testimonial.querySelectorAll('p');

    if (paragraphs.length >= 2) {
      const quote = paragraphs[0];
      quote.classList.add('testimonial-quote');

      const author = paragraphs[1];
      author.classList.add('testimonial-author');

      // Add quote marks
      const quoteWrapper = document.createElement('div');
      quoteWrapper.classList.add('quote-wrapper');

      const quoteIcon = document.createElement('span');
      quoteIcon.classList.add('quote-icon');
      quoteIcon.innerHTML = '&ldquo;';

      quoteWrapper.appendChild(quoteIcon);
      quoteWrapper.appendChild(quote);

      testimonialCard.appendChild(quoteWrapper);
      testimonialCard.appendChild(author);
    }

    testimonialsSlider.appendChild(testimonialCard);
  });

  // Add navigation buttons
  const prevButton = document.createElement('button');
  prevButton.classList.add('testimonial-nav', 'prev');
  prevButton.setAttribute('aria-label', 'Previous testimonial');
  prevButton.innerHTML = '&lt;';

  const nextButton = document.createElement('button');
  nextButton.classList.add('testimonial-nav', 'next');
  nextButton.setAttribute('aria-label', 'Next testimonial');
  nextButton.innerHTML = '&gt;';

  // Create slider container with navigation
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('slider-container');
  sliderContainer.appendChild(prevButton);
  sliderContainer.appendChild(testimonialsSlider);
  sliderContainer.appendChild(nextButton);

  // Replace original content
  block.textContent = '';
  block.appendChild(heading);
  block.appendChild(sliderContainer);

  // Add slider functionality
  let currentSlide = 0;
  const slides = testimonialsSlider.children;
  const slideCount = slides.length;

  // Show first slide
  if (slides.length > 0) {
    slides[0].classList.add('active');
  }

  // Add event listeners to navigation buttons
  prevButton.addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    slides[currentSlide].classList.add('active');
  });

  nextButton.addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slideCount;
    slides[currentSlide].classList.add('active');
  });

  // Auto-rotate slides
  setInterval(() => {
    nextButton.click();
  }, 5000);
}
