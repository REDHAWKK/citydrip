export const products = [
  { id: 1, name: 'Tracksuit', price: 100000, category: 'Tracksuit', tone: 'orange', image: '/tracksuit1.png', code: 'CD-001', badge: 'Hot drop' },
  { id: 2, name: 'T-Shirt', price: 70000, category: 'T-Shirt', tone: 'black', image: '/Tshirt.png', code: 'CD-002', badge: 'Best seller' },
  { id: 3, name: 'SnapBack Cap', price: 30000, category: 'SnapBack Cap', tone: 'blue', image: '/snapback-cap.png', code: 'CD-003', badge: 'New in' },
  { id: 4, name: 'Tank Top', price: 40000, category: 'Tank Top', tone: 'pink', image: '/tank-top.png', code: 'CD-004', badge: 'New in' },
  { id: 5, name: 'Crest Cap', price: 30000, category: 'Crest Cap', tone: 'green', image: '/crest-cap.png', code: 'CD-005', badge: '' },
]

export const categories = ['All pieces', 'Tracksuit', 'T-Shirt', 'SnapBack Cap', 'Tank Top', 'Crest Cap']

export function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG')}`
}
