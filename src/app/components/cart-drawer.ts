import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-cart-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (store.isCartOpen()) {
      <div class="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <button
          type="button"
          aria-label="Close bag backdrop"
          class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity w-full h-full cursor-default"
          (click)="store.closeCart()"
        ></button>

        <!-- Slide-Over Drawer Container -->
        <div class="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <div class="w-screen max-w-md bg-[#F7F3ED] shadow-2xl flex flex-col justify-between border-l border-[#E5DACF]">
            
            <!-- Drawer Header -->
            <div class="p-4 sm:p-6 border-b border-[#E5DACF] flex items-center justify-between bg-white">
              <div class="flex items-center gap-2">
                <mat-icon class="text-[#4B3928]">shopping_bag</mat-icon>
                <h2 class="font-serif text-xl font-bold text-[#241B14]">
                  Shopping Bag
                </h2>
                <span class="text-xs bg-[#E9DFD2] text-[#241B14] font-bold px-2 py-0.5 rounded-full tabular-nums">
                  {{ store.cartCount() }}
                </span>
              </div>
              <button
                type="button"
                (click)="store.closeCart()"
                class="p-2 text-[#806345] hover:text-[#241B14] rounded-full hover:bg-[#F7F3ED] transition-colors"
                aria-label="Close bag"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Free Shipping Progress Bar Banner -->
            <div class="bg-[#E9DFD2]/60 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-[#E5DACF]">
              @if (store.cartSubtotal() >= store.freeShippingThreshold) {
                <div class="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <mat-icon class="text-sm">check_circle</mat-icon>
                  <span>You've unlocked FREE Worldwide Delivery!</span>
                </div>
              } @else {
                <div class="flex items-center justify-between text-xs text-[#4B3928] mb-1.5 font-medium">
                  <span>
                    Add <strong>\${{ (store.freeShippingThreshold - store.cartSubtotal()).toFixed(2) }}</strong> more for Free Shipping
                  </span>
                  <span class="text-[11px] text-[#806345] tabular-nums font-semibold">
                    {{ ((store.cartSubtotal() / store.freeShippingThreshold) * 100).toFixed(0) }}%
                  </span>
                </div>
                <div class="w-full h-1.5 bg-white rounded-full overflow-hidden">
                  <div
                    class="h-full bg-[#4B3928] rounded-full transition-all duration-300"
                    [style.width.%]="(store.cartSubtotal() / store.freeShippingThreshold) * 100"
                  ></div>
                </div>
              }
            </div>

            <!-- Cart Items List (Scrollable) -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-[#E5DACF]/70">
              @if (store.cart().length > 0) {
                @for (item of store.cart(); track item.id) {
                  <div class="py-4 first:pt-0 last:pb-0 flex gap-4">
                    <!-- Sneaker Thumbnail -->
                    <div class="w-20 h-20 rounded-xl bg-white overflow-hidden border border-[#E5DACF] shrink-0">
                      <img
                        [src]="item.product.image"
                        [alt]="item.product.name"
                        referrerpolicy="no-referrer"
                        class="w-full h-full object-cover object-center"
                      />
                    </div>

                    <!-- Details & Controls -->
                    <div class="flex-1 flex flex-col justify-between">
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <h4 class="font-serif text-base font-bold text-[#241B14] leading-tight">
                            {{ item.product.name }}
                          </h4>
                          <p class="text-xs text-[#806345] mt-0.5">
                            Size: <span class="font-semibold text-[#241B14]">US {{ item.selectedSize }}</span> · {{ item.selectedColor }}
                          </p>
                        </div>
                        <span class="font-serif text-sm font-bold text-[#241B14] tabular-nums">
                          \${{ (item.product.price * item.quantity).toFixed(2) }}
                        </span>
                      </div>

                      <!-- Stepper and Remove Row -->
                      <div class="flex items-center justify-between mt-3">
                        <div class="flex items-center border border-[#E5DACF] rounded-lg bg-white overflow-hidden">
                          <button
                            type="button"
                            (click)="store.updateCartQuantity(item.id, -1)"
                            class="w-7 h-7 flex items-center justify-center text-[#241B14] hover:bg-[#E9DFD2]/50 text-xs"
                            aria-label="Decrease quantity"
                          >
                            <mat-icon class="text-xs">remove</mat-icon>
                          </button>
                          <span class="w-8 text-center text-xs font-bold tabular-nums text-[#241B14]">
                            {{ item.quantity }}
                          </span>
                          <button
                            type="button"
                            (click)="store.updateCartQuantity(item.id, 1)"
                            class="w-7 h-7 flex items-center justify-center text-[#241B14] hover:bg-[#E9DFD2]/50 text-xs"
                            aria-label="Increase quantity"
                          >
                            <mat-icon class="text-xs">add</mat-icon>
                          </button>
                        </div>

                        <button
                          type="button"
                          (click)="store.removeFromCart(item.id)"
                          class="text-xs text-[#806345] hover:text-red-600 transition-colors flex items-center gap-1 font-medium"
                        >
                          <mat-icon class="text-sm">delete_outline</mat-icon>
                          <span>Remove</span>
                        </button>
                      </div>

                    </div>
                  </div>
                }
              } @else {
                <!-- Empty Cart State -->
                <div class="h-full flex flex-col items-center justify-center text-center py-16">
                  <div class="w-16 h-16 rounded-full bg-[#E9DFD2] flex items-center justify-center text-[#4B3928] mb-4">
                    <mat-icon class="text-3xl">shopping_bag</mat-icon>
                  </div>
                  <h3 class="font-serif text-xl font-bold text-[#241B14] mb-2">
                    Your bag is empty
                  </h3>
                  <p class="text-xs text-[#806345] max-w-xs mb-6">
                    Looks like you haven't added any handcrafted sneakers yet. Explore our fresh drops.
                  </p>
                  <button
                    type="button"
                    (click)="store.closeCart()"
                    class="px-6 py-2.5 bg-[#4B3928] hover:bg-[#382B1E] text-white text-xs font-semibold rounded-full transition-colors"
                  >
                    Start Exploring
                  </button>
                </div>
              }
            </div>

            <!-- Footer: Summary & Checkout Buttons -->
            @if (store.cart().length > 0) {
              <div class="p-4 sm:p-6 bg-white border-t border-[#E5DACF] flex flex-col gap-3 sm:gap-4">
                <!-- Breakdown -->
                <div class="space-y-2 text-xs sm:text-sm text-[#4B3928]">
                  <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span class="font-semibold text-[#241B14] tabular-nums">
                      \${{ store.cartSubtotal().toFixed(2) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span class="font-semibold text-[#241B14] tabular-nums">
                      @if (store.shippingFee() === 0) {
                        <span class="text-emerald-700">FREE</span>
                      } @else {
                        \${{ store.shippingFee().toFixed(2) }}
                      }
                    </span>
                  </div>
                  <div class="flex justify-between text-base font-bold text-[#241B14] pt-2 border-t border-[#E5DACF]/80">
                    <span class="font-serif">Total</span>
                    <span class="font-serif tabular-nums text-lg">
                      \${{ store.cartTotal().toFixed(2) }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons: Proceed to Checkout and Continue Shopping -->
                <div class="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    (click)="store.openCheckout()"
                    class="w-full py-4 bg-[#4B3928] hover:bg-[#382B1E] text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928]"
                  >
                    <span>Proceed to Checkout</span>
                    <mat-icon class="text-sm">lock</mat-icon>
                  </button>

                  <button
                    type="button"
                    (click)="store.closeCart()"
                    class="w-full py-2.5 text-[#806345] hover:text-[#241B14] text-xs font-semibold transition-colors text-center cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            }

          </div>
        </div>
      </div>
    }
  `,
})
export class CartDrawerComponent {
  readonly store = inject(StoreService);
}
