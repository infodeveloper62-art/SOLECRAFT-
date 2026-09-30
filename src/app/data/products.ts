import { Product } from '../models';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'aero-runner',
    name: 'Aero Runner',
    price: 129.99,
    originalPrice: 149.99,
    category: 'Men',
    categoryBadge: "Men's Sneakers",
    shortDescription: 'Aerodynamic silhouette with lightweight breathable knit and responsive energy return.',
    description: 'The Aero Runner is engineered for all-day velocity and city commutes. Featuring our proprietary CloudForm™ dual-layer sole and an ultra-breathable engineered knit upper, it delivers an effortless glide with zero hot spots.',
    rating: 4.9,
    reviewCount: 142,
    image: '/images/product_aero_runner_1790699507913.jpg',
    gallery: [
      '/images/product_aero_runner_1790699507913.jpg',
      '/images/category_running_sneaker_1790699422343.jpg',
      '/images/hero_sneaker_lifestyle_1790699402771.jpg'
    ],
    colors: [
      { name: 'Mocha Charcoal', hex: '#4B3928' },
      { name: 'Sand Cream', hex: '#E9DFD2' },
      { name: 'Obsidian Black', hex: '#1C1917' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isNew: true,
    isBestSeller: true,
    materials: 'Engineered breathable knit upper, Italian suede heel counter',
    cushioning: 'CloudForm™ dual-density EVA midsole with carbon stabilization shank'
  },
  {
    id: 'urban-flex',
    name: 'Urban Flex',
    price: 149.99,
    category: 'Men',
    categoryBadge: "Men's Sneakers",
    shortDescription: 'Modern minimalist street sneaker hand-assembled with full-grain leather and natural gum sole.',
    description: 'Designed for the modern metropolitan wardrobe, Urban Flex pairs butter-soft calfskin leather with a cushioned memory insole. A subtle architectural silhouette matches tailored trousers and relaxed denim alike.',
    rating: 4.8,
    reviewCount: 98,
    image: '/images/category_lifestyle_sneaker_1790699438751.jpg',
    gallery: [
      '/images/category_lifestyle_sneaker_1790699438751.jpg',
      '/images/product_classic_court_1790699554540.jpg',
      '/images/craftsmanship_about_sneaker_1790699468947.jpg'
    ],
    colors: [
      { name: 'Warm Almond', hex: '#D6C5B3' },
      { name: 'Cognac Brown', hex: '#806345' },
      { name: 'Pure Chalk', hex: '#F7F3ED' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isBestSeller: true,
    materials: 'Supple full-grain leather, vegetable-tanned lining',
    cushioning: 'Anatomical OrthoLite® footbed with arch support'
  },
  {
    id: 'cloud-step',
    name: 'Cloud Step',
    price: 119.99,
    originalPrice: 139.99,
    category: 'Women',
    categoryBadge: "Women's Sneakers",
    shortDescription: 'Plush daily trainer sculpted in gentle cream tones with featherlight cushioning.',
    description: 'Experience gravity-defying lightness with Cloud Step. Designed specifically with a women’s biomechanical profile, the plush padded collar and pillow-soft footbed make walking 15,000 steps feel like walking on clouds.',
    rating: 4.9,
    reviewCount: 215,
    image: '/images/product_cloud_step_1790699523417.jpg',
    gallery: [
      '/images/product_cloud_step_1790699523417.jpg',
      '/images/category_lifestyle_sneaker_1790699438751.jpg',
      '/images/craftsmanship_about_sneaker_1790699468947.jpg'
    ],
    colors: [
      { name: 'Blush Cream', hex: '#F0E5D8' },
      { name: 'Oatmeal', hex: '#E3D7C5' },
      { name: 'Soft Sage', hex: '#C7CEB8' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isNew: true,
    materials: 'Silky micro-suede panels, recycled organic mesh',
    cushioning: 'Hyper-responsive nitrogen-infused foam midsole'
  },
  {
    id: 'street-nova',
    name: 'Street Nova',
    price: 139.99,
    category: 'Women',
    categoryBadge: "Women's Sneakers",
    shortDescription: 'Statement platform profile with clean sculptural curves and effortless elegance.',
    description: 'Street Nova commands attention with clean geometric sole lines and refined contrasting panels. The subtly elevated platform provides height while maintaining balanced stability and all-day ease.',
    rating: 4.7,
    reviewCount: 84,
    image: '/images/category_new_arrivals_1790699454744.jpg',
    gallery: [
      '/images/category_new_arrivals_1790699454744.jpg',
      '/images/product_cloud_step_1790699523417.jpg',
      '/images/hero_sneaker_lifestyle_1790699402771.jpg'
    ],
    colors: [
      { name: 'Desert Dune', hex: '#CBB499' },
      { name: 'Vanilla Off-White', hex: '#FDFBF7' },
      { name: 'Deep Espresso', hex: '#3B2F23' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isNew: true,
    materials: 'Tumbled nappa leather and water-resistant nylon canvas',
    cushioning: 'Sculpted lightweight TPU cradle with shock-absorbing core'
  },
  {
    id: 'velocity-pro',
    name: 'Velocity Pro',
    price: 169.99,
    originalPrice: 189.99,
    category: 'Running',
    categoryBadge: 'Running Shoes',
    shortDescription: 'Marathon-grade racing shoe with embedded composite propulsion plate.',
    description: 'For runners chasing personal records. The Velocity Pro integrates an articulated carbon-composite spring plate between two slabs of ultralight superfoam, maximizing mechanical energy return on every stride.',
    rating: 5.0,
    reviewCount: 167,
    image: '/images/product_velocity_pro_1790699539307.jpg',
    gallery: [
      '/images/product_velocity_pro_1790699539307.jpg',
      '/images/category_running_sneaker_1790699422343.jpg',
      '/images/product_aero_runner_1790699507913.jpg'
    ],
    colors: [
      { name: 'Solar Taupe', hex: '#D8C5A8' },
      { name: 'Bronze Flash', hex: '#8C6239' },
      { name: 'Pure Frost', hex: '#FFFFFF' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isBestSeller: true,
    materials: 'Micro-filament ripstop mesh, zero-stitch welded reinforcements',
    cushioning: 'Pebax® superfoam midsole with curved carbon plate'
  },
  {
    id: 'classic-court',
    name: 'Classic Court',
    price: 109.99,
    category: 'Lifestyle',
    categoryBadge: 'Lifestyle Sneakers',
    shortDescription: 'Timeless 70s tennis heritage re-imagined with modern ergonomic comfort.',
    description: 'A tribute to iconic court silhouettes. Classic Court is crafted from smooth low-chrome leather with a hand-stitched caramel gum sole. Built to look even better with age, softening and molding to your foot over time.',
    rating: 4.8,
    reviewCount: 312,
    image: '/images/product_classic_court_1790699554540.jpg',
    gallery: [
      '/images/product_classic_court_1790699554540.jpg',
      '/images/craftsmanship_about_sneaker_1790699468947.jpg',
      '/images/category_lifestyle_sneaker_1790699438751.jpg'
    ],
    colors: [
      { name: 'Chalk & Caramel', hex: '#EBE3D5' },
      { name: 'Deep Mocha', hex: '#4B3928' },
      { name: 'Vintage Olive', hex: '#605B48' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isBestSeller: true,
    materials: 'Full-grain box calf leather, vulcanized gum rubber outsole',
    cushioning: 'Removable cork-topped ergonomic footbed'
  },
  {
    id: 'motion-x',
    name: 'Motion X',
    price: 159.99,
    category: 'Running',
    categoryBadge: 'Running Shoes',
    shortDescription: 'Adaptive trail and road crossover runner built for rugged endurance and high grip.',
    description: 'Transition effortlessly from city pavement to forest trails. Motion X features a multi-directional lug outsole designed in collaboration with Vibram®, delivering uncompromised traction in wet and dry conditions.',
    rating: 4.9,
    reviewCount: 94,
    image: '/images/category_running_sneaker_1790699422343.jpg',
    gallery: [
      '/images/category_running_sneaker_1790699422343.jpg',
      '/images/product_velocity_pro_1790699539307.jpg',
      '/images/product_aero_runner_1790699507913.jpg'
    ],
    colors: [
      { name: 'Stone Grey & Mocha', hex: '#7D6E5D' },
      { name: 'Nordic Clay', hex: '#A3917C' },
      { name: 'Stealth Black', hex: '#1C1917' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isNew: true,
    materials: 'DWR water-repellent recycled ripstop upper, TPU mudguard',
    cushioning: 'Multi-density EVA with deep flex grooves'
  },
  {
    id: 'retro-edge',
    name: 'Retro Edge',
    price: 129.99,
    originalPrice: 145.00,
    category: 'Lifestyle',
    categoryBadge: 'Lifestyle Sneakers',
    shortDescription: 'Bold 90s aesthetic elevated with artisanal suede trims and tactile stitching.',
    description: 'Retro Edge channels golden-era chunky sneaker heritage through a refined Scandinavian lens. Multi-layered organic textures and an exaggerated bevel heel make it a cornerstone piece for any contemporary fit.',
    rating: 4.7,
    reviewCount: 118,
    image: '/images/hero_sneaker_lifestyle_1790699402771.jpg',
    gallery: [
      '/images/hero_sneaker_lifestyle_1790699402771.jpg',
      '/images/category_new_arrivals_1790699454744.jpg',
      '/images/craftsmanship_about_sneaker_1790699468947.jpg'
    ],
    colors: [
      { name: 'Warm Sand', hex: '#D2C3B0' },
      { name: 'Earth Ochre', hex: '#806345' },
      { name: 'Off-White Ivory', hex: '#F7F3ED' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    materials: 'Hand-cut Italian suede, open-weave mesh, leather accents',
    cushioning: 'Double-cushioned midsole with rebound gel insert'
  },
  {
    id: 'mini-runner',
    name: 'Mini Runner',
    price: 89.99,
    category: 'Kids',
    categoryBadge: 'Kids Sneakers',
    shortDescription: 'Durable, easy-on performance sneakers engineered for growing feet and play.',
    description: 'Designed for boundless playground energy. Mini Runner pairs an ultra-durable scuff-resistant toe bumper with elastic no-tie bungee laces and a flexible, naturally wide footbed that supports healthy natural foot growth.',
    rating: 4.9,
    reviewCount: 76,
    image: '/images/category_lifestyle_sneaker_1790699438751.jpg',
    gallery: [
      '/images/category_lifestyle_sneaker_1790699438751.jpg',
      '/images/product_cloud_step_1790699523417.jpg',
      '/images/product_classic_court_1790699554540.jpg'
    ],
    colors: [
      { name: 'Toasted Caramel', hex: '#B89B77' },
      { name: 'Sky Cream', hex: '#E2DFD2' },
      { name: 'Mocha Tan', hex: '#634832' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    isNew: true,
    materials: 'Reinforced ballistic nylon, washable suede, anti-scuff toe guard',
    cushioning: 'Soft kid-specific flex foam with non-marking rubber tread'
  }
];
