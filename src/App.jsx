import { useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from 'lucide-react'
import './App.css'
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'

const products = [
  { id: 1, name: 'Tracksuit', price: 92000, category: 'Tracksuit', tone: 'orange', image: '/tracksuit1.png', code: 'CD-001', badge: 'Hot drop' },
  { id: 2, name: 'T-Shirt', price: 36000, category: 'T-Shirt', tone: 'black', image: '/Tshirt.png', code: 'CD-002', badge: 'Best seller' },
  { id: 3, name: 'SnapBack Cap', price: 28000, category: 'SnapBack Cap', tone: 'blue', image: '/snapback-cap.png', code: 'CD-003', badge: 'New in' },
  { id: 4, name: 'Tank Top', price: 32000, category: 'Tank Top', tone: 'pink', image: '/tank-top.png', code: 'CD-004', badge: 'New in' },
  { id: 5, name: 'Crest Cap', price: 28000, category: 'Crest Cap', tone: 'green', image: '/crest-cap.png', code: 'CD-005', badge: '' },
]

const categories = ['All pieces', 'Tracksuit', 'T-Shirt', 'SnapBack Cap', 'Tank Top', 'Crest Cap']

function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG')}`
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

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
    window.open(`https://wa.me/234707530365?text=Hi%20City%20Drip%2C%20I%27d%20like%20to%20order%3A%0A${order}%0A%0ATotal%3A%20${formatPrice(cartTotal)}`, '_blank')
  }

  return (
    <main className="site-shell">
      <div className="top-strip">Free Lagos delivery on orders over ₦100,000 <span>•</span> New drop is live</div>
      <NavBar cartCount={cartCount} onBagOpen={() => setCartOpen(true)} />

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

      <section className="marquee" aria-label="City Drip message"><div>NO SMALL ENERGY <span>✦</span> MADE IN LAGOS <span>✦</span> CITY DRIP ONLY <span>✦</span> GET YOUR DRIP <span>✦</span>&nbsp;</div></section>

      <section className="shop-section" id="shop">
        <div className="section-heading"><div><p className="eyebrow">The current rotation</p><h2>Pick your <em>piece.</em></h2></div><p className="section-note">Built for the city. <br />Styled by you.</p></div>
        <div className="category-row">{categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
        <div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}>
          <div className={`product-art ${product.tone}`}><img className="product-image" src={product.image} alt={`${product.name} product design`} /><div className="product-actions"><button className="quick-add" type="button" onClick={() => addToCart(product)}>Add to bag <Plus size={16} /></button><button className="see-more" type="button">See more <ArrowUpRight size={16} /></button></div>{product.badge && <span className="badge">{product.badge}</span>}</div>
          <div className="product-meta"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>{formatPrice(product.price)}</strong></div>
        </article>)}</div>
        <a className="text-link" href="#shop">View all pieces <ChevronRight size={18} /></a>
      </section>

      <section className="world-section" id="world"><div className="world-copy"><p className="eyebrow">This is City Drip</p><h2>Not for the<br /><em>background.</em></h2><p>We make clothes for the ones who bring the flavour. Loud colour, clean cuts, unmistakable presence. From Lagos to everywhere.</p><a className="pill-button light-button" href="#footer">Meet the brand <ArrowUpRight size={18} /></a></div><div className="world-mark"><img src="/brandLogoDark.png" alt="City Drip three star mark" /><span>Wear the moment.</span></div></section>

      <Footer />

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow">Your selection</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={40} /><p>Your bag is waiting for<br />something with energy.</p><a href="#shop" onClick={() => setCartOpen(false)}>Browse pieces <ArrowUpRight size={16} /></a></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><div className={`mini-art ${item.tone}`}><img className="mini-product-image" src={item.image} alt="" /></div><div className="cart-item-copy"><h3>{item.name}</h3><p>{formatPrice(item.price)}</p><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-total"><span>Total</span><strong>{formatPrice(cartTotal)}</strong></div><button className="whatsapp-button" onClick={whatsappOrder}>Continue on WhatsApp <ArrowUpRight size={18} /></button><p className="cart-note">You’ll confirm size, delivery and payment with our team.</p></>}</aside></div>}
    </main>
  )
}

export default App
