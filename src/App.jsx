import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Plus,
} from 'lucide-react'
import './App.css'
import AboutPage from './AboutPage.jsx'
import CartDrawer from './CartDrawer.jsx'
import { formatPrice, products } from './catalogue.js'
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'
import ProductGrid from './ProductGrid.jsx'
import { updateSeo } from './seo.js'
import ShopPage from './ShopPage.jsx'
import kachingSound from './assets/audio/kaching-sound.mp3'

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('citydrip-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('citydrip-cart', JSON.stringify(cart))
    } else {
      localStorage.removeItem('citydrip-cart')
    }
  }, [cart])

  useEffect(() => {
    if (currentPath === '/') {
      updateSeo({
        title: 'City Drip Original | Nigerian Streetwear',
        description:
          'City Drip is a Lagos clothing brand making bold, expressive Nigerian streetwear for everyday energy.',
        path: '/',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'City Drip',
          url: 'https://citydrip.com.ng/',
          logo: 'https://citydrip.com.ng/logo.png',
          description:
            'A Lagos clothing brand creating bold, expressive streetwear.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lagos',
            addressCountry: 'NG',
          },
        },
      })
    }
  }, [currentPath])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  function addToCart(product) {
    const audio = new Audio(kachingSound)
    audio.play().catch(() => {})

    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function updateQuantity(id, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function whatsappOrder() {
    const order = cart
      .map((item) => `${item.quantity}x ${item.name} (${formatPrice(item.price)})`)
      .join('%0A')

    window.open(
      `https://wa.me/2347075303635?text=Hi%20City%20Drip%2C%20I%27d%20like%20to%20order%3A%0A${order}%0A%0ATotal%3A%20${formatPrice(cartTotal)}`,
      '_blank',
    )
  }

  if (currentPath === '/about') {
    return (
      <>
        <AboutPage
          cartCount={cartCount}
          onBagOpen={() => setCartOpen(true)}
        />
        <CartDrawer
          cart={cart}
          cartCount={cartCount}
          cartTotal={cartTotal}
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onWhatsappOrder={whatsappOrder}
        />
      </>
    )
  }

  if (currentPath === '/shop') {
    return (
      <>
        <ShopPage
          cartCount={cartCount}
          onBagOpen={() => setCartOpen(true)}
          onAddToCart={addToCart}
        />
        <CartDrawer
          cart={cart}
          cartCount={cartCount}
          cartTotal={cartTotal}
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onWhatsappOrder={whatsappOrder}
        />
      </>
    )
  }

  return (
    <main className="site-shell">
      <div className="top-strip">
        Free Lagos delivery on orders over ₦100,000
        <span>•</span>
        New drop is live
      </div>
      <NavBar cartCount={cartCount} onBagOpen={() => setCartOpen(true)} />

      <section className="hero" id="top">
        <div className="hero-noise" />
        <div className="hero-copy">
          <p className="eyebrow light">City Drip / Lagos, NG</p>
          <h1>
            Wear Your
            <br />
            <em>Energy.</em>
          </h1>
          <p className="hero-intro">Premium streetwear for people who make the city look better.</p>
          <a className="pill-button dark-button" href="#shop">
            Shop the drop
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="hero-product" aria-label="Orange City Drip tracksuit product visual">
          <img className="hero-image" src="/hero.png" alt="Orange City Drip tracksuit" />
          <div className="hero-sticker">
            New
            <br />
            drop
            <ArrowUpRight size={25} />
          </div>
        </div>
      </section>

      <section className="marquee" aria-label="City Drip message">
        <div>
          NO SMALL ENERGY <span>✦</span> MADE IN LAGOS <span>✦</span> CITY DRIP
          ONLY <span>✦</span> GET YOUR DRIP <span>✦</span>&nbsp;
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The current rotation</p>
            <h2>
              Pick your <em>piece.</em>
            </h2>
          </div>
          <p className="section-note">
            Built for the city.
            <br />
            Styled by you.
          </p>
        </div>
        <ProductGrid
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onAddToCart={addToCart}
        />
        <a className="text-link" href="#shop">
          View all pieces
          <ChevronRight size={18} />
        </a>
      </section>

      <section className="world-section" id="world">
        <div className="world-copy">
          <p className="eyebrow">This is City Drip</p>
          <h2>
            Step Into Your Drip
            <br />
            <em>background.</em>
          </h2>
          <p>
            We make clothes for the ones who bring the flavour. Loud colour,
            clean cuts, unmistakable presence. From Lagos to everywhere.
          </p>
          <a className="pill-button light-button" href="/about">
            Meet the brand
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div
          className="world-mark"
          role="img"
          aria-label="City Drip campaign in Lagos"
        />
      </section>

      <Footer />

      <CartDrawer
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onWhatsappOrder={whatsappOrder}
      />
    </main>
  )
}

export default App
