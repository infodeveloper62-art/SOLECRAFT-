export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Men' | 'Women' | 'Kids' | 'Running' | 'Lifestyle' | 'New Arrivals';
  categoryBadge: string;
  shortDescription: string;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  colors: { name: string; hex: string }[];
  sizes: number[];
  isNew?: boolean;
  isBestSeller?: boolean;
  materials: string;
  cushioning: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface CheckoutData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'cod' | 'card' | 'paypal';
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: CheckoutData;
  estimatedDelivery: string;
}
