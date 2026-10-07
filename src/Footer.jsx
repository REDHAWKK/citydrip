import { ArrowUpRight } from 'lucide-react'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-poster">
        <div className="footer-kicker">
          <span>City Drip Original</span>
          <span>Made in Lagos / Worn everywhere</span>
        </div>
        <div className="footer-heading-row">
          <h2>
            Wear Your
            <br />
            <em>Energy.</em>
          </h2>
        </div>
        <div className="footer-links-row">
          <img src="/nav-logo.png" alt="City Drip" loading="lazy" />
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#top">
              Back to top <ArrowUpRight size={15} />
            </a>
          </nav>
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
        </div>
        <div className="footer-bottom">
          <span>© 2026 City Drip Original</span>
          <span>Lagos, Nigeria</span>
          <a
            className="footer-credit"
            href="https://oriarebun-princeton-portfolio.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Website Produced by Oriarebun Princeton
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
