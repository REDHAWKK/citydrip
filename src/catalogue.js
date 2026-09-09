export const products = [
  {
    id: 1,
    name: 'Tracksuit',
    slug: 'tracksuit',
    price: 100000,
    category: 'Tracksuit',
    tone: 'orange',
    image: '/tracksuit-3d.png',
    gallery: ['/tracksuit-3d-2.png', '/tracksuit-live.png', '/tracksuit3.png', '/tracksuit4.png'],
    code: 'CD-001',
    badge: 'Hot drop',
    description: 'A full City Drip tracksuit built for movement, made in Lagos and finished with our signature crest details.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  { id: 6, name: 'Track Set', price: 80000, category: 'Track Set', tone: 'orange', image: '/tracksuit3.png', code: 'CD-006', badge: 'New in' },
  { id: 2, name: 'T-Shirt', price: 70000, category: 'T-Shirt', tone: 'black', image: '/Tshirt.png', code: 'CD-002', badge: 'Best seller' },
  { id: 3, name: 'SnapBack Cap', price: 30000, category: 'SnapBack Cap', tone: 'blue', image: '/snapback-cap.png', code: 'CD-003', badge: 'New in' },
  { id: 4, name: 'Tank Top', price: 40000, category: 'Tank Top', tone: 'pink', image: '/tank-top.png', code: 'CD-004', badge: 'New in' },
  { id: 5, name: 'Crest Cap', price: 30000, category: 'Crest Cap', tone: 'green', image: '/crest-cap.png', code: 'CD-005', badge: '' },
]

export const categories = ['All pieces', 'Tracksuit', 'Track Set', 'T-Shirt', 'SnapBack Cap', 'Tank Top', 'Crest Cap']

export function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG')}`
}
