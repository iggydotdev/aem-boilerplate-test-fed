import { createOptimizedPicture } from '../../scripts/aem.js';
import { fetchProducts } from '../../scripts/commerce.js';

/**
 * Decorates the product grid block
 * @param {Element} block The product grid block element
 */
export default async function decorate(block) {
  block.classList.add('product-grid-container');

  // Get category and filters from URL
  const url = new URL(window.location.href);
  const category = url.pathname.split('/').pop();
  const filters = {};

  // Parse query parameters for filters
  url.searchParams.forEach((value, key) => {
    if (key.startsWith('filter_')) {
      const filterName = key.replace('filter_', '');
      filters[filterName] = value.split(',');
    }
  });

  // Get sort parameter
  const sort = url.searchParams.get('sort') || 'featured';

  // Get pagination parameters
  const page = Number.parseInt(url.searchParams.get('page') || '1', 10);
  const perPage = Number.parseInt(url.searchParams.get('per_page') || '12', 10);

  // Fetch products
  const { products, total } = await fetchProducts(category, perPage, page, filters, sort);

  // Create filter section
  const filterSection = document.createElement('div');
  filterSection.classList.add('filter-section');

  // Create filter toggle for mobile
  const filterToggle = document.createElement('button');
  filterToggle.classList.add('filter-toggle');
  filterToggle.textContent = 'Filters';
  filterToggle.addEventListener('click', () => {
    filterSection.classList.toggle('filters-open');
  });

  // Create filter form
  const filterForm = document.createElement('form');
  filterForm.classList.add('filter-form');
  filterForm.action = window.location.pathname;
  filterForm.method = 'get';

  // Add filter groups (this would be dynamic based on category)
  const filterGroups = [
    { name: 'brand', label: 'Brand', options: ['Evergreen', 'Mountain Peak', 'TrailBlaze', 'NatureStep', 'WildPath'] },
    { name: 'price', label: 'Price', options: ['Under $50', '$50-$100', '$100-$200', '$200-$500', 'Over $500'] },
    { name: 'color', label: 'Color', options: ['Black', 'Blue', 'Green', 'Red', 'Grey', 'Orange'] },
    { name: 'size', label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  ];

  filterGroups.forEach((group) => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = group.label;
    fieldset.append(legend);

    group.options.forEach((option) => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = `filter_${group.name}`;
      checkbox.value = option;

      // Check if this option is already selected
      if (filters[group.name] && filters[group.name].includes(option)) {
        checkbox.checked = true;
      }

      label.append(checkbox, document.createTextNode(option));
      fieldset.append(label);
    });

    filterForm.append(fieldset);
  });

  // Add apply filters button
  const applyButton = document.createElement('button');
  applyButton.type = 'submit';
  applyButton.textContent = 'Apply Filters';
  applyButton.classList.add('button', 'primary');

  // Add clear filters button
  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.textContent = 'Clear Filters';
  clearButton.classList.add('button', 'secondary');
  clearButton.addEventListener('click', () => {
    window.location.href = window.location.pathname;
  });

  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('filter-buttons');
  buttonGroup.append(applyButton, clearButton);

  filterForm.append(buttonGroup);
  filterSection.append(filterForm);

  // Create sort section
  const sortSection = document.createElement('div');
  sortSection.classList.add('sort-section');

  const sortLabel = document.createElement('label');
  sortLabel.textContent = 'Sort by: ';
  sortLabel.htmlFor = 'sort-select';

  const sortSelect = document.createElement('select');
  sortSelect.id = 'sort-select';
  sortSelect.name = 'sort';

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
  ];

  sortOptions.forEach((option) => {
    const optionEl = document.createElement('option');
    optionEl.value = option.value;
    optionEl.textContent = option.label;
    if (option.value === sort) {
      optionEl.selected = true;
    }
    sortSelect.append(optionEl);
  });

  sortSelect.addEventListener('change', () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('sort', sortSelect.value);
    window.location.href = currentUrl.toString();
  });

  sortSection.append(sortLabel, sortSelect);

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

    // Add rating stars
    const ratingStars = document.createElement('div');
    ratingStars.classList.add('rating-stars');

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      if (i <= product.rating) {
        star.classList.add('filled');
      }
      ratingStars.append(star);
    }

    const ratingCount = document.createElement('span');
    ratingCount.textContent = `(${product.reviewCount})`;
    ratingCount.classList.add('rating-count');

    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container');
    ratingContainer.append(ratingStars, ratingCount);

    // Create product link
    const productLink = document.createElement('a');
    productLink.href = `/products/${product.slug}`;
    productLink.classList.add('product-link');
    productLink.setAttribute('aria-label', `View ${product.name}`);

    // Add quick shop button
    const quickShopButton = document.createElement('button');
    quickShopButton.textContent = 'Quick Shop';
    quickShopButton.classList.add('quick-shop-button');
    quickShopButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Quick shop functionality would be implemented here
      console.log(`Quick shop for ${product.name}`);
    });

    // Assemble product card
    productInfo.append(productName, productPrice, ratingContainer);
    productCard.append(productImage, productInfo, quickShopButton);
    productLink.append(productCard);
    productGrid.append(productLink);
  });

  // Create pagination
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');

  const totalPages = Math.ceil(total / perPage);

  // Previous page button
  const prevButton = document.createElement('a');
  prevButton.classList.add('pagination-button', 'prev');
  prevButton.textContent = 'Previous';
  if (page > 1) {
    const prevUrl = new URL(window.location.href);
    prevUrl.searchParams.set('page', page - 1);
    prevButton.href = prevUrl.toString();
  } else {
    prevButton.classList.add('disabled');
  }

  // Next page button
  const nextButton = document.createElement('a');
  nextButton.classList.add('pagination-button', 'next');
  nextButton.textContent = 'Next';
  if (page < totalPages) {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('page', page + 1);
    nextButton.href = nextUrl.toString();
  } else {
    nextButton.classList.add('disabled');
  }

  // Page numbers
  const pageNumbers = document.createElement('div');
  pageNumbers.classList.add('page-numbers');

  // Determine which page numbers to show
  let startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageLink = document.createElement('a');
    pageLink.textContent = i.toString();
    pageLink.classList.add('page-number');

    if (i === page) {
      pageLink.classList.add('current');
    } else {
      const pageUrl = new URL(window.location.href);
      pageUrl.searchParams.set('page', i);
      pageLink.href = pageUrl.toString();
    }

    pageNumbers.append(pageLink);
  }

  pagination.append(prevButton, pageNumbers, nextButton);

  // Clear original content and add new elements
  block.textContent = '';
  block.append(filterToggle, filterSection, sortSection, productGrid, pagination);
}
