import { useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react'
import './App.css'

const products = [
  { id: 1, name: 'Orange Signal Hoodie', price: 68000, category: 'Hoodies', tone: 'orange', code: 'CD-001', badge: 'Hot drop' },
  { id: 2, name: 'City Uniform Set', price: 92000, category: 'Sets', tone: 'cream', code: 'CD-002', badge: 'New in' },
  { id: 3, name: 'Everyday Drip Tee', price: 36000, category: 'Tees', tone: 'black', code: 'CD-003', badge: 'Best seller' },
  { id: 4, name: 'Off-Duty Cap', price: 28000, category: 'Accessories', tone: 'blue', code: 'CD-004', badge: '' },
  { id: 5, name: 'Lagos After Dark Tee', price: 42000, category: 'Tees', tone: 'pink', code: 'CD-005', badge: 'New in' },
  { id: 6, name: 'Drip Club Sweatpant', price: 58000, category: 'Bottoms', tone: 'green', code: 'CD-006', badge: '' },
]

const categories = ['All pieces', 'Tees', 'Hoodies', 'Sets', 'Accessories']

function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG')}`
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const visibleProducts = activeCategory === 'All pieces'
    ? products
    : products.filter((product) => product.category === activeCategory)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)
      if (existing) {
        return currentCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function updateQuantity(id, change) {
    setCart((currentCart) => currentCart
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0))
  }

  function whatsappOrder() {
    const order = cart.map((item) => `${item.quantity}x ${item.name} (${formatPrice(item.price)})`).join('%0A')
    window.open(`https://wa.me/2348000000000?text=Hi%20City%20Drip%2C%20I%27d%20like%20to%20order%3A%0A${order}%0A%0ATotal%3A%20${formatPrice(cartTotal)}`, '_blank')
  }

  return (
    <main className="site-shell">
      <div className="top-strip">Free Lagos delivery on orders over ₦100,000 <span>•</span> New drop is live</div>
      <nav className="nav-bar">
        <button className="icon-button menu-trigger" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={23} /></button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#world" onClick={() => setMenuOpen(false)}>The world</a>
          <a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <a className="nav-logo" href="#top" aria-label="City Drip home"><img src="/nav-logo.png" alt="City Drip" /></a>
        <div className="nav-actions">
          <a className="nav-order" href="#shop">Order online <ArrowUpRight size={16} /></a>
          <button className="bag-button" aria-label="Open bag" onClick={() => setCartOpen(true)}><ShoppingBag size={21} /><span>{cartCount}</span></button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-noise" />
        <div className="hero-copy">
          <p className="eyebrow light">City Drip / Lagos, NG</p>
          <h1>Wear your<br /><em>energy.</em></h1>
          <p className="hero-intro">Premium streetwear for people who make the city look better.</p>
          <a className="pill-button dark-button" href="#shop">Shop the drop <ArrowUpRight size={18} /></a>
        </div>
        <div className="hero-product" aria-label="Orange Signal Hoodie product visual">
          <div className="scribble">CITY<br />DRIP<br /><span>004</span></div>
          <div className="hoodie-shape"><div className="hoodie-pocket" /><div className="hoodie-print">CD<br /><small>made to move</small></div></div>
          <div className="hero-sticker">New<br />drop <ArrowUpRight size={25} /></div>
        </div>
        <div className="hero-foot"><span>01 / 04</span><span>Scroll to explore <ChevronDown size={16} /></span></div>
      </section>

      <section className="marquee" aria-label="City Drip message"><div>NO SMALL ENERGY <span>✦</span> MADE IN LAGOS <span>✦</span> CITY DRIP ONLY <span>✦</span>&nbsp;</div></section>

      <section className="shop-section" id="shop">
        <div className="section-heading"><div><p className="eyebrow">The current rotation</p><h2>Pick your <em>piece.</em></h2></div><p className="section-note">Built for the city. <br />Styled by you.</p></div>
        <div className="category-row">{categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
        <div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}>
          <button className={`product-art ${product.tone}`} onClick={() => addToCart(product)} aria-label={`Add ${product.name} to bag`}><span className="product-code">{product.code}</span><div className="product-shape">{product.category === 'Accessories' ? <div className="cap-shape" /> : <><div className="garment-neck" /><div className="garment-print">CITY<br />DRIP</div></>}</div><span className="quick-add">Add to bag <Plus size={16} /></span>{product.badge && <span className="badge">{product.badge}</span>}</button>
          <div className="product-meta"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>{formatPrice(product.price)}</strong></div>
        </article>)}</div>
        <a className="text-link" href="#shop">View all pieces <ChevronRight size={18} /></a>
      </section>

      <section className="world-section" id="world"><div className="world-copy"><p className="eyebrow">This is City Drip</p><h2>Not for the<br /><em>background.</em></h2><p>We make clothes for the ones who bring the flavour. Loud colour, clean cuts, unmistakable presence. From Lagos to everywhere.</p><a className="pill-button light-button" href="#footer">Meet the brand <ArrowUpRight size={18} /></a></div><div className="world-mark"><img src="/brandLogoDark.png" alt="City Drip three star mark" /><span>Wear the moment.</span></div></section>

      <footer id="footer"><div className="footer-top"><img src="/nav-logo.png" alt="City Drip" /><p>Big mood. <br />Everyday drip.</p><a className="pill-button dark-button" href="https://wa.me/2348000000000" target="_blank" rel="noreferrer">Chat to order <ArrowUpRight size={18} /></a></div><div className="footer-bottom"><span>© 2026 City Drip</span><span>Lagos, Nigeria</span><span>IG &nbsp; TT &nbsp; WA</span></div></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow">Your selection</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={40} /><p>Your bag is waiting for<br />something with energy.</p><a href="#shop" onClick={() => setCartOpen(false)}>Browse pieces <ArrowUpRight size={16} /></a></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><div className={`mini-art ${item.tone}`}><div className="mini-garment" /></div><div className="cart-item-copy"><h3>{item.name}</h3><p>{formatPrice(item.price)}</p><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-total"><span>Total</span><strong>{formatPrice(cartTotal)}</strong></div><button className="whatsapp-button" onClick={whatsappOrder}>Continue on WhatsApp <ArrowUpRight size={18} /></button><p className="cart-note">You’ll confirm size, delivery and payment with our team.</p></>}</aside></div>}
    </main>
  )
}

export default App
