import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="bg-[#241B14] text-[#F7F3ED] pt-16 pb-12 border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- 2-Column Mobile & Tablet, 4-Column Desktop Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pb-10 sm:pb-14 border-b border-white/10">
          
          <!-- Column 1: Brand & Ethos (Full width top on mobile, 1 col on desktop) -->
          <div class="col-span-2 lg:col-span-1 flex flex-col">
            <span class="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              SOLECRAFT
            </span>
            <p class="font-serif italic text-xs sm:text-sm text-[#E9DFD2] mb-3 sm:mb-4">
              "Step into your style."
            </p>
            <p class="text-xs text-[#E9DFD2]/70 leading-relaxed max-w-sm mb-5 sm:mb-6">
              Modern footwear sculpted for everyday movement. Sourced with architectural precision, premium leathers, and dual-density comfort.
            </p>
            <div class="flex items-center gap-2 text-xs text-[#E9DFD2]/80">
              <mat-icon class="text-sm text-[#E9DFD2]">place</mat-icon>
              <span>Atelier Studio: New York · Milan · Tokyo</span>
            </div>
          </div>

          <!-- Column 2: SHOP -->
          <div class="col-span-1">
            <h4 class="font-serif text-sm font-bold tracking-widest uppercase text-white mb-4">
              SHOP
            </h4>
            <ul class="space-y-2.5 text-xs sm:text-sm text-[#E9DFD2]/80">
              <li>
                <button
                  type="button"
                  (click)="filterAndScroll('Men')"
                  class="hover:text-white transition-colors cursor-pointer"
                >
                  Men
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="filterAndScroll('Women')"
                  class="hover:text-white transition-colors cursor-pointer"
                >
                  Women
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="filterAndScroll('Kids')"
                  class="hover:text-white transition-colors cursor-pointer"
                >
                  Kids
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="filterAndScroll('New Arrivals')"
                  class="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="filterAndScroll('All')"
                  class="hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          <!-- Column 3: HELP -->
          <div class="col-span-1">
            <h4 class="font-serif text-sm font-bold tracking-widest uppercase text-white mb-4">
              HELP
            </h4>
            <ul class="space-y-2.5 text-xs sm:text-sm text-[#E9DFD2]/80">
              <li>
                <button
                  type="button"
                  (click)="openSupport('Contact Concierge: concierge@solecraft.com or +1 (800) 555-SOLE (24/7)')"
                  class="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="openSupport('Free express tracked delivery on all orders over $120. Standard delivery 2-4 business days.')"
                  class="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="openSupport('30-Day trial on all footwear. Free prepaid return shipping label included in every box.')"
                  class="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="openSupport('Frequently Asked Questions: All Solecraft sneakers fit true to standard US sizing with natural arch cradling.')"
                  class="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  (click)="store.openSizeGuide()"
                  class="hover:text-white transition-colors cursor-pointer text-left underline underline-offset-4"
                >
                  Size & Fit Guide
                </button>
              </li>
            </ul>
          </div>

          <!-- Column 4: FOLLOW US -->
          <div class="col-span-2 lg:col-span-1">
            <h4 class="font-serif text-sm font-bold tracking-widest uppercase text-white mb-4">
              FOLLOW US
            </h4>
            <ul class="space-y-2.5 text-xs sm:text-sm text-[#E9DFD2]/80 mb-6">
              <li>
                <a
                  href="#instagram"
                  (click)="$event.preventDefault(); showSocialToast('Instagram')"
                  class="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>Instagram</span>
                  <span class="text-[10px] text-[#E9DFD2]/40">@solecraft.atelier</span>
                </a>
              </li>
              <li>
                <a
                  href="#facebook"
                  (click)="$event.preventDefault(); showSocialToast('Facebook')"
                  class="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>Facebook</span>
                  <span class="text-[10px] text-[#E9DFD2]/40">/solecraftofficial</span>
                </a>
              </li>
              <li>
                <a
                  href="#tiktok"
                  (click)="$event.preventDefault(); showSocialToast('TikTok')"
                  class="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>TikTok</span>
                  <span class="text-[10px] text-[#E9DFD2]/40">@solecraftdrops</span>
                </a>
              </li>
              <li>
                <a
                  href="#pinterest"
                  (click)="$event.preventDefault(); showSocialToast('Pinterest')"
                  class="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>Pinterest</span>
                  <span class="text-[10px] text-[#E9DFD2]/40">/solecraftmood</span>
                </a>
              </li>
            </ul>

            <!-- Secure Payment Badges -->
            <div class="pt-4 border-t border-white/10">
              <p class="text-[11px] text-[#E9DFD2]/60 uppercase tracking-wider mb-2 font-semibold">
                Accepted Payments
              </p>
              <div class="flex items-center gap-2 text-xs text-[#E9DFD2]/80 font-mono">
                <span class="bg-white/10 px-2 py-1 rounded">VISA</span>
                <span class="bg-white/10 px-2 py-1 rounded">MC</span>
                <span class="bg-white/10 px-2 py-1 rounded">AMEX</span>
                <span class="bg-white/10 px-2 py-1 rounded">PAYPAL</span>
                <span class="bg-white/10 px-2 py-1 rounded">COD</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Row: Copyright & Disclaimers -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E9DFD2]/60 gap-4 text-center sm:text-left">
          <p>© 2026 SOLECRAFT. All Rights Reserved.</p>
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6">
            <button
              type="button"
              (click)="openSupport('Privacy Policy: Solecraft protects your data with strict 256-bit encryption and never sells client information.')"
              class="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              (click)="openSupport('Terms of Service: All orders fulfilled with carbon-neutral transit and 30-day trial guarantees.')"
              class="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              type="button"
              (click)="openSupport('Accessibility: Solecraft is committed to digital accessibility adhering to WCAG standards.')"
              class="hover:text-white transition-colors"
            >
              Accessibility
            </button>
          </div>
        </div>

      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly store = inject(StoreService);

  filterAndScroll(category: string): void {
    this.store.setCategory(category);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('collection-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  openSupport(msg: string): void {
    this.store.showToast('Solecraft Concierge', msg, 'info');
  }

  showSocialToast(platform: string): void {
    this.store.showToast(
      `${platform} Connected`,
      `Join the private Solecraft drop community on ${platform}.`,
      'info'
    );
  }
}
