export const products = [
  {
    id: 1,
    name: 'Tracksuit',
    slug: 'tracksuit',
    price: 100000,
    category: 'Tracksuit',
    tone: 'orange',
    image: '/Tracksuit/tracksuit-3d.png',
    gallery: ['/Tracksuit/tracksuit-3d.png', '/Tracksuit/tracksuit-3d-2.png'],
    code: 'CD-001',
    badge: 'Hot drop',
    description: 'A full City Drip tracksuit built for movement, made in Lagos and finished with our signature crest details.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  { id: 6, name: 'Track Set', slug: 'track-set', price: 80000, category: 'Track Set', tone: 'orange', image: '/tracksuit3.png', gallery: ['/tracksuit3.png'], code: 'CD-006', badge: 'New in' },
  { id: 2, name: 'T-Shirt', slug: 't-shirt', price: 70000, category: 'T-Shirt', tone: 'black', image: '/Tshirt/Tshirt-3d-1.png', gallery: ['/Tshirt/Tshirt-3d-1.png', '/Tshirt/Tshirt-3d-2.png'], code: 'CD-002', badge: 'Best seller' },
  { id: 3, name: 'SnapBack Cap', slug: 'snapback-cap', price: 30000, category: 'SnapBack Cap', tone: 'blue', image: '/snapback-cap.png', gallery: ['/snapback-cap.png'], code: 'CD-003', badge: 'New in' },
  { id: 4, name: 'Tank Top', slug: 'tank-top', price: 40000, category: 'Tank Top', tone: 'pink', image: '/tank-top.png', gallery: ['/tank-top.png'], code: 'CD-004', badge: 'New in' },
  { id: 5, name: 'Crest Cap', slug: 'crest-cap', price: 30000, category: 'Crest Cap', tone: 'green', image: '/crest-cap.png', gallery: ['/crest-cap.png'], code: 'CD-005', badge: '' },
]

export const categories = ['All pieces', 'Tracksuit', 'Track Set', 'T-Shirt', 'SnapBack Cap', 'Tank Top', 'Crest Cap']

export function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG')}`
}
