import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../models';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-product-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="collection-catalog" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <span class="text-xs font-bold tracking-[0.25em] uppercase text-[#806345] mb-2 inline-block">
          Handcrafted Footwear Lineup
        </span>
        <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241B14] mb-4 text-balance">
          NEWLY DROPPED COLLECTIONS
        </h2>
        <p class="text-base sm:text-lg text-[#4B3928]/80 leading-relaxed font-normal">
          Discover fresh sneakers designed to bring comfort and style to every step.
        </p>
      </div>

      <!-- Filter Tabs, Live Search & Sorting Controls -->
      <div class="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5DACF]">
        
        <!-- Category Segmented Filter Tabs (Single line with smooth horizontal scrolling on mobile) -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none max-w-full">
          @for (cat of categories; track cat) {
            <button
              type="button"
              (click)="store.setCategory(cat)"
              class="whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928]"
              [class]="
                store.activeCategory() === cat
                  ? 'bg-[#4B3928] text-white shadow-sm'
                  : 'bg-[#E9DFD2]/60 hover:bg-[#E9DFD2] text-[#241B14]'
              "
            >
              {{ cat }}
            </button>
          }
        </div>

        <!-- Right: Instant Search & Sort Controls (Side-by-side like tablet) -->
        <div class="flex flex-row items-center gap-2 sm:gap-3">
          <!-- Search Input with Clear Button -->
          <div class="relative flex-1 sm:w-64">
            <span class="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-[#806345]">
              <mat-icon class="text-base sm:text-lg">search</mat-icon>
            </span>
            <input
              type="text"
              [value]="store.searchQuery()"
              (input)="onSearchInput($event)"
              placeholder="Search sneakers..."
              class="w-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-2 text-xs sm:text-sm bg-white border border-[#E5DACF] rounded-full text-[#241B14] placeholder-[#806345]/60 focus:outline-none focus:border-[#4B3928] focus:ring-1 focus:ring-[#4B3928] transition-colors"
            />
            @if (store.searchQuery()) {
              <button
                type="button"
                (click)="store.setSearch('')"
                class="absolute inset-y-0 right-0 pr-2 flex items-center text-[#806345] hover:text-[#241B14]"
                aria-label="Clear search"
              >
                <mat-icon class="text-xs sm:text-sm">close</mat-icon>
              </button>
            }
          </div>

          <!-- Sort Dropdown -->
          <div class="relative shrink-0 flex items-center">
            <label for="sort-select" class="sr-only">Sort products</label>
            <div class="relative">
              <select
                id="sort-select"
                (change)="onSortChange($event)"
                class="appearance-none pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-2 bg-white border border-[#E5DACF] rounded-full text-xs sm:text-sm text-[#241B14] font-medium focus:outline-none focus:border-[#4B3928] cursor-pointer"
              >
                <option value="featured" [selected]="store.sortBy() === 'featured'">Featured</option>
                <option value="price-asc" [selected]="store.sortBy() === 'price-asc'">Price: Low to High</option>
                <option value="price-desc" [selected]="store.sortBy() === 'price-desc'">Price: High to Low</option>
                <option value="newest" [selected]="store.sortBy() === 'newest'">Newest</option>
                <option value="rating" [selected]="store.sortBy() === 'rating'">Top Rated</option>
              </select>
              <mat-icon class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#806345]">
                expand_more
              </mat-icon>
            </div>
          </div>
        </div>

      </div>

      <!-- Active Filter / Search Indicator -->
      @if (store.searchQuery() || store.activeCategory() !== 'All') {
        <div class="mb-8 flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-[#E5DACF]">
          <div class="text-xs sm:text-sm text-[#4B3928]">
            Showing <strong class="text-[#241B14] font-bold tabular-nums">{{ store.filteredProducts().length }}</strong>
            results
            @if (store.activeCategory() !== 'All') {
              for category <span class="font-semibold text-[#241B14]">"{{ store.activeCategory() }}"</span>
            }
            @if (store.searchQuery()) {
              matching <span class="font-semibold text-[#241B14]">"{{ store.searchQuery() }}"</span>
            }
          </div>
          <button
            type="button"
            (click)="resetFilters()"
            class="text-xs font-semibold text-[#806345] hover:text-[#241B14] underline underline-offset-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      }

      <!-- 2-Column Mobile & Tablet Grid, 3-Column Desktop Grid -->
      @if (store.filteredProducts().length > 0) {
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          @for (product of store.filteredProducts(); track product.id) {
            <!-- Product Card with Smooth Lift & Visual Structure -->
            <div
              class="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-[#E5DACF] shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <!-- Top: Image Area with Wishlist & Badge -->
              <div class="relative overflow-hidden rounded-lg sm:rounded-xl bg-[#F7F3ED] aspect-[4/3] w-full mb-3 sm:mb-4">
                
                <!-- Category Badge on Card -->
                <div class="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                  <span class="text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#241B14]/85 backdrop-blur-xs text-[#F7F3ED] shadow-xs">
                    {{ product.categoryBadge }}
                  </span>
                </div>

                <!-- Wishlist Heart Button -->
                <button
                  type="button"
                  (click)="toggleWishlist($event, product.id)"
                  class="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none"
                  [attr.aria-label]="store.isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                >
                  <mat-icon
                    class="text-sm sm:text-lg transition-colors"
                    [class]="store.isInWishlist(product.id) ? 'text-red-500' : 'text-[#806345] group-hover:text-[#241B14]'"
                  >
                    {{ store.isInWishlist(product.id) ? 'favorite' : 'favorite_border' }}
                  </mat-icon>
                </button>

                <!-- Product Image with Zoom on Hover -->
                <img
                  [src]="product.image"
                  [alt]="product.name"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-500 ease-out"
                />

                <!-- Quick View Overlay Hint -->
                <button
                  type="button"
                  (click)="store.openProductModal(product)"
                  class="absolute bottom-2 inset-x-2 sm:bottom-3 sm:inset-x-3 py-1.5 sm:py-2 bg-white/95 text-[#241B14] text-[11px] sm:text-xs font-semibold rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer"
                >
                  <mat-icon class="text-xs sm:text-sm">visibility</mat-icon>
                  <span>Quick View</span>
                </button>
              </div>

              <!-- Product Info Underneath -->
              <div class="flex-1 flex flex-col">
                <!-- Rating and Reviews -->
                <div class="flex items-center justify-between mb-1 sm:mb-1.5 text-[11px] sm:text-xs text-[#806345]">
                  <div class="flex items-center gap-0.5 sm:gap-1">
                    <mat-icon class="text-xs sm:text-sm text-amber-600">star</mat-icon>
                    <span class="font-bold text-[#241B14] tabular-nums">{{ product.rating }}</span>
                    <span class="text-[#806345]/70 tabular-nums">({{ product.reviewCount }})</span>
                  </div>
                  @if (product.isNew) {
                    <span class="text-[9px] sm:text-[10px] uppercase font-bold text-amber-700 tracking-wider">New</span>
                  }
                </div>

                <!-- Product Name -->
                <button
                  type="button"
                  (click)="store.openProductModal(product)"
                  class="text-left font-serif text-sm sm:text-lg lg:text-xl font-bold text-[#241B14] hover:text-[#806345] transition-colors cursor-pointer mb-1 block w-full truncate"
                >
                  {{ product.name }}
                </button>

                <!-- Short Product Description -->
                <p class="text-[11px] sm:text-sm text-[#4B3928]/80 line-clamp-2 leading-relaxed mb-2 sm:mb-3">
                  {{ product.shortDescription }}
                </p>

                <!-- Price and Color indicators -->
                <div class="flex items-center justify-between mt-auto pt-1.5 sm:pt-2 border-t border-[#E5DACF]/60 mb-2.5 sm:mb-4">
                  <div class="flex items-baseline gap-1 sm:gap-2">
                    <span class="font-serif text-sm sm:text-lg lg:text-xl font-bold text-[#241B14] tabular-nums">
                      \${{ product.price.toFixed(2) }}
                    </span>
                    @if (product.originalPrice) {
                      <span class="text-[10px] sm:text-xs text-[#806345]/60 line-through tabular-nums">
                        \${{ product.originalPrice.toFixed(2) }}
                      </span>
                    }
                  </div>

                  <!-- Color swatches preview -->
                  <div class="flex items-center gap-0.5 sm:gap-1">
                    @for (col of product.colors; track col.name) {
                      <span
                        class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black/10"
                        [style.background-color]="col.hex"
                        [title]="col.name"
                      ></span>
                    }
                  </div>
                </div>

                <!-- Dual Action Buttons: "Add to Cart" and "Buy Now" -->
                <div class="grid grid-cols-2 gap-1.5 sm:gap-2 mt-auto">
                  <button
                    type="button"
                    (click)="onAddToCart(product)"
                    class="py-2 sm:py-2.5 px-1.5 sm:px-3 bg-[#E9DFD2] hover:bg-[#DDD0C0] text-[#241B14] text-[10px] sm:text-xs font-semibold rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928]"
                  >
                    <mat-icon class="text-xs sm:text-sm">add_shopping_cart</mat-icon>
                    <span class="truncate">Add</span>
                  </button>

                  <button
                    type="button"
                    (click)="onBuyNow(product)"
                    class="py-2 sm:py-2.5 px-1.5 sm:px-3 bg-[#4B3928] hover:bg-[#382B1E] text-white text-[10px] sm:text-xs font-semibold rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer shadow-xs hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928]"
                  >
                    <mat-icon class="text-xs sm:text-sm">bolt</mat-icon>
                    <span class="truncate">Buy</span>
                  </button>
                </div>

              </div>
            </div>
          }
        </div>
      } @else {
        <!-- Empty State -->
        <div class="text-center py-16 px-4 bg-white rounded-2xl border border-[#E5DACF] max-w-lg mx-auto">
          <mat-icon class="text-5xl text-[#806345]/50 mb-3">search_off</mat-icon>
          <h3 class="font-serif text-2xl font-bold text-[#241B14] mb-2">No sneakers found</h3>
          <p class="text-sm text-[#4B3928]/80 mb-6">
            We couldn't find any footwear matching your current filters. Try changing your search query or category.
          </p>
          <button
            type="button"
            (click)="resetFilters()"
            class="px-6 py-2.5 bg-[#4B3928] text-white text-xs font-semibold rounded-full hover:bg-[#382B1E] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      }

    </section>
  `,
})
export class ProductCatalogComponent {
  readonly store = inject(StoreService);

  readonly categories = [
    'All',
    'Men',
    'Women',
    'Kids',
    'Running',
    'Lifestyle',
    'New Arrivals',
  ];

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.store.setSearch(val);
  }

  onSortChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value as
      | 'featured'
      | 'price-asc'
      | 'price-desc'
      | 'newest'
      | 'rating';
    this.store.setSort(val);
  }

  onAddToCart(product: Product): void {
    this.store.addToCart(product);
  }

  onBuyNow(product: Product): void {
    this.store.buyNow(product);
  }

  toggleWishlist(event: Event, productId: string): void {
    event.stopPropagation();
    this.store.toggleWishlist(productId);
  }

  resetFilters(): void {
    this.store.setCategory('All');
    this.store.setSearch('');
    this.store.setSort('featured');
  }
}
