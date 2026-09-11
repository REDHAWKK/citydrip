import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
} from 'lucide-react'
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'
import { formatPrice } from './catalogue.js'
import { updateSeo } from './seo.js'

function ProductPage({ product, cartCount, onBagOpen, onAddToCart }) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0])
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    updateSeo({
      title: `${product.name} | City Drip Original`,
      description: `${product.name} by City Drip. ${product.description}`,
      path: `/product/${product.slug}`,
      image: `https://citydrip.com.ng${product.image}`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.gallery.map((image) => `https://citydrip.com.ng${image}`),
        description: product.description,
        sku: product.code,
        brand: { '@type': 'Brand', name: 'City Drip' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'NGN',
          price: product.price,
          availability: 'https://schema.org/InStock',
          url: `https://citydrip.com.ng/product/${product.slug}`,
        },
      },
    })
  }, [product])

  function showPreviousImage() {
    setActiveImage((current) => (current - 1 + product.gallery.length) % product.gallery.length)
  }

  function showNextImage() {
    setActiveImage((current) => (current + 1) % product.gallery.length)
  }

  function addProductToCart() {
    onAddToCart({ ...product, selectedSize, quantity })
  }

  return (
    <main className="site-shell product-page">
      <div className="top-strip">
        Free Lagos delivery on orders over ₦100,000
        <span>•</span>
        New drop is live
      </div>
      <NavBar cartCount={cartCount} onBagOpen={onBagOpen} />

      <div className="product-detail-shell">
        <a className="back-link" href="/shop">
          <ArrowLeft size={16} />
          Back to shop
        </a>

        <div className="product-detail-layout">
          <section className="product-gallery" aria-label={`${product.name} image gallery`}>
            <div className="product-gallery-main">
              <img src={product.gallery[activeImage]} alt={`${product.name}, view ${activeImage + 1}`} />
              <span className="gallery-count">
                {String(activeImage + 1).padStart(2, '0')} / {String(product.gallery.length).padStart(2, '0')}
              </span>
              <div className="gallery-controls">
                <button type="button" aria-label="Previous product image" onClick={showPreviousImage}>
                  <ArrowLeft size={17} />
                </button>
                <button type="button" aria-label="Next product image" onClick={showNextImage}>
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
            <div className="product-gallery-thumbs">
              {product.gallery.map((image, index) => (
                <button
                  className={activeImage === index ? 'is-active' : ''}
                  key={image}
                  type="button"
                  aria-label={`Show product image ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </section>

          <section className="product-detail-copy">
            <p className="eyebrow">City Drip / {product.code}</p>
            <h1>{product.name}</h1>
            <div className="product-detail-price">{formatPrice(product.price)}</div>
            <p className="product-detail-description">{product.description}</p>

            <div className="detail-rule" />
            <div className="detail-option">
              <div className="detail-option-heading">
                <span>Size</span>
                <span className="detail-muted">Select your fit</span>
              </div>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    className={selectedSize === size ? 'is-selected' : ''}
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                    {selectedSize === size && <Check size={13} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="detail-option">
              <div className="detail-option-heading">
                <span>Quantity</span>
                <span className="detail-muted">Ready to ship</span>
              </div>
              <div className="quantity product-quantity">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
                  <Minus size={14} />
                </button>
                <span>{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button className="product-add-button" type="button" onClick={addProductToCart}>
              Add to bag
              <ArrowUpRight size={18} />
            </button>
            <p className="product-note">Free Lagos delivery on orders over ₦100,000.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ProductPage