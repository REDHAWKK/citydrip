import { ArrowUpRight, Plus } from 'lucide-react'
import { categories, formatPrice, products } from './catalogue.js'

function ProductGrid({ activeCategory = 'All pieces', onCategoryChange, onAddToCart }) {
  const visibleProducts = activeCategory === 'All pieces'
    ? products
    : products.filter((product) => product.category === activeCategory)

  return (
    <>
      <div className="category-row">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className={`product-art ${product.tone}`}>
              <img
                className="product-image"
                src={product.image}
                alt={`${product.name} product design`}
              />
              <div className="product-actions">
                <button
                  className="quick-add"
                  type="button"
                  onClick={() => onAddToCart(product)}
                >
                  Add to bag
                  <Plus size={16} />
                </button>
                <a className="see-more" href={`/product/${product.slug || product.id}`}>
                  See more
                  <ArrowUpRight size={16} />
                </a>
              </div>
              {product.badge && <span className="badge">{product.badge}</span>}
            </div>
            <div className="product-meta">
              <div>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
              </div>
              <strong>{formatPrice(product.price)}</strong>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export default ProductGrid
