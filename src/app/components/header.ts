import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Top Announcement Bar -->
    <div class="bg-[#241B14] text-[#E9DFD2] text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 truncate">
      <span class="truncate">Complimentary Worldwide Delivery over $120</span>
      <span class="opacity-50">·</span>
      <button
        type="button"
        class="underline underline-offset-4 cursor-pointer hover:text-white transition-colors shrink-0 font-semibold"
        (click)="store.openSizeGuide()"
      >
        Size Guide
      </button>
    </div>

    <!-- Main Navigation Header -->
    <header
      class="sticky top-0 z-40 transition-all duration-300 w-full"
      [class]="
        isScrolled()
          ? 'bg-[#F7F3ED]/95 backdrop-blur-md shadow-sm border-b border-[#E5DACF]/80 py-2.5 sm:py-3.5'
          : 'bg-[#F7F3ED] border-b border-[#E5DACF]/50 py-3 sm:py-5'
      "
    >
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between gap-2 sm:gap-4">
          <!-- Mobile Menu Button (Left on mobile) -->
          <div class="flex items-center lg:hidden">
            <button
              type="button"
              (click)="store.toggleMobileMenu(true)"
              class="p-1.5 sm:p-2 -ml-1 text-[#241B14] hover:text-[#4B3928] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928] rounded-lg"
              aria-label="Open navigation menu"
            >
              <mat-icon class="text-xl sm:text-2xl">menu</mat-icon>
            </button>
          </div>

          <!-- Brand Logo (Left) -->
          <div class="flex items-center shrink-0">
            <a
              href="#"
              (click)="$event.preventDefault(); onLogoClick()"
              class="group flex flex-col items-start cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928]"
            >
              <span class="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#241B14] group-hover:text-[#4B3928] transition-colors">
                SOLECRAFT
              </span>
              <span class="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.28em] uppercase text-[#806345] font-semibold">
                Footwear Ateliers
              </span>
            </a>
          </div>

          <!-- Center Navigation Links (Desktop) -->
          <nav class="hidden lg:flex items-center gap-8 xl:gap-10">
            <button
              type="button"
              (click)="navigateCategory('Men')"
              class="text-sm font-medium transition-colors hover:text-[#4B3928] pb-1 relative cursor-pointer"
              [class]="store.activeCategory() === 'Men' ? 'text-[#241B14] font-semibold border-b-2 border-[#4B3928]' : 'text-[#4B3928]/80'"
            >
              Men
            </button>
            <button
              type="button"
              (click)="navigateCategory('Women')"
              class="text-sm font-medium transition-colors hover:text-[#4B3928] pb-1 relative cursor-pointer"
              [class]="store.activeCategory() === 'Women' ? 'text-[#241B14] font-semibold border-b-2 border-[#4B3928]' : 'text-[#4B3928]/80'"
            >
              Women
            </button>
            <button
              type="button"
              (click)="navigateCategory('Kids')"
              class="text-sm font-medium transition-colors hover:text-[#4B3928] pb-1 relative cursor-pointer"
              [class]="store.activeCategory() === 'Kids' ? 'text-[#241B14] font-semibold border-b-2 border-[#4B3928]' : 'text-[#4B3928]/80'"
            >
              Kids
            </button>
            <button
              type="button"
              (click)="navigateCategory('Running')"
              class="text-sm font-medium transition-colors hover:text-[#4B3928] pb-1 relative cursor-pointer"
              [class]="store.activeCategory() === 'Running' ? 'text-[#241B14] font-semibold border-b-2 border-[#4B3928]' : 'text-[#4B3928]/80'"
            >
              Running
            </button>
            <button
              type="button"
              (click)="navigateCategory('New Arrivals')"
              class="text-sm font-medium transition-colors hover:text-[#4B3928] pb-1 relative cursor-pointer"
              [class]="store.activeCategory() === 'New Arrivals' ? 'text-[#241B14] font-semibold border-b-2 border-[#4B3928]' : 'text-[#4B3928]/80'"
            >
              Collections
            </button>
            <button
              type="button"
              (click)="store.openBrandStory()"
              class="text-sm font-medium transition-colors text-[#4B3928]/80 hover:text-[#4B3928] pb-1 cursor-pointer"
            >
              Craftsmanship
            </button>
          </nav>

          <!-- Right Actions -->
          <div class="flex items-center gap-1 sm:gap-3">
            <!-- Search trigger -->
            <button
              type="button"
              (click)="store.toggleSearch()"
              class="p-1.5 sm:p-2 text-[#241B14] hover:text-[#4B3928] hover:bg-[#E9DFD2]/40 rounded-full transition-colors relative cursor-pointer"
              aria-label="Search sneakers"
              title="Search products"
            >
              <mat-icon class="text-lg sm:text-xl">search</mat-icon>
            </button>

            <!-- Account modal / info (Desktop & Tablet) -->
            <button
              type="button"
              (click)="openAccountInfo()"
              class="hidden sm:inline-flex p-1.5 sm:p-2 text-[#241B14] hover:text-[#4B3928] hover:bg-[#E9DFD2]/40 rounded-full transition-colors relative cursor-pointer"
              aria-label="Customer Account"
              title="Member Account"
            >
              <mat-icon class="text-lg sm:text-xl">person_outline</mat-icon>
            </button>

            <!-- Wishlist Heart with count -->
            <button
              type="button"
              (click)="store.openWishlist()"
              class="p-1.5 sm:p-2 text-[#241B14] hover:text-[#4B3928] hover:bg-[#E9DFD2]/40 rounded-full transition-colors relative cursor-pointer"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <mat-icon class="text-lg sm:text-xl">favorite_border</mat-icon>
              @if (store.wishlistCount() > 0) {
                <span class="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-[#806345] text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center tabular-nums">
                  {{ store.wishlistCount() }}
                </span>
              }
            </button>

            <!-- Shopping Bag Cart with count -->
            <button
              type="button"
              (click)="store.openCart()"
              class="p-2 text-[#241B14] hover:text-[#4B3928] hover:bg-[#E9DFD2]/40 rounded-full transition-colors relative"
              aria-label="Shopping Cart"
              title="View Shopping Bag"
            >
              <mat-icon class="text-xl">shopping_bag</mat-icon>
              @if (store.cartCount() > 0) {
                <span class="absolute top-1 right-1 bg-[#4B3928] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {{ store.cartCount() }}
                </span>
              }
            </button>
          </div>
        </div>

        <!-- Inline Quick Search Bar (When opened) -->
        @if (store.isSearchOpen()) {
          <div class="mt-4 pt-3 border-t border-[#E5DACF] flex items-center gap-3 animate-fadeIn">
            <mat-icon class="text-[#806345]">search</mat-icon>
            <input
              type="text"
              #searchInput
              [value]="store.searchQuery()"
              (input)="onSearchInput($event)"
              placeholder="Search by name, category, or style (e.g., Aero Runner, Lifestyle, Men)..."
              class="w-full bg-transparent text-sm text-[#241B14] placeholder-[#806345]/70 focus:outline-none py-1.5"
            />
            @if (store.searchQuery()) {
              <button
                type="button"
                (click)="store.setSearch('')"
                class="text-xs text-[#806345] hover:text-[#241B14] font-medium px-2 py-1"
              >
                Clear
              </button>
            }
            <button
              type="button"
              (click)="store.toggleSearch(false)"
              class="text-xs text-[#4B3928] hover:underline font-semibold"
            >
              Done
            </button>
          </div>
        }
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
    @if (store.isMobileMenuOpen()) {
      <div class="fixed inset-0 z-50 flex lg:hidden">
        <!-- Backdrop -->
        <button
          type="button"
          aria-label="Close mobile navigation"
          class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity w-full h-full cursor-default"
          (click)="store.toggleMobileMenu(false)"
        ></button>

        <!-- Drawer Content -->
        <div class="relative w-4/5 max-w-sm bg-[#F7F3ED] h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto">
          <div class="flex items-center justify-between pb-4 border-b border-[#E5DACF]">
            <span class="font-serif text-2xl font-bold tracking-tight text-[#241B14]">
              SOLECRAFT
            </span>
            <button
              type="button"
              (click)="store.toggleMobileMenu(false)"
              class="p-2 text-[#241B14] hover:bg-[#E9DFD2] rounded-full"
              aria-label="Close menu"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <!-- Mobile Search -->
          <div class="my-5">
            <div class="flex items-center gap-2 bg-[#E9DFD2]/60 rounded-xl px-3 py-2">
              <mat-icon class="text-sm text-[#806345]">search</mat-icon>
              <input
                type="text"
                [value]="store.searchQuery()"
                (input)="onSearchInput($event)"
                placeholder="Search sneakers..."
                class="w-full bg-transparent text-sm text-[#241B14] placeholder-[#806345]/70 focus:outline-none"
              />
            </div>
          </div>

          <!-- Mobile Nav Items -->
          <div class="flex flex-col gap-2 py-2">
            <button
              type="button"
              (click)="navigateCategoryMobile('All')"
              class="text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              [class]="store.activeCategory() === 'All' ? 'bg-[#E9DFD2] text-[#241B14] font-semibold' : 'text-[#4B3928] hover:bg-[#E9DFD2]/40'"
            >
              All Sneakers
            </button>
            <button
              type="button"
              (click)="navigateCategoryMobile('Men')"
              class="text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              [class]="store.activeCategory() === 'Men' ? 'bg-[#E9DFD2] text-[#241B14] font-semibold' : 'text-[#4B3928] hover:bg-[#E9DFD2]/40'"
            >
              Men's Collection
            </button>
            <button
              type="button"
              (click)="navigateCategoryMobile('Women')"
              class="text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              [class]="store.activeCategory() === 'Women' ? 'bg-[#E9DFD2] text-[#241B14] font-semibold' : 'text-[#4B3928] hover:bg-[#E9DFD2]/40'"
            >
              Women's Collection
            </button>
            <button
              type="button"
              (click)="navigateCategoryMobile('Kids')"
              class="text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              [class]="store.activeCategory() === 'Kids' ? 'bg-[#E9DFD2] text-[#241B14] font-semibold' : 'text-[#4B3928] hover:bg-[#E9DFD2]/40'"
            >
              Kids Sneakers
            </button>
            <button
              type="button"
              (click)="navigateCategoryMobile('Running')"
              class="text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              [class]="store.activeCategory() === 'Running' ? 'bg-[#E9DFD2] text-[#241B14] font-semibold' : 'text-[#4B3928] hover:bg-[#E9DFD2]/40'"
            >
              Running & Performance
            </button>
            <button
              type="button"
              (click)="navigateCategoryMobile('Lifestyle')"
              class="text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              [class]="store.activeCategory() === 'Lifestyle' ? 'bg-[#E9DFD2] text-[#241B14] font-semibold' : 'text-[#4B3928] hover:bg-[#E9DFD2]/40'"
            >
              Lifestyle Classics
            </button>
            <button
              type="button"
              (click)="navigateCategoryMobile('New Arrivals')"
              class="text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              [class]="store.activeCategory() === 'New Arrivals' ? 'bg-[#E9DFD2] text-[#241B14] font-semibold' : 'text-[#4B3928] hover:bg-[#E9DFD2]/40'"
            >
              New Drops 🔥
            </button>
          </div>

          <div class="mt-auto pt-6 border-t border-[#E5DACF] flex flex-col gap-3">
            <button
              type="button"
              (click)="store.toggleMobileMenu(false); store.openBrandStory()"
              class="flex items-center gap-3 text-sm text-[#4B3928] py-2 hover:text-[#241B14]"
            >
              <mat-icon class="text-lg">handyman</mat-icon>
              <span>Our Craftsmanship Atelier</span>
            </button>
            <button
              type="button"
              (click)="store.toggleMobileMenu(false); store.openSizeGuide()"
              class="flex items-center gap-3 text-sm text-[#4B3928] py-2 hover:text-[#241B14]"
            >
              <mat-icon class="text-lg">straighten</mat-icon>
              <span>Size & Fit Guide</span>
            </button>
            <button
              type="button"
              (click)="store.toggleMobileMenu(false); store.openWishlist()"
              class="flex items-center justify-between text-sm text-[#4B3928] py-2 hover:text-[#241B14]"
            >
              <div class="flex items-center gap-3">
                <mat-icon class="text-lg">favorite_border</mat-icon>
                <span>Saved Wishlist</span>
              </div>
              <span class="text-xs bg-[#806345] text-white px-2 py-0.5 rounded-full">
                {{ store.wishlistCount() }}
              </span>
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class HeaderComponent {
  readonly store = inject(StoreService);
  readonly isScrolled = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 25);
    }
  }

  onLogoClick(): void {
    this.store.setCategory('All');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navigateCategory(category: string): void {
    this.store.setCategory(category);
  }

  navigateCategoryMobile(category: string): void {
    this.store.setCategory(category);
    this.store.toggleMobileMenu(false);
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.store.setSearch(val);
  }

  openAccountInfo(): void {
    this.store.showToast(
      'Solecraft Member Club',
      'You have VIP complimentary shipping on all footwear orders.',
      'info'
    );
  }
}
