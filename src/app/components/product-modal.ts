import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../models';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-product-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (product(); as prod) {
      <div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <!-- Backdrop with Blur -->
        <button
          type="button"
          aria-label="Close product view backdrop"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity w-full h-full cursor-default"
          (click)="store.closeProductModal()"
        ></button>

        <!-- Modal Dialog Container -->
        <div class="flex min-h-full items-center justify-center p-2 sm:p-4 md:p-6 text-center">
          <div
            class="relative w-full max-w-4xl transform overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F7F3ED] text-left align-middle shadow-2xl transition-all border border-[#E5DACF]"
          >
            <!-- Close Button Top Right -->
            <button
              type="button"
              (click)="store.closeProductModal()"
              class="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#241B14] shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer focus:outline-none"
              aria-label="Close product view"
            >
              <mat-icon class="text-base sm:text-lg">close</mat-icon>
            </button>

            <!-- 2-Column Product Detail Layout -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-0">
              
              <!-- Left Column: Gallery & Images (md:col-span-6) -->
              <div class="md:col-span-6 bg-white p-4 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5DACF]">
                <!-- Main Featured Product Image -->
                <div class="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F7F3ED] mb-4">
                  <img
                    [src]="activeImage()"
                    [alt]="prod.name"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-cover object-center transition-all duration-300"
                  />
                  <!-- Wishlist Icon Floating -->
                  <button
                    type="button"
                    (click)="store.toggleWishlist(prod.id)"
                    class="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-sm flex items-center justify-center text-[#806345] hover:text-red-500"
                    aria-label="Save to Wishlist"
                  >
                    <mat-icon [class]="store.isInWishlist(prod.id) ? 'text-red-500' : ''">
                      {{ store.isInWishlist(prod.id) ? 'favorite' : 'favorite_border' }}
                    </mat-icon>
                  </button>
                </div>

                <!-- Gallery Thumbnails -->
                @if (prod.gallery && prod.gallery.length > 1) {
                  <div class="flex items-center gap-3 overflow-x-auto pb-1">
                    @for (img of prod.gallery; track $index) {
                      <button
                        type="button"
                        (click)="activeImage.set(img)"
                        class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer"
                        [class]="activeImage() === img ? 'border-[#4B3928] scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'"
                      >
                        <img
                          [src]="img"
                          [alt]="prod.name + ' thumbnail ' + ($index + 1)"
                          referrerpolicy="no-referrer"
                          class="w-full h-full object-cover object-center"
                        />
                      </button>
                    }
                  </div>
                }

                <!-- Craftsmanship Highlight Pill -->
                <div class="mt-6 pt-4 border-t border-[#E5DACF]/80 flex items-center justify-between text-xs text-[#806345]">
                  <span class="flex items-center gap-1.5 font-medium">
                    <mat-icon class="text-sm text-[#4B3928]">verified</mat-icon>
                    Authentic Atelier Craft
                  </span>
                  <span class="font-medium text-[#241B14]">In Stock · Ships in 24h</span>
                </div>
              </div>

              <!-- Right Column: Product Specs & Purchase Module (md:col-span-6) -->
              <div class="md:col-span-6 p-4 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                <div>
                  <!-- Category & Rating Row -->
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="text-xs font-semibold tracking-wider uppercase text-[#806345]">
                      {{ prod.categoryBadge }}
                    </span>
                    <div class="flex items-center gap-1 text-xs">
                      <mat-icon class="text-amber-600 text-sm">star</mat-icon>
                      <span class="font-bold text-[#241B14]">{{ prod.rating }}</span>
                      <span class="text-[#806345]/70">({{ prod.reviewCount }} reviews)</span>
                    </div>
                  </div>

                  <!-- Product Name -->
                  <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#241B14] mb-3">
                    {{ prod.name }}
                  </h2>

                  <!-- Price -->
                  <div class="flex items-baseline gap-3 mb-5">
                    <span class="font-serif text-2xl sm:text-3xl font-bold text-[#241B14] tabular-nums">
                      \${{ prod.price.toFixed(2) }}
                    </span>
                    @if (prod.originalPrice) {
                      <span class="text-sm text-[#806345]/60 line-through tabular-nums">
                        \${{ prod.originalPrice.toFixed(2) }}
                      </span>
                    }
                    <span class="text-xs text-emerald-800 font-semibold px-2 py-0.5 bg-emerald-50 rounded-md">
                      Free Insured Shipping
                    </span>
                  </div>

                  <!-- Long Description -->
                  <p class="text-sm text-[#4B3928]/90 leading-relaxed mb-6 font-normal">
                    {{ prod.description }}
                  </p>

                  <!-- Color Selection Swatches -->
                  <div class="mb-6">
                    <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#241B14] mb-2.5">
                      <span>Colorway: <span class="font-normal text-[#806345] normal-case">{{ selectedColor() }}</span></span>
                    </div>
                    <div class="flex items-center gap-3">
                      @for (col of prod.colors; track col.name) {
                        <button
                          type="button"
                          (click)="selectedColor.set(col.name)"
                          class="group relative flex items-center justify-center p-1 rounded-full border-2 transition-all cursor-pointer"
                          [class]="selectedColor() === col.name ? 'border-[#4B3928] scale-110' : 'border-transparent hover:border-[#806345]/40'"
                          [title]="col.name"
                        >
                          <span
                            class="w-6 h-6 rounded-full border border-black/10 shadow-xs"
                            [style.background-color]="col.hex"
                          ></span>
                        </button>
                      }
                    </div>
                  </div>

                  <!-- Available Sizes Selector (US 6 to 12) -->
                  <div class="mb-6">
                    <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#241B14] mb-2.5">
                      <span>Select Size (US Men/Unisex):</span>
                      <button
                        type="button"
                        (click)="store.openSizeGuide()"
                        class="text-[#806345] hover:text-[#241B14] underline lowercase text-xs font-normal"
                      >
                        size guide
                      </button>
                    </div>
                    <div class="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
                      @for (size of availableSizes; track size) {
                        <button
                          type="button"
                          (click)="selectedSize.set(size)"
                          class="py-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center"
                          [class]="
                            selectedSize() === size
                              ? 'bg-[#4B3928] text-white border-[#4B3928] shadow-xs'
                              : 'bg-white text-[#241B14] border-[#E5DACF] hover:border-[#806345]'
                          "
                        >
                          US {{ size }}
                        </button>
                      }
                    </div>
                  </div>

                  <!-- Quantity Selector -->
                  <div class="flex items-center justify-between mb-8 pb-4 border-b border-[#E5DACF]">
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#241B14]">
                      Quantity
                    </span>
                    <div class="flex items-center border border-[#E5DACF] rounded-xl bg-white overflow-hidden">
                      <button
                        type="button"
                        (click)="decrementQty()"
                        class="w-9 h-9 flex items-center justify-center text-[#241B14] hover:bg-[#E9DFD2]/40 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <mat-icon class="text-sm">remove</mat-icon>
                      </button>
                      <span class="w-10 text-center text-sm font-bold tabular-nums text-[#241B14]">
                        {{ quantity() }}
                      </span>
                      <button
                        type="button"
                        (click)="incrementQty()"
                        class="w-9 h-9 flex items-center justify-center text-[#241B14] hover:bg-[#E9DFD2]/40 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <mat-icon class="text-sm">add</mat-icon>
                      </button>
                    </div>
                  </div>

                </div>

                <!-- Action Buttons: Add to Cart and Buy Now -->
                <div class="flex flex-col gap-3">
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      (click)="onAddToCart(prod)"
                      class="py-3.5 px-4 bg-[#E9DFD2] hover:bg-[#DDD0C0] text-[#241B14] font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928]"
                    >
                      <mat-icon class="text-base">shopping_bag</mat-icon>
                      <span>Add to Cart</span>
                    </button>

                    <button
                      type="button"
                      (click)="onBuyNow(prod)"
                      class="py-3.5 px-4 bg-[#4B3928] hover:bg-[#382B1E] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928]"
                    >
                      <mat-icon class="text-base">bolt</mat-icon>
                      <span>Buy Now</span>
                    </button>
                  </div>

                  <!-- Small guarantee footer note -->
                  <div class="text-[11px] text-center text-[#806345]/90 mt-2">
                    30-Day risk-free trial · Free exchanges & carbon-neutral packaging
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class ProductModalComponent {
  readonly store = inject(StoreService);

  readonly product = this.store.selectedProduct;
  readonly availableSizes = [6, 7, 8, 9, 10, 11, 12];

  readonly activeImage = signal<string>('');
  readonly selectedSize = signal<number>(8);
  readonly selectedColor = signal<string>('');
  readonly quantity = signal<number>(1);

  constructor() {
    effect(() => {
      const p = this.product();
      if (p) {
        this.activeImage.set(p.image);
        this.selectedSize.set(p.sizes[2] || 8);
        this.selectedColor.set(p.colors[0]?.name || 'Standard');
        this.quantity.set(1);
      }
    });
  }

  incrementQty(): void {
    this.quantity.update((q) => q + 1);
  }

  decrementQty(): void {
    this.quantity.update((q) => (q > 1 ? q - 1 : 1));
  }

  onAddToCart(p: Product): void {
    this.store.addToCart(p, this.selectedSize(), this.selectedColor(), this.quantity());
    this.store.closeProductModal();
  }

  onBuyNow(p: Product): void {
    this.store.addToCart(p, this.selectedSize(), this.selectedColor(), this.quantity());
    this.store.closeProductModal();
    this.store.openCheckout();
  }
}
