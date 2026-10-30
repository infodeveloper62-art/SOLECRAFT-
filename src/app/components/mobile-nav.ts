import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-mobile-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Docked Mobile Navigation Bar for Luxury Mobile Experience -->
    <nav
      class="fixed bottom-0 inset-x-0 z-40 bg-[#F7F3ED]/95 backdrop-blur-md border-t border-[#E5DACF] lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      aria-label="Mobile Navigation"
    >
      <div class="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        <!-- Shop / Drops -->
        <button
          type="button"
          (click)="scrollToShop()"
          class="flex flex-col items-center justify-center gap-0.5 text-[#4B3928] hover:text-[#241B14] active:scale-95 transition-transform cursor-pointer"
          aria-label="Shop Sneakers"
        >
          <mat-icon class="text-xl">storefront</mat-icon>
          <span class="text-[10px] font-semibold tracking-wider uppercase">Shop</span>
        </button>

        <!-- Search -->
        <button
          type="button"
          (click)="store.toggleSearch()"
          class="flex flex-col items-center justify-center gap-0.5 text-[#4B3928] hover:text-[#241B14] active:scale-95 transition-transform cursor-pointer"
          aria-label="Search"
        >
          <mat-icon class="text-xl">search</mat-icon>
          <span class="text-[10px] font-semibold tracking-wider uppercase">Search</span>
        </button>

        <!-- Wishlist with Badge -->
        <button
          type="button"
          (click)="store.openWishlist()"
          class="relative flex flex-col items-center justify-center gap-0.5 text-[#4B3928] hover:text-[#241B14] active:scale-95 transition-transform cursor-pointer"
          aria-label="Saved Wishlist"
        >
          <div class="relative">
            <mat-icon class="text-xl">favorite_border</mat-icon>
            @if (store.wishlistCount() > 0) {
              <span
                class="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
              >
                {{ store.wishlistCount() }}
              </span>
            }
          </div>
          <span class="text-[10px] font-semibold tracking-wider uppercase">Wishlist</span>
        </button>

        <!-- Bag with Live Badge -->
        <button
          type="button"
          (click)="store.openCart()"
          class="relative flex flex-col items-center justify-center gap-0.5 text-[#4B3928] hover:text-[#241B14] active:scale-95 transition-transform cursor-pointer"
          aria-label="Shopping Bag"
        >
          <div class="relative">
            <mat-icon class="text-xl">shopping_bag</mat-icon>
            @if (store.cartCount() > 0) {
              <span
                class="absolute -top-1 -right-2 bg-[#4B3928] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
              >
                {{ store.cartCount() }}
              </span>
            }
          </div>
          <span class="text-[10px] font-semibold tracking-wider uppercase">Bag</span>
        </button>

        <!-- Full Menu -->
        <button
          type="button"
          (click)="store.toggleMobileMenu(true)"
          class="flex flex-col items-center justify-center gap-0.5 text-[#4B3928] hover:text-[#241B14] active:scale-95 transition-transform cursor-pointer"
          aria-label="Open full menu"
        >
          <mat-icon class="text-xl">menu</mat-icon>
          <span class="text-[10px] font-semibold tracking-wider uppercase">Menu</span>
        </button>
      </div>
    </nav>
  `,
})
export class MobileNavComponent {
  readonly store = inject(StoreService);

  scrollToShop(): void {
    const el = document.getElementById('collection-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
