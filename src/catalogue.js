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
  { id: 6, name: 'Track Set', slug: 'track-set', price: 80000, category: 'Track Set', tone: 'orange', image: '/Trackset/TrackSet1.png', gallery: ['/tracksuit3.png'], code: 'CD-006', badge: 'New in' },
  { id: 2, name: 'T-Shirt', slug: 't-shirt', price: 70000, category: 'T-Shirt', tone: 'black', image: '/Tshirt/Tshirt-3d-1.png', gallery: ['/Tshirt/Tshirt-3d-1.png', '/Tshirt/Tshirt-3d-2.png'], code: 'CD-002', badge: 'Best seller' },
  { id: 3, name: 'SnapBack Cap', slug: 'snapback-cap', price: 30000, category: 'SnapBack Cap', tone: 'blue', image: '/Snapback-cap/snapback-caps.png', gallery: ['/Snapback-cap/snapback-caps.png', '/Snapback-cap/snapback-cap-1.png', '/Snapback-cap/snapback-cap-2.png', '/Snapback-cap/snapback-cap-3.png', '/Snapback-cap/snapback-cap-4.png', ], code: 'CD-003', badge: '8 Variations' },
  { id: 4, name: 'Tank Top', slug: 'tank-top', price: 40000, category: 'Tank Top', tone: 'pink', image: '/Tank-top/tank-top.png', gallery: ['/Tank-top/tank-top.png', '/Tank-top/tank-top-1.png'], code: 'CD-004', badge: 'New in' },
  { id: 5, name: 'Crest Cap', slug: 'crest-cap', price: 30000, category: 'Crest Cap', tone: 'green', image: '/Crest-cap/crest-caps.png', gallery: ['/Crest-cap/crest-caps.png','/Crest-cap/crest-cap-1.png','/Crest-cap/crest-cap-2.png','/Crest-cap/crest-cap-3.png', '/Crest-cap/crest-cap-4.png'], code: 'CD-005', badge: '' },
]

export const categories = ['All pieces', 'Tracksuit', 'Track Set', 'T-Shirt', 'SnapBack Cap', 'Tank Top', 'Crest Cap']

export function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG')}`
}
