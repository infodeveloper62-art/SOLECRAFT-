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
  selector: 'app-info-modals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- 1. Size & Fit Guide Modal -->
    @if (store.isSizeGuideOpen()) {
      <div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <button
          type="button"
          aria-label="Close size guide backdrop"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity w-full h-full cursor-default"
          (click)="store.closeSizeGuide()"
        ></button>
        <div class="flex min-h-full items-center justify-center p-2 sm:p-4">
          <div
            class="relative w-full max-w-2xl bg-[#F7F3ED] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-[#E5DACF] text-left"
          >
            <div class="flex items-center justify-between pb-4 border-b border-[#E5DACF] mb-6">
              <div>
                <h3 class="font-serif text-2xl font-bold text-[#241B14]">Size & Fit Guide</h3>
                <p class="text-xs text-[#806345]">All Solecraft sneakers fit true to standard athletic sizing.</p>
              </div>
              <button
                type="button"
                (click)="store.closeSizeGuide()"
                class="p-2 text-[#806345] hover:text-[#241B14] rounded-full hover:bg-[#E9DFD2]"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Table of sizes -->
            <div class="overflow-x-auto rounded-xl border border-[#E5DACF] bg-white mb-6">
              <table class="w-full text-left text-xs sm:text-sm">
                <thead class="bg-[#E9DFD2]/60 text-[#241B14] font-semibold">
                  <tr>
                    <th class="p-3">US Men</th>
                    <th class="p-3">US Women</th>
                    <th class="p-3">UK</th>
                    <th class="p-3">EU</th>
                    <th class="p-3">CM</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#E5DACF]/60 text-[#4B3928]">
                  <tr class="hover:bg-[#F7F3ED]">
                    <td class="p-3 font-bold text-[#241B14]">6.0</td>
                    <td class="p-3">7.5</td>
                    <td class="p-3">5.5</td>
                    <td class="p-3">38.5</td>
                    <td class="p-3 tabular-nums">24.0</td>
                  </tr>
                  <tr class="hover:bg-[#F7F3ED]">
                    <td class="p-3 font-bold text-[#241B14]">7.0</td>
                    <td class="p-3">8.5</td>
                    <td class="p-3">6.5</td>
                    <td class="p-3">40.0</td>
                    <td class="p-3 tabular-nums">25.0</td>
                  </tr>
                  <tr class="hover:bg-[#F7F3ED] bg-[#E9DFD2]/20">
                    <td class="p-3 font-bold text-[#241B14]">8.0</td>
                    <td class="p-3">9.5</td>
                    <td class="p-3">7.5</td>
                    <td class="p-3">41.0</td>
                    <td class="p-3 tabular-nums">26.0</td>
                  </tr>
                  <tr class="hover:bg-[#F7F3ED]">
                    <td class="p-3 font-bold text-[#241B14]">9.0</td>
                    <td class="p-3">10.5</td>
                    <td class="p-3">8.5</td>
                    <td class="p-3">42.5</td>
                    <td class="p-3 tabular-nums">27.0</td>
                  </tr>
                  <tr class="hover:bg-[#F7F3ED]">
                    <td class="p-3 font-bold text-[#241B14]">10.0</td>
                    <td class="p-3">11.5</td>
                    <td class="p-3">9.5</td>
                    <td class="p-3">44.0</td>
                    <td class="p-3 tabular-nums">28.0</td>
                  </tr>
                  <tr class="hover:bg-[#F7F3ED]">
                    <td class="p-3 font-bold text-[#241B14]">11.0</td>
                    <td class="p-3">12.5</td>
                    <td class="p-3">10.5</td>
                    <td class="p-3">45.0</td>
                    <td class="p-3 tabular-nums">29.0</td>
                  </tr>
                  <tr class="hover:bg-[#F7F3ED]">
                    <td class="p-3 font-bold text-[#241B14]">12.0</td>
                    <td class="p-3">13.5</td>
                    <td class="p-3">11.5</td>
                    <td class="p-3">46.5</td>
                    <td class="p-3 tabular-nums">30.0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Fit Notes -->
            <div class="bg-white p-4 rounded-xl border border-[#E5DACF] text-xs text-[#4B3928] space-y-1.5">
              <p><strong>Half sizes?</strong> We recommend sizing UP for lifestyle models, or standard for runners.</p>
              <p><strong>Wide feet?</strong> Our toe-boxes are ergonomically widened by 2.4mm for unrestricted natural splay.</p>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- 2. Brand Atelier Story Modal -->
    @if (store.isBrandStoryOpen()) {
      <div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <button
          type="button"
          aria-label="Close brand story backdrop"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity w-full h-full cursor-default"
          (click)="store.closeBrandStory()"
        ></button>
        <div class="flex min-h-full items-center justify-center p-2 sm:p-4">
          <div
            class="relative w-full max-w-3xl bg-[#F7F3ED] rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl border border-[#E5DACF] text-left"
          >
            <button
              type="button"
              (click)="store.closeBrandStory()"
              class="absolute top-5 right-5 p-2 text-[#806345] hover:text-[#241B14] rounded-full hover:bg-[#E9DFD2]"
            >
              <mat-icon>close</mat-icon>
            </button>

            <span class="text-xs font-bold uppercase tracking-widest text-[#806345] block mb-1">
              Atelier Manifesto
            </span>
            <h3 class="font-serif text-3xl font-bold text-[#241B14] mb-4">
              Crafting The Architecture of Motion
            </h3>

            <div class="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-[#E5DACF]">
              <img
                src="/images/craftsmanship_about_sneaker_1790699468947.jpg"
                alt="Solecraft Atelier"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="prose text-sm text-[#4B3928] leading-relaxed space-y-3 mb-6">
              <p>
                Founded in 2024 with studios between Milan and New York, SOLECRAFT was born from a singular conviction: luxury footwear shouldn't force a compromise between sculptural elegance and all-day biomechanical support.
              </p>
              <p>
                Every silhouette is constructed with hand-cut Italian suedes from certified gold-rated tanneries, paired with our proprietary CloudForm™ dual-density foam core. We reject mass obsolescence in favor of small, disciplined batch runs designed to last years, not weeks.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5DACF] text-center">
              <div>
                <p class="font-serif text-2xl font-bold text-[#241B14]">100%</p>
                <p class="text-xs text-[#806345]">Recycled Soles</p>
              </div>
              <div>
                <p class="font-serif text-2xl font-bold text-[#241B14]">42</p>
                <p class="text-xs text-[#806345]">Hand-Assembled Steps</p>
              </div>
              <div>
                <p class="font-serif text-2xl font-bold text-[#241B14]">30-Day</p>
                <p class="text-xs text-[#806345]">Wear Test Trial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- 3. Order Confirmed Success Modal -->
    @if (store.isOrderSuccessOpen() && store.lastOrder(); as order) {
      <div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <button
          type="button"
          aria-label="Close order receipt backdrop"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity w-full h-full cursor-default"
          (click)="store.closeOrderSuccess()"
        ></button>
        <div class="flex min-h-full items-center justify-center p-4">
          <div
            class="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E5DACF] text-center"
          >
            <!-- Checkmark badge -->
            <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
              <mat-icon class="text-3xl">check_circle</mat-icon>
            </div>

            <span class="text-xs font-bold uppercase tracking-widest text-[#806345] block mb-1">
              Order Receipt Confirmed
            </span>
            <h3 class="font-serif text-2xl sm:text-3xl font-bold text-[#241B14] mb-2">
              Thank You For Your Order!
            </h3>
            <p class="text-xs sm:text-sm text-[#4B3928] mb-6">
              Your handcrafted pair is being prepared at our atelier. A confirmation dispatch has been sent to
              <strong class="text-[#241B14]">{{ order.customer.email }}</strong>.
            </p>

            <!-- Order Specs Box -->
            <div class="bg-[#F7F3ED] rounded-2xl p-4 sm:p-5 text-left border border-[#E5DACF] space-y-3 mb-6">
              <div class="flex justify-between text-xs pb-2 border-b border-[#E5DACF]">
                <span class="text-[#806345]">Order Number</span>
                <span class="font-mono font-bold text-[#241B14]">{{ order.orderId }}</span>
              </div>
              <div class="flex justify-between text-xs pb-2 border-b border-[#E5DACF]">
                <span class="text-[#806345]">Delivery Address</span>
                <span class="font-medium text-[#241B14] text-right">{{ order.customer.address }}, {{ order.customer.city }}</span>
              </div>
              <div class="flex justify-between text-xs pb-2 border-b border-[#E5DACF]">
                <span class="text-[#806345]">Estimated Arrival</span>
                <span class="font-medium text-[#241B14]">{{ order.estimatedDelivery }}</span>
              </div>
              <div class="flex justify-between text-sm font-bold pt-1 text-[#241B14]">
                <span>Total Amount Paid</span>
                <span class="font-serif tabular-nums">\${{ order.total.toFixed(2) }}</span>
              </div>
            </div>

            <button
              type="button"
              (click)="store.closeOrderSuccess()"
              class="w-full py-4 bg-[#4B3928] hover:bg-[#382B1E] text-white font-semibold text-sm rounded-xl transition-all shadow-md cursor-pointer"
            >
              Continue Exploring Solecraft
            </button>
          </div>
        </div>
      </div>
    }

    <!-- 4. Scroll To Top Floating Button -->
    @if (showScrollTop()) {
      <button
        type="button"
        (click)="scrollToTop()"
        class="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-[#4B3928] text-white shadow-xl hover:bg-[#382B1E] flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 focus:outline-none"
        aria-label="Scroll back to top"
      >
        <mat-icon>arrow_upward</mat-icon>
      </button>
    }
  `,
})
export class InfoModalsComponent {
  readonly store = inject(StoreService);
  readonly showScrollTop = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (typeof window !== 'undefined') {
      this.showScrollTop.set(window.scrollY > 400);
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
