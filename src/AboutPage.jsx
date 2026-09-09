import { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'
import { updateSeo } from './seo.js'

function AboutPage({ cartCount, onBagOpen }) {
  useEffect(() => {
    updateSeo({
      title: 'About City Drip | Discover the story behind the drip',
      description:
        'Enter The City Drip World: the story, spirit and Lagos energy behind City Drip Nigerian streetwear.',
      path: '/about',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About City Drip',
        url: 'https://citydrip.com.ng/about',
        description:
          'The story and spirit behind City Drip Nigerian streetwear.',
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
      <header className="page-hero about-page-hero">
        <p className="eyebrow light">The City Drip World</p>
        <h1>
          Not for the
          <br />
          <em>background.</em>
        </h1>
        <p>A Lagos-born clothing brand for people who bring the flavour wherever they go.</p>
      </header>
      <section className="about-story">
        <div>
          <p className="eyebrow">Our world</p>
          <h2>
            Big mood.
            <br />
            <em>Everyday drip.</em>
          </h2>
        </div>
        <div className="about-copy">
          <p>
            City Drip is built around the energy of showing up as yourself. We
            make expressive everyday pieces with bold colour, clean cuts and a
            point of view that does not ask for permission.
          </p>
          <p>
            From Lagos to everywhere, our first drop is made for the ones
            turning ordinary moments into their own main character scene.
          </p>
          <a className="pill-button dark-button" href="/shop">
            Explore the first drop
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section className="about-values">
        <div className="value-card">
          <span>01</span>
          <h3>Move loud</h3>
          <p>Confidence is part of the fit.</p>
        </div>
        <div className="value-card">
          <span>02</span>
          <h3>Stay original</h3>
          <p>Your style should sound like you.</p>
        </div>
        <div className="value-card">
          <span>03</span>
          <h3>Made in Lagos</h3>
          <p>Local energy with a global outlook.</p>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default AboutPage
