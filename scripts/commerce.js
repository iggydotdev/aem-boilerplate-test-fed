/* eslint-disable no-console */
/**
 * Simulated product database
 */
const products = [
  {
    id: 1,
    name: 'TrailBlaze Hiking Boots',
    slug: 'trailblaze-hiking-boots',
    price: 149.99,
    salePrice: null,
    description:
      '<p>Conquer any trail with our premium TrailBlaze Hiking Boots. Designed for serious hikers who demand performance, comfort, and durability.</p>',
    details:
      '<p>The TrailBlaze Hiking Boots feature our proprietary EcoGrip™ outsole for superior traction on varied terrain. The waterproof membrane keeps your feet dry through streams and rain, while the cushioned midsole provides all-day comfort.</p><p>Made with sustainable materials and ethical manufacturing practices, these boots are as good for the planet as they are for your adventures.</p>',
    specifications:
      '<ul><li><strong>Upper:</strong> Waterproof full-grain leather and recycled nylon</li><li><strong>Midsole:</strong> Responsive EVA foam with arch support</li><li><strong>Outsole:</strong> EcoGrip™ rubber with 5mm multidirectional lugs</li><li><strong>Waterproofing:</strong> EverDry™ membrane, 100% waterproof</li><li><strong>Weight:</strong> 1 lb 2 oz (per boot, size 9)</li><li><strong>Height:</strong> Mid-cut for ankle support</li><li><strong>Origin:</strong> Responsibly manufactured in Vietnam</li></ul>',
    shippingInfo:
      '<p>Free shipping on orders over $50. Standard delivery in 3-5 business days.</p><p>We accept returns within 60 days of purchase. Items must be unworn with original tags attached.</p>',
    features: [
      'Waterproof full-grain leather upper',
      'EverDry™ waterproof membrane',
      'Cushioned EVA midsole for all-day comfort',
      'EcoGrip™ rubber outsole for superior traction',
      'Recycled materials used throughout',
      'Climate Neutral Certified',
    ],
    images: [
      '/images/products/hiking-boots-1.jpg',
      '/images/products/hiking-boots-2.jpg',
      '/images/products/hiking-boots-3.jpg',
      '/images/products/hiking-boots-4.jpg',
    ],
    category: 'hiking',
    subcategory: 'footwear',
    rating: 4.7,
    reviewCount: 42,
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    colors: [
      { name: 'Brown', code: '#8B4513' },
      { name: 'Black', code: '#000000' },
      { name: 'Grey', code: '#808080' },
    ],
    sustainabilityScore: 8.5,
    related: [2, 5, 8, 12],
  },
  {
    id: 2,
    name: 'Evergreen Backpack 35L',
    slug: 'evergreen-backpack-35l',
    price: 129.99,
    salePrice: 99.99,
    description:
      '<p>The perfect companion for day hikes or weekend adventures. Our Evergreen Backpack combines thoughtful organization with sustainable materials.</p>',
    details:
      '<p>The Evergreen Backpack features multiple compartments for organized storage, padded laptop sleeve, and external attachment points for gear. The breathable back panel and adjustable straps ensure comfortable carrying even on long treks.</p><p>Made from recycled polyester with a durable water-repellent finish, this pack helps reduce plastic waste while keeping your gear protected from the elements.</p>',
    specifications:
      '<ul><li><strong>Capacity:</strong> 35 liters</li><li><strong>Material:</strong> 100% recycled polyester with DWR finish</li><li><strong>Dimensions:</strong> 22" x 12" x 9"</li><li><strong>Weight:</strong> 2 lbs 3 oz</li><li><strong>Laptop Sleeve:</strong> Fits up to 15" laptop</li><li><strong>Water Bottle Pockets:</strong> 2 side pockets</li><li><strong>Origin:</strong> Responsibly manufactured in Philippines</li></ul>',
    shippingInfo:
      '<p>Free shipping on orders over $50. Standard delivery in 3-5 business days.</p><p>We accept returns within 60 days of purchase. Items must be unused with original tags attached.</p>',
    features: [
      '100% recycled polyester construction',
      'Durable water-repellent finish',
      'Padded laptop sleeve (fits up to 15")',
      'Multiple organization pockets',
      'Breathable back panel and shoulder straps',
      'Lifetime warranty against manufacturing defects',
    ],
    images: [
      '/images/products/backpack-1.jpg',
      '/images/products/backpack-2.jpg',
      '/images/products/backpack-3.jpg',
      '/images/products/backpack-4.jpg',
    ],
    category: 'hiking',
    subcategory: 'bags',
    rating: 4.5,
    reviewCount: 28,
    sizes: ['One Size'],
    colors: [
      { name: 'Forest Green', code: '#228B22' },
      { name: 'Navy Blue', code: '#000080' },
      { name: 'Charcoal', code: '#36454F' },
    ],
    sustainabilityScore: 9.0,
    related: [1, 5, 7, 10],
  },
  {
    id: 3,
    name: 'Alpine Pro Tent 2-Person',
    slug: 'alpine-pro-tent-2-person',
    price: 299.99,
    salePrice: null,
    description:
      '<p>Experience the perfect balance of lightweight design and weather protection with our Alpine Pro Tent. Ideal for backpacking trips and weekend adventures.</p>',
    details:
      '<p>The Alpine Pro Tent features a freestanding design with a quick setup system that can be pitched in minutes. The waterproof rainfly and bathtub floor keep you dry in wet conditions, while mesh panels provide ventilation on warm nights.</p><p>Designed with sustainability in mind, this tent uses solution-dyed fabrics that reduce water usage in manufacturing by 80% compared to conventional methods.</p>',
    specifications:
      '<ul><li><strong>Capacity:</strong> 2 person</li><li><strong>Trail Weight:</strong> 3 lbs 10 oz</li><li><strong>Packed Weight:</strong> 4 lbs 2 oz</li><li><strong>Floor Dimensions:</strong> 88" x 52"</li><li><strong>Peak Height:</strong> 40"</li><li><strong>Doors:</strong> 2</li><li><strong>Vestibules:</strong> 2 (9 sq ft each)</li><li><strong>Materials:</strong> Solution-dyed ripstop nylon, DAC aluminum poles</li><li><strong>Waterproofing:</strong> 1500mm floor, 1200mm rainfly</li><li><strong>Origin:</strong> Responsibly manufactured in Vietnam</li></ul>',
    shippingInfo:
      '<p>Free shipping on orders over $50. Standard delivery in 3-5 business days.</p><p>We accept returns within 60 days of purchase. Items must be unused with original tags attached.</p>',
    features: [
      'Lightweight, freestanding design',
      'Quick setup with color-coded poles',
      'Two doors and vestibules for easy access and storage',
      'Solution-dyed fabrics reduce water usage in manufacturing',
      'Mesh panels for ventilation',
      'Includes footprint and repair kit',
    ],
    images: [
      '/images/products/tent-1.jpg',
      '/images/products/tent-2.jpg',
      '/images/products/tent-3.jpg',
      '/images/products/tent-4.jpg',
    ],
    category: 'camping',
    subcategory: 'tents',
    rating: 4.8,
    reviewCount: 36,
    sizes: ['2-Person', '3-Person', '4-Person'],
    colors: [
      { name: 'Orange/Grey', code: '#FFA500' },
      { name: 'Green/Grey', code: '#2E8B57' },
    ],
    sustainabilityScore: 8.7,
    related: [4, 6, 9, 11],
  },
  {
    id: 4,
    name: 'EcoTherm Sleeping Bag',
    slug: 'ecotherm-sleeping-bag',
    price: 179.99,
    salePrice: 149.99,
    description:
      '<p>Stay warm and comfortable on your outdoor adventures with our EcoTherm Sleeping Bag, featuring recycled insulation and responsibly sourced materials.</p>',
    details:
      "<p>The EcoTherm Sleeping Bag provides exceptional warmth with our innovative recycled insulation that maintains loft even when damp. The draft collar and zipper baffle prevent heat loss, while the ergonomic hood keeps your head warm in cold conditions.</p><p>We've designed this sleeping bag with sustainability in mind, using recycled materials for both the shell and insulation without compromising on performance or durability.</p>",
    specifications:
      "<ul><li><strong>Temperature Rating:</strong> 20°F / -7°C</li><li><strong>Fill:</strong> 650-fill recycled down</li><li><strong>Shell:</strong> 20D recycled ripstop nylon with DWR finish</li><li><strong>Lining:</strong> Soft recycled polyester</li><li><strong>Weight:</strong> 2 lbs 8 oz</li><li><strong>Length:</strong> Regular (fits up to 6'0\"), Long (fits up to 6'6\")</li><li><strong>Shape:</strong> Mummy</li><li><strong>Zipper:</strong> Full-length, two-way with anti-snag design</li><li><strong>Origin:</strong> Responsibly manufactured in China</li></ul>",
    shippingInfo:
      '<p>Free shipping on orders over $50. Standard delivery in 3-5 business days.</p><p>We accept returns within 60 days of purchase. Items must be unused with original tags attached.</p>',
    features: [
      '650-fill recycled down insulation',
      'Certified to Responsible Down Standard (RDS)',
      'Recycled nylon shell with DWR finish',
      'Draft collar and zipper baffle to prevent heat loss',
      'Internal pocket for small essentials',
      'Includes compression stuff sack',
    ],
    images: [
      '/images/products/sleeping-bag-1.jpg',
      '/images/products/sleeping-bag-2.jpg',
      '/images/products/sleeping-bag-3.jpg',
      '/images/products/sleeping-bag-4.jpg',
    ],
    category: 'camping',
    subcategory: 'sleeping-bags',
    rating: 4.6,
    reviewCount: 52,
    sizes: ['Regular', 'Long'],
    colors: [
      { name: 'Blue', code: '#0000CD' },
      { name: 'Red', code: '#8B0000' },
      { name: 'Green', code: '#006400' },
    ],
    sustainabilityScore: 9.2,
    related: [3, 6, 9, 11],
  },
  {
    id: 5,
    name: 'Mountain Peak Trekking Poles',
    slug: 'mountain-peak-trekking-poles',
    price: 89.99,
    salePrice: null,
    description:
      '<p>Enhance stability and reduce impact on your joints with our lightweight, adjustable Mountain Peak Trekking Poles, perfect for any hiking adventure.</p>',
    details:
      '<p>Our Mountain Peak Trekking Poles feature a quick-lock adjustment system that allows for easy height changes on the trail. The ergonomic cork grips wick away moisture and conform to your hand over time for personalized comfort.</p><p>The carbide tips provide excellent traction on various terrains, while the included rubber tips protect both the poles and sensitive trail surfaces. When not in use, these poles collapse down for easy storage in your pack.</p>',
    specifications:
      '<ul><li><strong>Material:</strong> Aircraft-grade aluminum</li><li><strong>Weight:</strong> 9 oz per pole</li><li><strong>Collapsed Length:</strong> 24 inches</li><li><strong>Extended Length:</strong> Adjustable from 27" to 55"</li><li><strong>Grip:</strong> Natural cork with EVA foam extension</li><li><strong>Strap:</strong> Adjustable, moisture-wicking webbing</li><li><strong>Tips:</strong> Carbide with removable rubber tips</li><li><strong>Baskets:</strong> Includes both trekking and snow baskets</li><li><strong>Origin:</strong> Responsibly manufactured in Taiwan</li></ul>',
    shippingInfo:
      '<p>Free shipping on orders over $50. Standard delivery in 3-5 business days.</p><p>We accept returns within 60 days of purchase. Items must be unused with original tags attached.</p>',
    features: [
      'Lightweight aircraft-grade aluminum construction',
      'Quick-lock adjustment system',
      'Ergonomic cork grips with foam extensions',
      'Carbide tips with removable rubber caps',
      'Includes both trekking and snow baskets',
      'Folds down to 24" for easy storage',
    ],
    images: [
      '/images/products/trekking-poles-1.jpg',
      '/images/products/trekking-poles-2.jpg',
      '/images/products/trekking-poles-3.jpg',
      '/images/products/trekking-poles-4.jpg',
    ],
    category: 'hiking',
    subcategory: 'accessories',
    rating: 4.8,
    reviewCount: 36,
    sizes: ['One Size'],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Blue', code: '#0000CD' },
      { name: 'Red', code: '#8B0000' },
    ],
    sustainabilityScore: 7.8,
    related: [1, 2, 7, 10],
  },
];

/**
 * Fetches products based on category and other filters
 * @param {string} category - Product category
 * @param {number} limit - Number of products to return
 * @param {number} page - Page number for pagination
 * @param {Object} filters - Filters to apply
 * @param {string} sort - Sort order
 * @returns {Object} - Products and total count
 */
export async function fetchProducts(category = '', limit = 12, page = 1, filters = {}, sort = 'featured') {
  // Simulate API delay
  await new Promise((resolve) => { setTimeout(resolve, 300); });

  // Filter products by category
  let filteredProducts = [...products];

  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter((product) => product.category === category);
  }

  // Apply additional filters
  Object.entries(filters).forEach(([key, values]) => {
    if (values && values.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        // Handle different filter types
        switch (key) {
          case 'price':
            // Price range filtering
            return values.some((range) => {
              if (range === 'Under $50') return product.price < 50;
              if (range === '$50-$100') return product.price >= 50 && product.price <= 100;
              if (range === '$100-$200') return product.price > 100 && product.price <= 200;
              if (range === '$200-$500') return product.price > 200 && product.price <= 500;
              if (range === 'Over $500') return product.price > 500;
              return false;
            });
          case 'color':
            // Color filtering
            return values.some(
              (color) => product.colors
                && product.colors.some((c) => c.name.toLowerCase() === color.toLowerCase()),
            );
          case 'size':
            // Size filtering
            return values.some((size) => product.sizes && product.sizes.includes(size));
          case 'brand':
            // Brand filtering (assuming brand is in the product name)
            return values.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase()));
          default:
            return true;
        }
      });
    }
  });

  // Sort products
  switch (sort) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      // In a real app, would sort by date
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'featured':
    default:
      // No specific sorting for featured
      break;
  }

  // Calculate pagination
  const total = filteredProducts.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedProducts = filteredProducts.slice(start, end);

  return {
    products: paginatedProducts,
    total,
  };
}

/**
 * Fetches a product by slug
 * @param {string} slug - Product slug
 * @returns {Object} - Product details
 */
export async function fetchProductBySlug(slug) {
  // Simulate API delay
  await new Promise((resolve) => { setTimeout(resolve, 300); });

  return products.find((product) => product.slug === slug) || null;
}

/**
 * Adds a product to the cart
 * @param {number} productId - Product ID
 * @param {number} quantity - Quantity to add
 * @param {Object} options - Product options (size, color, etc.)
 * @returns {Object} - Updated cart
 */
export async function addToCart(productId, quantity = 1, options = {}) {
  // Simulate API delay
  await new Promise((resolve) => { setTimeout(resolve, 500); });

  // In a real app, this would interact with a cart API
  console.info('Adding to cart:', { productId, quantity, options });

  // Return mock cart data
  return {
    items: [{ productId, quantity, options }],
    totalItems: quantity,
    subtotal: 99.99,
  };
}

/**
 * Searches products by query
 * @param {string} query - Search query
 * @returns {Array} - Matching products
 */
export async function searchProducts(query) {
  // Simulate API delay
  await new Promise((resolve) => { setTimeout(resolve, 300); });

  if (!query) return [];

  const normalizedQuery = query.toLowerCase();

  return products.filter(
    (product) => product.name.toLowerCase().includes(normalizedQuery)
      || product.description.toLowerCase().includes(normalizedQuery)
      || product.category.toLowerCase().includes(normalizedQuery),
  );
}
