import { useEffect } from 'react';

const SEO = ({ 
  title = 'FarmLand - Fresh Organic Produce',
  description = 'Shop fresh organic fruits, vegetables, and produce. High-quality, pesticide-free products delivered to your door.',
  keywords = 'organic, produce, fruits, vegetables, fresh, healthy, farm, organic food',
  image = '../../src/assets/HomeAssets/multiple-veg.png',
  url = window.location.href
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'FarmLand', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'FarmLand Team');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  }, [title, description, keywords, image, url]);

  return null;
};

export default SEO;