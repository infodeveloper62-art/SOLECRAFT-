import { Injectable, computed, signal } from '@angular/core';
import { CartItem, CheckoutData, OrderConfirmation, Product } from '../models';
import { INITIAL_PRODUCTS } from '../data/products';

export interface ToastInfo {
  id: number;
  title: string;
  subtitle?: string;
  type: 'success' | 'info' | 'cart';
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  // Products
  private readonly productsSignal = signal<Product[]>(INITIAL_PRODUCTS);
  readonly products = this.productsSignal.asReadonly();

  // Active Filters
  readonly activeCategory = signal<string>('All');
  readonly searchQuery = signal<string>('');
  readonly sortBy = signal<'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'>('featured');

  // UI state signals
  readonly selectedProduct = signal<Product | null>(null);
  readonly isCartOpen = signal<boolean>(false);
  readonly isWishlistOpen = signal<boolean>(false);
  readonly isCheckoutOpen = signal<boolean>(false);
  readonly isSearchOpen = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly isSizeGuideOpen = signal<boolean>(false);
  readonly isBrandStoryOpen = signal<boolean>(false);
  readonly isOrderSuccessOpen = signal<boolean>(false);
  readonly lastOrder = signal<OrderConfirmation | null>(null);

  // Toast notifications
  readonly toasts = signal<ToastInfo[]>([]);

  // Cart & Wishlist state with localStorage initialization
  readonly cart = signal<CartItem[]>(this.loadCartFromStorage());
  readonly wishlist = signal<string[]>(this.loadWishlistFromStorage());

  // Filtered & Sorted Products computation
  readonly filteredProducts = computed(() => {
    let list = [...this.productsSignal()];
    const category = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();

    // Category filter
    if (category !== 'All') {
      if (category === 'New Arrivals') {
        list = list.filter((p) => p.isNew);
      } else if (category === 'Men') {
        list = list.filter((p) => p.category === 'Men' || p.categoryBadge.includes("Men's"));
      } else if (category === 'Women') {
        list = list.filter((p) => p.category === 'Women' || p.categoryBadge.includes("Women's"));
      } else if (category === 'Kids') {
        list = list.filter((p) => p.category === 'Kids' || p.categoryBadge.includes("Kids"));
      } else if (category === 'Running') {
        list = list.filter((p) => p.category === 'Running' || p.categoryBadge.includes('Running'));
      } else if (category === 'Lifestyle') {
        list = list.filter((p) => p.category === 'Lifestyle' || p.categoryBadge.includes('Lifestyle'));
      }
    }

    // Search query filter
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.categoryBadge.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    const sort = this.sortBy();
    if (sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  });

  // Cart Computations
  readonly cartCount = computed(() => {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0);
  });

  readonly cartSubtotal = computed(() => {
    return this.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  });

  // Free shipping over $120
  readonly freeShippingThreshold = 120;
  readonly shippingFee = computed(() => {
    const sub = this.cartSubtotal();
    return sub === 0 || sub >= this.freeShippingThreshold ? 0 : 9.99;
  });

  readonly cartTotal = computed(() => {
    return this.cartSubtotal() + this.shippingFee();
  });

  // Wishlist Computations
  readonly wishlistCount = computed(() => this.wishlist().length);

  readonly wishlistProducts = computed(() => {
    const ids = new Set(this.wishlist());
    return this.productsSignal().filter((p) => ids.has(p.id));
  });

  // Storage Helpers
  private loadCartFromStorage(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem('solecraft_cart');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('solecraft_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }

  private loadWishlistFromStorage(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem('solecraft_wishlist');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveWishlistToStorage(ids: string[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('solecraft_wishlist', JSON.stringify(ids));
    } catch {
      // ignore
    }
  }

  // Cart actions
  addToCart(product: Product, size?: number, colorName?: string, quantity = 1): void {
    const chosenSize = size ?? product.sizes[2] ?? 8;
    const chosenColor = colorName ?? product.colors[0]?.name ?? 'Standard';
    const itemId = `${product.id}-${chosenSize}-${chosenColor}`;

    const currentCart = [...this.cart()];
    const existingIndex = currentCart.findIndex((item) => item.id === itemId);

    if (existingIndex > -1) {
      currentCart[existingIndex] = {
        ...currentCart[existingIndex],
        quantity: currentCart[existingIndex].quantity + quantity,
      };
    } else {
      currentCart.push({
        id: itemId,
        product,
        selectedSize: chosenSize,
        selectedColor: chosenColor,
        quantity,
      });
    }

    this.cart.set(currentCart);
    this.saveCartToStorage(currentCart);
    this.showToast('Added to bag', `${product.name} (US ${chosenSize}) added to your shopping bag.`, 'cart');
  }

  updateCartQuantity(itemId: string, delta: number): void {
    const current = [...this.cart()];
    const index = current.findIndex((item) => item.id === itemId);
    if (index === -1) return;

    const newQty = current[index].quantity + delta;
    if (newQty <= 0) {
      current.splice(index, 1);
    } else {
      current[index] = {
        ...current[index],
        quantity: newQty,
      };
    }
    this.cart.set(current);
    this.saveCartToStorage(current);
  }

  removeFromCart(itemId: string): void {
    const current = this.cart().filter((item) => item.id !== itemId);
    this.cart.set(current);
    this.saveCartToStorage(current);
    this.showToast('Item removed', 'Sneaker removed from your bag.', 'info');
  }

  clearCart(): void {
    this.cart.set([]);
    this.saveCartToStorage([]);
  }

  // Wishlist actions
  toggleWishlist(productId: string): void {
    const current = [...this.wishlist()];
    const index = current.indexOf(productId);
    const prod = this.productsSignal().find((p) => p.id === productId);

    if (index > -1) {
      current.splice(index, 1);
      this.showToast('Removed from wishlist', `${prod?.name ?? 'Item'} removed from saved items.`, 'info');
    } else {
      current.push(productId);
      this.showToast('Saved to wishlist', `${prod?.name ?? 'Item'} saved to your wishlist.`, 'success');
    }

    this.wishlist.set(current);
    this.saveWishlistToStorage(current);
  }

  isInWishlist(productId: string): boolean {
    return this.wishlist().includes(productId);
  }

  moveToCartFromWishlist(product: Product): void {
    this.addToCart(product, product.sizes[2] || 8, product.colors[0]?.name || 'Standard', 1);
    this.toggleWishlist(product.id);
  }

  // Modal actions
  openProductModal(product: Product): void {
    this.selectedProduct.set(product);
  }

  closeProductModal(): void {
    this.selectedProduct.set(null);
  }

  openCart(): void {
    this.isCartOpen.set(true);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  openWishlist(): void {
    this.isWishlistOpen.set(true);
  }

  closeWishlist(): void {
    this.isWishlistOpen.set(false);
  }

  openCheckout(): void {
    this.isCartOpen.set(false);
    this.isCheckoutOpen.set(true);
  }

  closeCheckout(): void {
    this.isCheckoutOpen.set(false);
  }

  toggleSearch(state?: boolean): void {
    this.isSearchOpen.set(state !== undefined ? state : !this.isSearchOpen());
  }

  toggleMobileMenu(state?: boolean): void {
    this.isMobileMenuOpen.set(state !== undefined ? state : !this.isMobileMenuOpen());
  }

  openSizeGuide(): void {
    this.isSizeGuideOpen.set(true);
  }

  closeSizeGuide(): void {
    this.isSizeGuideOpen.set(false);
  }

  openBrandStory(): void {
    this.isBrandStoryOpen.set(true);
  }

  closeBrandStory(): void {
    this.isBrandStoryOpen.set(false);
  }

  closeOrderSuccess(): void {
    this.isOrderSuccessOpen.set(false);
    this.lastOrder.set(null);
  }

  submitOrder(formData: CheckoutData): OrderConfirmation {
    const confirmation: OrderConfirmation = {
      orderId: `SC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...this.cart()],
      subtotal: this.cartSubtotal(),
      shipping: this.shippingFee(),
      discount: 0,
      total: this.cartTotal(),
      customer: formData,
      estimatedDelivery: '3 - 5 Business Days (Express Insured)',
    };

    this.lastOrder.set(confirmation);
    this.clearCart();
    this.isCheckoutOpen.set(false);
    this.isOrderSuccessOpen.set(true);
    this.showToast('Order confirmed!', `Order #${confirmation.orderId} received successfully.`, 'success');
    return confirmation;
  }

  buyNow(product: Product, size?: number, colorName?: string): void {
    this.addToCart(product, size, colorName, 1);
    this.closeProductModal();
    this.openCheckout();
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
    // Smooth scroll to catalog
    if (typeof window !== 'undefined') {
      const el = document.getElementById('collection-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  setSort(sort: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'): void {
    this.sortBy.set(sort);
  }

  setSearch(query: string): void {
    this.searchQuery.set(query);
  }

  showToast(title: string, subtitle?: string, type: 'success' | 'info' | 'cart' = 'success'): void {
    const id = Date.now();
    const newToast: ToastInfo = { id, title, subtitle, type };
    this.toasts.update((current) => [...current, newToast]);

    setTimeout(() => {
      this.toasts.update((current) => current.filter((t) => t.id !== id));
    }, 3800);
  }

  dismissToast(id: number): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
