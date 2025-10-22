const createCardSection = (activeIndex) => {
  const activeProduct = products[activeIndex];

  const cardSection = document.createElement("div");
  cardSection.className = "card-section";

  // Background container
  const bgContainer = document.createElement("div");
  bgContainer.className = "card-background";

  // Background image
  const bgImage = document.createElement("img");
  bgImage.src = activeProduct.image;
  bgImage.alt = activeProduct.name;
  bgImage.className = "card-bg-image";
  bgContainer.appendChild(bgImage);

  // Gradient overlays
  const gradientOverlay1 = document.createElement("div");
  gradientOverlay1.className = "card-gradient-overlay-1";
  bgContainer.appendChild(gradientOverlay1);

  const gradientOverlay2 = document.createElement("div");
  gradientOverlay2.className = "card-gradient-overlay-2";
  bgContainer.appendChild(gradientOverlay2);

  const gradientOverlay3 = document.createElement("div");
  gradientOverlay3.className = `card-gradient-overlay-3 ${activeProduct.color}`;
  bgContainer.appendChild(gradientOverlay3);

  cardSection.appendChild(bgContainer);

  // Content container
  const contentContainer = document.createElement("div");
  contentContainer.className = "card-content";

  const contentInner = document.createElement("div");
  contentInner.className = "card-content-inner";

  // Badge
  const badge = document.createElement("div");
  badge.className = "card-badge";

  const badgeLogo = document.createElement("div");
  badgeLogo.className = "card-badge-logo";
  badgeLogo.textContent = "A";
  badge.appendChild(badgeLogo);

  const badgeText = document.createElement("span");
  badgeText.className = "card-badge-text";
  badgeText.textContent = activeProduct.category;
  badge.appendChild(badgeText);

  contentInner.appendChild(badge);

  // Title
  const title = document.createElement("h1");
  title.className = "card-title";
  title.textContent = activeProduct.name;
  contentInner.appendChild(title);

  // Description
  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = activeProduct.description;
  contentInner.appendChild(description);

  // Buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "card-buttons";

  const learnMoreBtn = document.createElement("button");
  learnMoreBtn.className = "card-btn card-btn-primary";
  learnMoreBtn.innerHTML = `
        <svg class="card-btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        Learn More
        `;
  buttonContainer.appendChild(learnMoreBtn);

  const addToListBtn = document.createElement("button");
  addToListBtn.className = "card-btn card-btn-secondary";
  addToListBtn.innerHTML = `
        <svg class="card-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add to List
        `;
  buttonContainer.appendChild(addToListBtn);

  contentInner.appendChild(buttonContainer);
  contentContainer.appendChild(contentInner);
  cardSection.appendChild(contentContainer);

  // Navigation arrows
  const prevBtn = document.createElement("button");
  prevBtn.className = "card-nav-btn card-nav-prev";
  prevBtn.setAttribute("aria-label", "Previous product");
  prevBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        `;
  prevBtn.onclick = () => prevCard();
  cardSection.appendChild(prevBtn);

  const nextBtn = document.createElement("button");
  nextBtn.className = "card-nav-btn card-nav-next";
  nextBtn.setAttribute("aria-label", "Next product");
  nextBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        `;
  nextBtn.onclick = () => nextCard();
  cardSection.appendChild(nextBtn);

  return cardSection;
};

const attachEventListeners = () => {
  // Event listeners are attached inline during creation
};

const nextCard = (products) => {
  activeIndex = (activeIndex + 1) % products.length;
  render();
};

const prevCard = (products, activeIndex) => {
  activeIndex = (activeIndex - 1 + products.length) % products.length;
  render();
};

const setActiveIndex = (index) => {
  activeIndex = index;
  render();
};

const createThumbnailSection = (products) => {
  const section = document.createElement("div");
  section.className = "thumbnail-section";

  const title = document.createElement("h2");
  title.className = "thumbnail-title";
  title.textContent = "Adobe Experience Cloud Products";
  section.appendChild(title);

  const container = document.createElement("div");
  container.className = "thumbnail-container";

  products.forEach((product, index) => {
    const thumbnail = createThumbnail(product, index);
    container.appendChild(thumbnail);
  });

  section.appendChild(container);
  return section;
};

const createThumbnail = (product, index, activeIndex) => {
  const [image, id, name, category, description, features, color] =
    product.children;
  const button = document.createElement("button");
  button.className = `thumbnail ${
    index === activeIndex ? "thumbnail-active" : ""
  }`;
  button.onclick = () => setActiveIndex(index);

  const imageContainer = document.createElement("div");
  imageContainer.className = "thumbnail-image-container";

  const img = document.createElement("img");
  img.src = image;
  img.alt = name;
  img.className = "thumbnail-image";
  imgContainer.appendChild(img);

  const gradientOverlay = document.createElement("div");
  gradientOverlay.className = "thumbnail-gradient";
  imgContainer.appendChild(gradientOverlay);

  const textContainer = document.createElement("div");
  textContainer.className = "thumbnail-text";

  const cname = document.createElement("p");
  cname.className = "thumbnail-name";
  cname.textContent = name;
  textContainer.appendChild(cname);

  const ccategory = document.createElement("p");
  ccategory.className = "thumbnail-category";
  ccategory.textContent = category;
  textContainer.appendChild(ccategory);

  imgContainer.appendChild(textContainer);

  if (index === activeIndex) {
    const activeRing = document.createElement("div");
    activeRing.className = "thumbnail-active-ring";
    imgContainer.appendChild(activeRing);
  }

  button.appendChild(imgContainer);
  return button;
};

export default function decorate(block) {
  // Main wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "card-list-slider";

  // card section
  const cardSection = createCardSection();
  wrapper.appendChild(cardSection);

  // Thumbnail section
  const thumbnailSection = createThumbnailSection([...block.children]);
  wrapper.appendChild(thumbnailSection);

  block.appendChild(wrapper);
  // // Product data
  // const products = [
  //   {
  //     id: "aem",
  //     name: "Experience Manager",
  //     category: "Content Management",
  //     description:
  //       "Build and deliver personalized digital experiences across web, mobile, and IoT. Create stunning content with AI-powered tools and manage assets at scale with intelligent automation.",
  //     features: [
  //       "Headless CMS",
  //       "Digital Asset Management",
  //       "Multi-site Management",
  //       "AI-Powered Personalization",
  //     ],
  //     color: "from-red-600/80 via-red-500/60 to-transparent",
  //     image: "/images/experience-manager.jpg",
  //   },
  //   {
  //     id: "analytics",
  //     name: "Analytics",
  //     category: "Data & Insights",
  //     description:
  //       "Gain real-time insights into customer behavior and optimize your digital strategy. Leverage AI and machine learning to predict trends and make data-driven decisions.",
  //     features: [
  //       "Real-time Analytics",
  //       "Predictive Intelligence",
  //       "Customer Journey Analysis",
  //       "Attribution Modeling",
  //     ],
  //     color: "from-emerald-600/80 via-emerald-500/60 to-transparent",
  //     image: "/images/analytics.jpg",
  //   },
  //   {
  //     id: "target",
  //     name: "Target",
  //     category: "Personalization",
  //     description:
  //       "Deliver personalized experiences at scale with AI-driven testing and optimization. Test, learn, and optimize across all channels to maximize engagement and conversion.",
  //     features: [
  //       "A/B Testing",
  //       "AI Personalization",
  //       "Automated Segments",
  //       "Experience Targeting",
  //     ],
  //     color: "from-blue-600/80 via-blue-500/60 to-transparent",
  //     image: "/images/target.jpg",
  //   },
  //   {
  //     id: "campaign",
  //     name: "Campaign",
  //     category: "Marketing Automation",
  //     description:
  //       "Orchestrate personalized campaigns across email, mobile, and offline channels. Automate customer journeys and deliver the right message at the right time.",
  //     features: [
  //       "Cross-channel Campaigns",
  //       "Journey Orchestration",
  //       "Dynamic Content",
  //       "Real-time Triggers",
  //     ],
  //     color: "from-amber-600/80 via-amber-500/60 to-transparent",
  //     image: "/images/campaign.jpg",
  //   },
  //   {
  //     id: "commerce",
  //     name: "Commerce",
  //     category: "E-commerce",
  //     description:
  //       "Create flexible, scalable commerce experiences that drive conversion. Build modern storefronts with headless architecture and AI-powered recommendations.",
  //     features: [
  //       "Headless Commerce",
  //       "B2B & B2C Support",
  //       "Product Recommendations",
  //       "Order Management",
  //     ],
  //     color: "from-purple-600/80 via-purple-500/60 to-transparent",
  //     image: "/images/commerce.jpg",
  //   },
  // ];
}
