import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Minus,
  Plus,
} from 'lucide-react'
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'
import { formatPrice } from './catalogue.js'
import { updateSeo } from './seo.js'

function ProductPage({ product, cartCount, onBagOpen, onAddToCart }) {
  const gallery = product.gallery?.length ? product.gallery : [product.image]
  const sizes = product.sizes?.length ? product.sizes : ['One size']
  const description = product.description || `${product.name} by City Drip, made for everyday movement and Lagos energy.`
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(sizes[1] || sizes[0])
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    updateSeo({
      title: `${product.name} | City Drip Original`,
      description: `${product.name} by City Drip. ${description}`,
      path: `/product/${product.slug}`,
      image: `https://citydrip.com.ng${product.image}`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: gallery.map((image) => `https://citydrip.com.ng${image}`),
        description,
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
  }, [description, gallery, product])

  function addProductToCart() {
    onAddToCart({ ...product, selectedSize, quantity })
  }

  function changeImage(direction) {
    setActiveImage((current) => (current + direction + gallery.length) % gallery.length)
  }

  return (
    <main className="site-shell product-page product-page-redesign">
      <div className="top-strip">
        Free Lagos delivery on orders over ₦100,000
        <span>•</span>
        New drop is live
      </div>
      <NavBar cartCount={cartCount} onBagOpen={onBagOpen} />

      <div className="product-breadcrumbs">
        <a href="/shop"><ArrowLeft size={15} /> Shop</a>
        <span>/</span>
        <span>{product.category}</span>
      </div>

      <section className="product-stage">
        <div className={`product-showcase product-showcase-${product.tone}`}>
          <div className="product-showcase-topline">
            <span>{product.code}</span>
            <span>{product.badge || 'City Drip Original'}</span>
          </div>
          <div className="product-showcase-image-wrap">
            <img className="product-showcase-image" src={gallery[activeImage]} alt={`${product.name}, view ${activeImage + 1}`} />
          </div>
          <div className="product-showcase-footer">
            <span>Made in Lagos</span>
            <span>{String(activeImage + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
          </div>
          {gallery.length > 1 && (
            <div className="product-showcase-controls">
              <button type="button" aria-label="Previous product image" onClick={() => changeImage(-1)}><ArrowLeft size={17} /></button>
              <button type="button" aria-label="Next product image" onClick={() => changeImage(1)}><ArrowRight size={17} /></button>
            </div>
          )}
        </div>

        <div className="product-info-rail">
          <div className="product-info-heading">
            <p className="eyebrow">The current rotation</p>
            <h1>{product.name}</h1>
            <p className="product-info-price">{formatPrice(product.price)}</p>
          </div>
          <p className="product-info-description">{description}</p>

          <div className="product-selector">
            <div className="product-selector-label"><span>Choose your fit</span><span>{selectedSize}</span></div>
            <div className="product-size-list">
              {sizes.map((size) => (
                <button className={selectedSize === size ? 'is-selected' : ''} key={size} type="button" onClick={() => setSelectedSize(size)}>
                  {size}
                  {selectedSize === size && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          <div className="product-buy-row">
            <div className="product-stepper" aria-label="Quantity">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Minus size={14} /></button>
              <span>{quantity}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}><Plus size={14} /></button>
            </div>
            <button className="product-buy-button" type="button" onClick={addProductToCart}>Add to bag <ArrowUpRight size={18} /></button>
          </div>

          <div className="product-service-grid">
            <div><strong>01</strong><span>Free Lagos delivery over ₦100k</span></div>
            <div><strong>02</strong><span>Secure your piece while it lasts</span></div>
          </div>

          <details className="product-detail-note" open>
            <summary>Product notes <Plus size={16} /></summary>
            <p>Cut for movement, styled for presence. Each City Drip piece is made to carry your energy from the street to wherever the day takes you.</p>
          </details>
          <details className="product-detail-note">
            <summary>Shipping & care <Plus size={16} /></summary>
            <p>Orders ship from Lagos. Keep your piece looking fresh by following the care instructions on the garment label.</p>
          </details>
        </div>
      </section>

      {gallery.length > 1 && (
        <div className="product-thumbnail-strip" aria-label="Product image selection">
          {gallery.map((image, index) => (
            <button className={activeImage === index ? 'is-active' : ''} key={image} type="button" aria-label={`Show product image ${index + 1}`} onClick={() => setActiveImage(index)}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
      <Footer />
    </main>
  )
}

export default ProductPage
