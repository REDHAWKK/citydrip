import { useEffect, useRef, useState } from 'react'
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
import ProductPage from './ProductPage.jsx'
import { updateSeo } from './seo.js'
import ShopPage from './ShopPage.jsx'
import dripSound from './assets/audio/drip.mp3'
import kachingSound from './assets/audio/kaching-sound.mp3'

const liveImages = [1, 2, 3, 4, 5].map(
  (imageNumber) => `/Live/photoshoot${imageNumber}.jpg`,
)

function App() {
  const [activeCategory, setActiveCategory] = useState('All pieces')
  const [activeLiveImage, setActiveLiveImage] = useState(0)
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)
  const [loaderMinimumElapsed, setLoaderMinimumElapsed] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const loaderSoundPlayed = useRef(false)
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
  const productSlug = currentPath.startsWith('/product/')
    ? currentPath.split('/')[2]
    : null
  const selectedProduct = products.find((product) => product.slug === productSlug)

  function playLoaderSound() {
    if (loaderSoundPlayed.current) return

    loaderSoundPlayed.current = true
    const audio = new Audio(dripSound)
    audio.volume = 0.6
    audio.play().catch(() => {})
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderMinimumElapsed(true), 4500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!heroImageLoaded || !loaderMinimumElapsed) return

    const timer = window.setTimeout(() => setShowLoader(false), 350)
    return () => window.clearTimeout(timer)
  }, [heroImageLoaded, loaderMinimumElapsed])

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('citydrip-cart', JSON.stringify(cart))
    } else {
      localStorage.removeItem('citydrip-cart')
    }
  }, [cart])

  useEffect(() => {
    const slideshow = window.setInterval(() => {
      setActiveLiveImage((currentImage) => (currentImage + 1) % liveImages.length)
    }, 3000)

    return () => window.clearInterval(slideshow)
  }, [])

  useEffect(() => {
    if (currentPath === '/') {
      updateSeo({
        title: 'City Drip Original | Official Website | Wear Your Energy',
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
    const quantity = product.quantity || 1
    const selectedSize = product.selectedSize || null

    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize,
      )
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...currentCart, { ...product, selectedSize, quantity }]
    })
    setCartOpen(true)
  }

  function updateQuantity(id, selectedSize, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function emptyBag() {
    setCart([])
  }

  function whatsappOrder() {
    const order = cart
      .map((item) => `${item.quantity}x ${item.name} - ${item.selectedSize || 'One size'} (${formatPrice(item.price)})`)
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
          onEmptyBag={emptyBag}
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
          onEmptyBag={emptyBag}
        />
      </>
    )
  }

  if (selectedProduct) {
    return (
      <>
        <ProductPage
          product={selectedProduct}
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
          onEmptyBag={emptyBag}
        />
      </>
    )
  }

  return (
    <main className="site-shell">
      {showLoader && (
        <div
          className={`brand-loader${heroImageLoaded && loaderMinimumElapsed ? ' is-exiting' : ''}`}
          role="status"
          aria-label="Loading City Drip"
        >
          <img src="/nav-logo.png" alt="" onAnimationStart={playLoaderSound} />
        </div>
      )}
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
          <a className="pill-button dark-button" href="/shop">
            Shop the drop
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="hero-product" aria-label="Orange City Drip tracksuit product visual">
          <img
            className="hero-image"
            src="/hero.png"
            alt="Orange City Drip tracksuit"
            fetchPriority="high"
            onLoad={() => setHeroImageLoaded(true)}
            onError={() => setHeroImageLoaded(true)}
          />
        </div>
      </section>

      <section className="marquee" aria-label="City Drip message">
        <div>
          NO SMALL ENERGY <span>✦</span> MADE IN LAGOS <span>✦</span> CITY DRIP
          ORIGINAL <span>✦</span> GET YOUR DRIP &nbsp;
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
        <a className="text-link" href="/shop">
          View all pieces
          <ChevronRight size={18} />
        </a>
      </section>

      <section className="world-section" id="world">
        <div className="world-copy">
          <p className="eyebrow">This is City Drip</p>
          <h2>
            Step Into Your Drip
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
        <div className="world-mark" aria-label="City Drip campaign in Lagos">
          {liveImages.map((image, index) => (
            <img
              className={`world-slide${index === activeLiveImage ? ' is-active' : ''}`}
              key={image}
              src={image}
              alt=""
              loading="lazy"
              aria-hidden="true"
            />
          ))}
        </div>
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
        onEmptyBag={emptyBag}
      />
    </main>
  )
}

export default App
