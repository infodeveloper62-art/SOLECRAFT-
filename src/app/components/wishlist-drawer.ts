import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../models';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-wishlist-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (store.isWishlistOpen()) {
      <div class="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <button
          type="button"
          aria-label="Close wishlist backdrop"
          class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity w-full h-full cursor-default"
          (click)="store.closeWishlist()"
        ></button>

        <!-- Slide-over drawer -->
        <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div class="w-screen max-w-md bg-[#F7F3ED] shadow-2xl flex flex-col justify-between border-l border-[#E5DACF]">
            
            <!-- Header -->
            <div class="p-6 border-b border-[#E5DACF] flex items-center justify-between bg-white">
              <div class="flex items-center gap-2">
                <mat-icon class="text-red-500">favorite</mat-icon>
                <h2 class="font-serif text-xl font-bold text-[#241B14]">
                  Saved Wishlist
                </h2>
                <span class="text-xs bg-[#E9DFD2] text-[#241B14] font-bold px-2 py-0.5 rounded-full tabular-nums">
                  {{ store.wishlistCount() }}
                </span>
              </div>
              <button
                type="button"
                (click)="store.closeWishlist()"
                class="p-2 text-[#806345] hover:text-[#241B14] rounded-full hover:bg-[#F7F3ED] transition-colors"
                aria-label="Close wishlist"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Wishlist Items List -->
            <div class="flex-1 overflow-y-auto p-6 divide-y divide-[#E5DACF]/70">
              @if (store.wishlistProducts().length > 0) {
                @for (prod of store.wishlistProducts(); track prod.id) {
                  <div class="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                    <!-- Image -->
                    <button
                      type="button"
                      (click)="onOpenProduct(prod)"
                      class="w-20 h-20 rounded-xl bg-white overflow-hidden border border-[#E5DACF] shrink-0 cursor-pointer p-0 text-left"
                    >
                      <img
                        [src]="prod.image"
                        [alt]="prod.name"
                        referrerpolicy="no-referrer"
                        class="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                      />
                    </button>

                    <!-- Info -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-1">
                        <div>
                          <span class="text-[10px] font-semibold uppercase tracking-wider text-[#806345] block">
                            {{ prod.categoryBadge }}
                          </span>
                          <button
                            type="button"
                            (click)="onOpenProduct(prod)"
                            class="font-serif text-base font-bold text-[#241B14] truncate hover:text-[#806345] cursor-pointer text-left block w-full"
                          >
                            {{ prod.name }}
                          </button>
                        </div>
                        <button
                          type="button"
                          (click)="store.toggleWishlist(prod.id)"
                          class="text-[#806345] hover:text-red-500 p-1"
                          title="Remove from wishlist"
                        >
                          <mat-icon class="text-base">close</mat-icon>
                        </button>
                      </div>

                      <div class="flex items-center justify-between mt-2">
                        <span class="font-serif text-sm font-bold text-[#241B14] tabular-nums">
                          \${{ prod.price.toFixed(2) }}
                        </span>

                        <button
                          type="button"
                          (click)="store.moveToCartFromWishlist(prod)"
                          class="py-1.5 px-3 bg-[#4B3928] hover:bg-[#382B1E] text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <mat-icon class="text-xs">shopping_bag</mat-icon>
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              } @else {
                <!-- Empty Wishlist -->
                <div class="h-full flex flex-col items-center justify-center text-center py-16">
                  <div class="w-16 h-16 rounded-full bg-[#E9DFD2] flex items-center justify-center text-[#4B3928] mb-4">
                    <mat-icon class="text-3xl">favorite_border</mat-icon>
                  </div>
                  <h3 class="font-serif text-xl font-bold text-[#241B14] mb-2">
                    Your wishlist is empty
                  </h3>
                  <p class="text-xs text-[#806345] max-w-xs mb-6">
                    Tap the heart icon on any sneaker to save your favorite styles for later.
                  </p>
                  <button
                    type="button"
                    (click)="store.closeWishlist()"
                    class="px-6 py-2.5 bg-[#4B3928] hover:bg-[#382B1E] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
                  >
                    Discover Sneakers
                  </button>
                </div>
              }
            </div>

            <!-- Footer with clear actions -->
            @if (store.wishlistProducts().length > 0) {
              <div class="p-6 bg-white border-t border-[#E5DACF] flex flex-col gap-2">
                <button
                  type="button"
                  (click)="addAllToBag()"
                  class="w-full py-3.5 bg-[#E9DFD2] hover:bg-[#DDD0C0] text-[#241B14] font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Move All Items to Bag
                </button>
                <button
                  type="button"
                  (click)="store.closeWishlist()"
                  class="w-full py-2 text-[#806345] hover:text-[#241B14] text-xs font-medium text-center cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            }

          </div>
        </div>
      </div>
    }
  `,
})
export class WishlistDrawerComponent {
  readonly store = inject(StoreService);

  onOpenProduct(prod: Product): void {
    this.store.closeWishlist();
    this.store.openProductModal(prod);
  }

  addAllToBag(): void {
    const prods = [...this.store.wishlistProducts()];
    for (const p of prods) {
      this.store.moveToCartFromWishlist(p);
    }
    this.store.closeWishlist();
    this.store.openCart();
  }
}
