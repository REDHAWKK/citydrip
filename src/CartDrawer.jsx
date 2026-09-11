import { ArrowUpRight, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { formatPrice } from './catalogue.js'

function CartDrawer({ cart, cartCount, cartTotal, open, onClose, onUpdateQuantity, onWhatsappOrder, onEmptyBag }) {
  if (!open) return null

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-heading">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2>
              Your bag <span>({cartCount})</span>
            </h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close bag"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={40} />
            <p>
              Your bag is waiting for
              <br />
              something with energy.
            </p>
            <a href="/shop" onClick={onClose}>
              Browse pieces
              <ArrowUpRight size={16} />
            </a>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className={`mini-art ${item.tone}`}>
                    <img
                      className="mini-product-image"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="cart-item-copy">
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)}</p>
                    <div className="quantity">
                      <button onClick={() => onUpdateQuantity(item.id, -1)}>
                        <Minus size={13} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)}>
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>Total</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            <button className="whatsapp-button" onClick={onWhatsappOrder}>
              Continue on WhatsApp
              <ArrowUpRight size={18} />
            </button>
            <button className="empty-bag-button" onClick={onEmptyBag}>
              Empty bag
            </button>
            <p className="cart-note">
              You’ll confirm size, delivery and payment with our team.
            </p>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
