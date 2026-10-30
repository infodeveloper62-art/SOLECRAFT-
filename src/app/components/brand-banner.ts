import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-brand-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Wide Premium Promotional Banner with Warm Brown / Rich Tone Palette -->
      <div class="relative overflow-hidden rounded-3xl bg-[#241B14] text-white shadow-xl min-h-[320px] sm:min-h-[380px] flex items-center justify-between p-6 sm:p-12 lg:p-16">
        
        <!-- Background Imagery Scrim -->
        <img
          src="/images/hero_sneaker_lifestyle_1790699402771.jpg"
          alt="SOLECRAFT sneaker in motion"
          referrerpolicy="no-referrer"
          class="absolute inset-0 w-full h-full object-cover object-center opacity-30 transform hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#241B14] via-[#241B14]/90 to-[#4B3928]/60"></div>

        <!-- Banner Content -->
        <div class="relative z-10 max-w-xl">
          <span class="text-xs font-bold tracking-[0.28em] uppercase text-[#E9DFD2] mb-3 inline-block">
            Limited Production Series
          </span>
          
          <h2 class="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4 text-balance">
            FIND YOUR NEXT FAVORITE PAIR
          </h2>

          <p class="text-xs sm:text-lg text-[#E9DFD2]/90 font-normal mb-6 sm:mb-8 leading-relaxed">
            Designed to move with you. Crafted with cloud-soft cushioning and architectural elegance for all walks of life.
          </p>

          <button
            type="button"
            (click)="scrollToCollection()"
            class="w-full sm:w-auto justify-center px-8 py-3.5 sm:py-4 bg-[#E9DFD2] hover:bg-white text-[#241B14] font-semibold text-xs sm:text-sm tracking-widest uppercase rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>EXPLORE COLLECTION</span>
            <mat-icon class="text-base">arrow_forward</mat-icon>
          </button>
        </div>

        <!-- Right Side Architectural Iconography -->
        <div class="relative z-10 hidden lg:flex flex-col items-end gap-3 text-right">
          <span class="font-serif text-6xl font-bold text-white/10 tracking-widest select-none">
            2026
          </span>
          <div class="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs text-[#E9DFD2]">
            <span>Next Drop in: <strong>4 Days</strong></span>
          </div>
        </div>

      </div>
    </section>
  `,
})
export class BrandBannerComponent {
  readonly store = inject(StoreService);

  scrollToCollection(): void {
    this.store.setCategory('All');
    if (typeof window !== 'undefined') {
      const el = document.getElementById('collection-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
