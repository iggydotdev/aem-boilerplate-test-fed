import { createOptimizedPicture } from '../../scripts/aem.js';
import { fetchProductBySlug } from '../../scripts/commerce.js';

/**
 * Decorates the product detail block
 * @param {Element} block The product detail block element
 */
export default async function decorate(block) {
  block.classList.add('product-detail-container');

  // Get product slug from URL
  const slug = window.location.pathname.split('/').pop();

  // Fetch product details
  const product = await fetchProductBySlug(slug);

  if (!product) {
    // Handle product not found
    block.innerHTML = '<div class="error-message"><h2>Product Not Found</h2><p>Sorry, the product you are looking for does not exist.</p><a href="/shop" class="button primary">Continue Shopping</a></div>';
    return;
  }

  // Create product detail layout
  const productDetail = document.createElement('div');
  productDetail.classList.add('product-detail');

  // Create image gallery
  const imageGallery = document.createElement('div');
  imageGallery.classList.add('product-gallery');

  // Main product image
  const mainImage = createOptimizedPicture(product.images[0], {
    alt: product.name,
    breakpoints: [{ width: 700 }, { width: 500 }, { width: 400 }],
  });
  mainImage.classList.add('main-product-image');

  // Thumbnail images
  const thumbnails = document.createElement('div');
  thumbnails.classList.add('product-thumbnails');

  product.images.forEach((image, index) => {
    const thumbnail = createOptimizedPicture(image, {
      alt: `${product.name} - View ${index + 1}`,
      width: 100,
    });
    thumbnail.classList.add('product-thumbnail');
    if (index === 0) {
      thumbnail.classList.add('active');
    }

    thumbnail.addEventListener('click', () => {
      // Update main image
      const newMainImage = createOptimizedPicture(image, {
        alt: product.name,
        breakpoints: [{ width: 700 }, { width: 500 }, { width: 400 }],
      });
      newMainImage.classList.add('main-product-image');
      mainImage.replaceWith(newMainImage);

      // Update active thumbnail
      document.querySelectorAll('.product-thumbnail').forEach((thumb) => {
        thumb.classList.remove('active');
      });
      thumbnail.classList.add('active');
    });

    thumbnails.append(thumbnail);
  });

  imageGallery.append(mainImage, thumbnails);

  // Create product info
  const productInfo = document.createElement('div');
  productInfo.classList.add('product-info');

  // Product title
  const productTitle = document.createElement('h1');
  productTitle.textContent = product.name;
  productTitle.classList.add('product-title');

  // Product price
  const productPrice = document.createElement('div');
  productPrice.classList.add('product-price');

  if (product.salePrice && product.salePrice < product.price) {
    const originalPrice = document.createElement('span');
    originalPrice.textContent = `$${product.price.toFixed(2)}`;
    originalPrice.classList.add('original-price');

    const salePrice = document.createElement('span');
    salePrice.textContent = `$${product.salePrice.toFixed(2)}`;
    salePrice.classList.add('sale-price');

    productPrice.append(originalPrice, salePrice);
  } else {
    productPrice.textContent = `$${product.price.toFixed(2)}`;
  }

  // Product rating
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

  const ratingCount = document.createElement('a');
  ratingCount.textContent = `${product.rating.toFixed(1)} (${product.reviewCount} reviews)`;
  ratingCount.href = '#reviews';
  ratingCount.classList.add('rating-count');

  const ratingContainer = document.createElement('div');
  ratingContainer.classList.add('rating-container');
  ratingContainer.append(ratingStars, ratingCount);

  // Product description
  const productDescription = document.createElement('div');
  productDescription.classList.add('product-description');
  productDescription.innerHTML = product.description;

  // Product features
  const productFeatures = document.createElement('ul');
  productFeatures.classList.add('product-features');

  product.features.forEach((feature) => {
    const featureItem = document.createElement('li');
    featureItem.textContent = feature;
    productFeatures.append(featureItem);
  });

  // Product options
  const productOptions = document.createElement('div');
  productOptions.classList.add('product-options');

  // Size selector
  if (product.sizes && product.sizes.length > 0) {
    const sizeSelector = document.createElement('div');
    sizeSelector.classList.add('option-selector', 'size-selector');

    const sizeLabel = document.createElement('label');
    sizeLabel.textContent = 'Size:';
    sizeLabel.htmlFor = 'size-select';

    const sizeSelect = document.createElement('div');
    sizeSelect.classList.add('size-options');

    product.sizes.forEach((size) => {
      const sizeOption = document.createElement('button');
      sizeOption.textContent = size;
      sizeOption.classList.add('size-option');
      sizeOption.setAttribute('data-size', size);

      sizeOption.addEventListener('click', () => {
        // Remove active class from all options
        document.querySelectorAll('.size-option').forEach((option) => {
          option.classList.remove('active');
        });

        // Add active class to selected option
        sizeOption.classList.add('active');
      });

      sizeSelect.append(sizeOption);
    });

    sizeSelector.append(sizeLabel, sizeSelect);
    productOptions.append(sizeSelector);
  }

  // Color selector
  if (product.colors && product.colors.length > 0) {
    const colorSelector = document.createElement('div');
    colorSelector.classList.add('option-selector', 'color-selector');

    const colorLabel = document.createElement('label');
    colorLabel.textContent = 'Color:';
    colorLabel.htmlFor = 'color-select';

    const colorSelect = document.createElement('div');
    colorSelect.classList.add('color-options');

    product.colors.forEach((color) => {
      const colorOption = document.createElement('button');
      colorOption.classList.add('color-option');
      colorOption.style.backgroundColor = color.code;
      colorOption.setAttribute('data-color', color.name);
      colorOption.setAttribute('aria-label', color.name);

      colorOption.addEventListener('click', () => {
        // Remove active class from all options
        document.querySelectorAll('.color-option').forEach((option) => {
          option.classList.remove('active');
        });

        // Add active class to selected option
        colorOption.classList.add('active');
      });

      colorSelect.append(colorOption);
    });

    colorSelector.append(colorLabel, colorSelect);
    productOptions.append(colorSelector);
  }

  // Quantity selector
  const quantitySelector = document.createElement('div');
  quantitySelector.classList.add('option-selector', 'quantity-selector');

  const quantityLabel = document.createElement('label');
  quantityLabel.textContent = 'Quantity:';
  quantityLabel.htmlFor = 'quantity-input';

  const quantityControls = document.createElement('div');
  quantityControls.classList.add('quantity-controls');

  const decreaseButton = document.createElement('button');
  decreaseButton.textContent = '-';
  decreaseButton.classList.add('quantity-button', 'decrease');

  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.id = 'quantity-input';
  quantityInput.min = '1';
  quantityInput.max = '99';
  quantityInput.value = '1';

  const increaseButton = document.createElement('button');
  increaseButton.textContent = '+';
  increaseButton.classList.add('quantity-button', 'increase');

  // Add event listeners for quantity buttons
  decreaseButton.addEventListener('click', () => {
    const currentValue = Number.parseInt(quantityInput.value, 10);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  increaseButton.addEventListener('click', () => {
    const currentValue = Number.parseInt(quantityInput.value, 10);
    if (currentValue < 99) {
      quantityInput.value = currentValue + 1;
    }
  });

  quantityControls.append(decreaseButton, quantityInput, increaseButton);
  quantitySelector.append(quantityLabel, quantityControls);
  productOptions.append(quantitySelector);

  // Add to cart button
  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.classList.add('button', 'primary', 'add-to-cart');

  addToCartButton.addEventListener('click', () => {
    // Get selected options
    const selectedSize = document.querySelector('.size-option.active')?.getAttribute('data-size');
    const selectedColor = document.querySelector('.color-option.active')?.getAttribute('data-color');
    const quantity = Number.parseInt(quantityInput.value, 10);

    // Validate selections
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Please select a color');
      return;
    }

    // Add to cart logic would be implemented here
    console.log('Adding to cart:', {
      product: product.name,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    // Show confirmation message
    const confirmationMessage = document.createElement('div');
    confirmationMessage.classList.add('cart-confirmation');
    confirmationMessage.textContent = `${product.name} added to your cart!`;

    document.body.append(confirmationMessage);

    setTimeout(() => {
      confirmationMessage.classList.add('show');

      setTimeout(() => {
        confirmationMessage.classList.remove('show');
        setTimeout(() => {
          confirmationMessage.remove();
        }, 300);
      }, 3000);
    }, 10);
  });

  // Assemble product info
  productInfo.append(
    productTitle,
    productPrice,
    ratingContainer,
    productDescription,
    productFeatures,
    productOptions,
    addToCartButton,
  );

  // Create product tabs
  const productTabs = document.createElement('div');
  productTabs.classList.add('product-tabs');

  const tabButtons = document.createElement('div');
  tabButtons.classList.add('tab-buttons');

  const tabContents = document.createElement('div');
  tabContents.classList.add('tab-contents');

  // Define tabs
  const tabs = [
    { id: 'details', label: 'Product Details', content: product.details },
    { id: 'specs', label: 'Specifications', content: product.specifications },
    { id: 'shipping', label: 'Shipping & Returns', content: product.shippingInfo },
    { id: 'reviews', label: 'Reviews', content: '' }, // Will be populated dynamically
  ];

  tabs.forEach((tab, index) => {
    // Create tab button
    const tabButton = document.createElement('button');
    tabButton.textContent = tab.label;
    tabButton.classList.add('tab-button');
    tabButton.setAttribute('data-tab', tab.id);

    if (index === 0) {
      tabButton.classList.add('active');
    }

    // Create tab content
    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');
    tabContent.id = `tab-${tab.id}`;

    if (index === 0) {
      tabContent.classList.add('active');
    }

    // Populate tab content
    if (tab.id === 'reviews') {
      // Create reviews content
      const reviewsContent = document.createElement('div');
      reviewsContent.classList.add('reviews-content');

      // Add review summary
      const reviewSummary = document.createElement('div');
      reviewSummary.classList.add('review-summary');

      const averageRating = document.createElement('div');
      averageRating.classList.add('average-rating');

      const ratingNumber = document.createElement('span');
      ratingNumber.textContent = product.rating.toFixed(1);
      ratingNumber.classList.add('rating-number');

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

      const reviewCount = document.createElement('span');
      reviewCount.textContent = `Based on ${product.reviewCount} reviews`;
      reviewCount.classList.add('review-count');

      averageRating.append(ratingNumber, ratingStars, reviewCount);
      reviewSummary.append(averageRating);

      // Add review list
      const reviewList = document.createElement('div');
      reviewList.classList.add('review-list');

      // Populate with sample reviews
      const sampleReviews = [
        {
          author: 'John D.',
          date: '2023-05-15',
          rating: 5,
          title: 'Excellent quality and performance',
          content:
            "I've been using this product for a month now and I'm extremely satisfied with its performance. The quality is outstanding and it has exceeded my expectations in every way.",
        },
        {
          author: 'Sarah M.',
          date: '2023-04-22',
          rating: 4,
          title: 'Great product with minor issues',
          content:
            "Overall, I'm very happy with this purchase. The product is well-made and functions as advertised. The only reason I'm giving it 4 stars instead of 5 is because the sizing runs a bit small.",
        },
        {
          author: 'Michael T.',
          date: '2023-03-10',
          rating: 5,
          title: 'Perfect for outdoor adventures',
          content:
            "This product has been a game-changer for my hiking trips. It's lightweight, durable, and performs exceptionally well in all weather conditions. Highly recommended!",
        },
      ];

      sampleReviews.forEach((review) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        const reviewHeader = document.createElement('div');
        reviewHeader.classList.add('review-header');

        const reviewAuthor = document.createElement('span');
        reviewAuthor.textContent = review.author;
        reviewAuthor.classList.add('review-author');

        const reviewDate = document.createElement('span');
        reviewDate.textContent = new Date(review.date).toLocaleDateString();
        reviewDate.classList.add('review-date');

        const reviewRating = document.createElement('div');
        reviewRating.classList.add('review-rating');

        for (let i = 1; i <= 5; i++) {
          const star = document.createElement('span');
          star.classList.add('star');
          if (i <= review.rating) {
            star.classList.add('filled');
          }
          reviewRating.append(star);
        }

        reviewHeader.append(reviewAuthor, reviewDate, reviewRating);

        const reviewTitle = document.createElement('h4');
        reviewTitle.textContent = review.title;
        reviewTitle.classList.add('review-title');

        const reviewContent = document.createElement('p');
        reviewContent.textContent = review.content;
        reviewContent.classList.add('review-content');

        reviewItem.append(reviewHeader, reviewTitle, reviewContent);
        reviewList.append(reviewItem);
      });

      // Add write review button
      const writeReviewButton = document.createElement('button');
      writeReviewButton.textContent = 'Write a Review';
      writeReviewButton.classList.add('button', 'secondary', 'write-review');

      reviewsContent.append(reviewSummary, reviewList, writeReviewButton);
      tabContent.append(reviewsContent);
    } else {
      tabContent.innerHTML = tab.content;
    }

    // Add event listener to tab button
    tabButton.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      document.querySelectorAll('.tab-button').forEach((btn) => {
        btn.classList.remove('active');
      });

      document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
      });

      // Add active class to clicked button and corresponding content
      tabButton.classList.add('active');
      tabContent.classList.add('active');
    });

    tabButtons.append(tabButton);
    tabContents.append(tabContent);
  });

  productTabs.append(tabButtons, tabContents);

  // Create related products section
  const relatedProducts = document.createElement('div');
  relatedProducts.classList.add('related-products');

  const relatedTitle = document.createElement('h2');
  relatedTitle.textContent = 'You May Also Like';
  relatedTitle.classList.add('related-title');

  const relatedGrid = document.createElement('div');
  relatedGrid.classList.add('product-grid');

  // Fetch related products (would normally come from API)
  const relatedProductsData = [
    {
      id: 1,
      name: 'TrailBlaze Hiking Boots',
      price: 149.99,
      image: '/images/products/hiking-boots.jpg',
      slug: 'trailblaze-hiking-boots',
      rating: 4.7,
      reviewCount: 42,
    },
    {
      id: 2,
      name: 'Evergreen Backpack',
      price: 89.99,
      image: '/images/products/backpack.jpg',
      slug: 'evergreen-backpack',
      rating: 4.5,
      reviewCount: 28,
    },
    {
      id: 3,
      name: 'Mountain Peak Trekking Poles',
      price: 59.99,
      image: '/images/products/trekking-poles.jpg',
      slug: 'mountain-peak-trekking-poles',
      rating: 4.8,
      reviewCount: 36,
    },
    {
      id: 4,
      name: 'NatureStep Hiking Socks',
      price: 19.99,
      image: '/images/products/hiking-socks.jpg',
      slug: 'naturestep-hiking-socks',
      rating: 4.6,
      reviewCount: 52,
    },
  ];

  relatedProductsData.forEach((product) => {
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

    // Assemble product card
    productInfo.append(productName, productPrice, ratingContainer);
    productCard.append(productImage, productInfo);
    productLink.append(productCard);
    relatedGrid.append(productLink);
  });

  relatedProducts.append(relatedTitle, relatedGrid);

  // Assemble product detail
  productDetail.append(imageGallery, productInfo);

  // Clear original content and add new elements
  block.textContent = '';
  block.append(productDetail, productTabs, relatedProducts);
}
