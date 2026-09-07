import { ArrowUpRight } from 'lucide-react'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <img src="/nav-logo.png" alt="City Drip" />
        <p>Wear Your Energy</p>
        <a
          className="pill-button dark-button"
          href="https://wa.me/2347075303635"
          target="_blank"
          rel="noreferrer"
        >
          Chat to order
          <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 City Drip Original</span>
        <span>Lagos, Nigeria</span>
        <div className="footer-socials">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="City Drip on Instagram"
            title="Instagram"
          >
            <FaInstagram size={17} />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noreferrer"
            aria-label="City Drip on TikTok"
            title="TikTok"
          >
            <FaTiktok size={17} />
          </a>
          <a
            href="https://wa.me/2347075303635"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with City Drip on WhatsApp"
            title="WhatsApp"
          >
            <FaWhatsapp size={17} />
          </a>
        </div>
        <a
          className="footer-credit"
          href="https://oriarebun-princeton-portfolio.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          Website Produced by Oriarebun Princeton
        </a>
      </div>
    </footer>
  )
}

export default Footer
