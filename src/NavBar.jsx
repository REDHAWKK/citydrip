import { useState } from 'react'
import { ArrowUpRight, Menu, ShoppingBag } from 'lucide-react'

function NavBar({ cartCount, onBagOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="nav-bar">
      <button
        className="icon-button menu-trigger"
        aria-label="Open menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu size={23} />
      </button>
      <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        <a href="/shop" onClick={closeMenu}>
          Shop
        </a>
        <a href="/about" onClick={closeMenu}>
          The world
        </a>
        <a href="#footer" onClick={closeMenu}>
          Contact
        </a>
      </div>
      <a className="nav-logo" href="/" aria-label="City Drip home"><img src="/nav-logo.png" alt="City Drip" /></a>
      <div className="nav-actions">
        <a className="nav-order" href="/shop">
          Order online
          <ArrowUpRight size={16} />
        </a>
        <button
          className="bag-button"
          aria-label="Open bag"
          onClick={onBagOpen}
        >
          <ShoppingBag size={21} />
          <span>{cartCount}</span>
        </button>
      </div>
    </nav>
  )
}

export default NavBar
