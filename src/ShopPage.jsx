import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'
import ProductGrid from './ProductGrid.jsx'
import { updateSeo } from './seo.js'

function ShopPage({ cartCount, onBagOpen, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All pieces')

  useEffect(() => {
    updateSeo({
      title: 'Shop City Drip | Nigerian Streetwear',
      description:
        'Shop City Drip streetwear from Lagos, Nigeria. Discover tracksuits, T-shirts, caps and tank tops from the first drop.',
      path: '/shop',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Shop City Drip',
        url: 'https://citydrip.com.ng/shop',
        description:
          'Shop the first City Drip streetwear drop from Lagos, Nigeria.',
        isPartOf: {
          '@type': 'WebSite',
          name: 'City Drip',
          url: 'https://citydrip.com.ng/',
        },
      },
    })
  }, [])

  return (
    <main className="site-shell page-shell">
      <div className="top-strip">
        Free Lagos delivery on orders over ₦100,000
        <span>•</span>
        New drop is live
      </div>
      <NavBar cartCount={cartCount} onBagOpen={onBagOpen} />
      <header className="page-hero shop-page-hero">
        <p className="eyebrow light">City Drip / The first drop</p>
        <h1>
          Shop the
          <br />
          <em>energy.</em>
        </h1>
        <p>Five pieces. One unmistakable City Drip mood.</p>
      </header>
      <section className="shop-section catalog-page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The current rotation</p>
            <h2>
              Find your <em>piece.</em>
            </h2>
          </div>
          <p className="section-note">
            Made in Lagos.
            <br />
            Ready for everywhere.
          </p>
        </div>
        <ProductGrid
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onAddToCart={onAddToCart}
        />
        <a className="text-link" href="/#world">
          Learn about the brand
          <ArrowUpRight size={18} />
        </a>
      </section>
      <Footer />
    </main>
  )
}

export default ShopPage
