import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

interface HeroSlide {
  tag: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  accent: string;
  badge: string;
}

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 sm:pb-16">
      <!-- Hero Banner Container with Warm Brown Aesthetic & Soft Rounded Corners -->
      <div class="relative overflow-hidden rounded-3xl bg-[#4B3928] text-[#F7F3ED] shadow-xl min-h-[540px] md:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between">
        
        <!-- Subtle Background Ambient Grain / Glow -->
        <div class="absolute inset-0 bg-gradient-to-tr from-[#382B1E] via-[#4B3928] to-[#674F37] opacity-95 pointer-events-none"></div>
        <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E9DFD2]/10 blur-3xl pointer-events-none"></div>

        <!-- Main Content Area: Split 2-Column on Desktop, Stacked on Mobile -->
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center p-6 sm:p-10 md:p-14 lg:p-16 flex-1">
          
          <!-- Left Column: Typography & CTAs -->
          <div class="lg:col-span-7 flex flex-col justify-center max-w-2xl">
            <!-- Seasonal Sub-badge -->
            <div class="inline-flex items-center gap-2 mb-4">
              <span class="h-1.5 w-1.5 rounded-full bg-[#E9DFD2]"></span>
              <span class="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#E9DFD2]/90">
                {{ currentSlide().tag }}
              </span>
              <span class="text-xs text-[#E9DFD2]/50">·</span>
              <span class="text-xs text-[#E9DFD2]/80 font-medium">Autumn/Winter Edition</span>
            </div>

            <!-- Main Heading (Bold Serif Editorial) -->
            <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-balance">
              {{ currentSlide().title }}
            </h1>

            <!-- Subheading -->
            <p class="text-base sm:text-lg md:text-xl text-[#E9DFD2]/90 font-normal leading-relaxed max-w-xl mb-8">
              {{ currentSlide().subtitle }}
            </p>

            <!-- Actions Row -->
            <div class="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                (click)="scrollToShop()"
                class="px-8 py-4 bg-[#F7F3ED] hover:bg-[#E9DFD2] text-[#241B14] font-semibold text-sm sm:text-base tracking-wide rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-md flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>SHOP NOW</span>
                <mat-icon class="text-lg group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
              </button>

              <button
                type="button"
                (click)="store.openBrandStory()"
                class="px-6 py-4 text-[#F7F3ED] hover:text-white font-medium text-sm tracking-wide transition-colors flex items-center gap-2 group cursor-pointer"
              >
                <span>Discover Craft</span>
                <mat-icon class="text-base text-[#E9DFD2]/70 group-hover:text-white transition-colors">east</mat-icon>
              </button>
            </div>

            <!-- Trust Marks -->
            <div class="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-[#E9DFD2]/70 font-medium">
              <div class="flex items-center gap-2">
                <mat-icon class="text-[#E9DFD2] text-sm sm:text-base">verified</mat-icon>
                <span>Handcrafted Materials</span>
              </div>
              <div class="flex items-center gap-2">
                <mat-icon class="text-[#E9DFD2] text-sm sm:text-base">autorenew</mat-icon>
                <span>Free 30-Day Returns</span>
              </div>
              <div class="flex items-center gap-2">
                <mat-icon class="text-[#E9DFD2] text-sm sm:text-base">eco</mat-icon>
                <span>Carbon Neutral</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Sneaker Visual & Floating Feature Card -->
          <div class="lg:col-span-5 relative flex justify-center items-center">
            <div class="relative w-full max-w-md lg:max-w-none">
              <!-- Rounded Image Frame -->
              <div class="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#382B1E]">
                <img
                  [src]="currentSlide().image"
                  [alt]="currentSlide().title"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <!-- Floating Spec Overlay Pill -->
                <div class="absolute bottom-4 left-4 right-4 bg-[#241B14]/85 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex items-center justify-between text-xs text-white">
                  <div>
                    <p class="font-semibold text-sm">{{ currentSlide().badge }}</p>
                    <p class="text-[#E9DFD2]/70 text-[11px]">Italian Suede · CloudForm™ Sole</p>
                  </div>
                  <button
                    type="button"
                    (click)="store.setCategory(currentSlide().category)"
                    class="bg-[#806345] hover:bg-[#A3805D] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  >
                    View Pair
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Slider Controls & Pagination Bar -->
        <div class="relative z-10 px-6 sm:px-10 lg:px-16 py-4 bg-[#382B1E]/60 backdrop-blur-xs border-t border-white/10 flex items-center justify-between">
          <!-- Slide Counter -->
          <div class="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-wider text-[#E9DFD2]">
            <span class="font-bold text-white text-base sm:text-lg">0{{ activeSlideIndex() + 1 }}</span>
            <span class="opacity-40">/</span>
            <span class="opacity-70">0{{ slides.length }}</span>
            <span class="ml-2 sm:ml-3 inline-block text-xs uppercase tracking-widest text-[#E9DFD2]/60">
              — {{ currentSlide().category }}
            </span>
          </div>

          <!-- Slide Dots & Arrows -->
          <div class="flex items-center gap-3 sm:gap-4">
            <!-- Navigation dots -->
            <div class="flex items-center gap-1.5">
              @for (slide of slides; track $index) {
                <button
                  type="button"
                  (click)="setSlide($index)"
                  [attr.aria-label]="'Go to slide ' + ($index + 1)"
                  class="h-2 rounded-full transition-all duration-300"
                  [class]="$index === activeSlideIndex() ? 'w-8 bg-[#E9DFD2]' : 'w-2 bg-white/30 hover:bg-white/50'"
                ></button>
              }
            </div>

            <div class="h-4 w-px bg-white/20 mx-1"></div>

            <!-- Previous Slide Button -->
            <button
              type="button"
              (click)="prevSlide()"
              class="w-8 h-8 rounded-full border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-colors"
              aria-label="Previous slide"
            >
              <mat-icon class="text-sm">chevron_left</mat-icon>
            </button>

            <!-- Next Slide Button -->
            <button
              type="button"
              (click)="nextSlide()"
              class="w-8 h-8 rounded-full border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-colors"
              aria-label="Next slide"
            >
              <mat-icon class="text-sm">chevron_right</mat-icon>
            </button>
          </div>
        </div>

      </div>
    </section>
  `,
})
export class HeroComponent {
  readonly store = inject(StoreService);

  readonly slides: HeroSlide[] = [
    {
      tag: 'NEW ARRIVAL 2026',
      title: 'STEP INTO YOUR EVERYDAY',
      subtitle:
        'Premium sneakers designed for comfort, confidence and everyday style. Built with buttery Italian suede and all-day cushioning.',
      category: 'Lifestyle',
      image: '/images/hero_sneaker_lifestyle_1790699402771.jpg',
      accent: '#E9DFD2',
      badge: 'Retro Edge & Aero Series',
    },
    {
      tag: 'HIGH-PERFORMANCE',
      title: 'ENGINEERED FOR NATURAL MOTION',
      subtitle:
        'Dual-density responsive foam meets dynamic carbon stability for runners who value effortless speed and comfort.',
      category: 'Running',
      image: '/images/category_running_sneaker_1790699422343.jpg',
      accent: '#806345',
      badge: 'Velocity Pro Edition',
    },
    {
      tag: 'METROPOLITAN LUXURY',
      title: 'TIMELESS FORM. MODERN COMFORT.',
      subtitle:
        'Clean silhouettes hand-crafted for the modern capsule wardrobe. Sculpted lines and breathable materials that mold to you.',
      category: 'Men',
      image: '/images/category_lifestyle_sneaker_1790699438751.jpg',
      accent: '#D6C5B3',
      badge: 'Urban Flex Atelier',
    },
  ];

  readonly activeSlideIndex = signal<number>(0);

  currentSlide = () => this.slides[this.activeSlideIndex()];

  nextSlide(): void {
    this.activeSlideIndex.update((curr) => (curr + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.activeSlideIndex.update((curr) => (curr - 1 + this.slides.length) % this.slides.length);
  }

  setSlide(index: number): void {
    this.activeSlideIndex.set(index);
  }

  scrollToShop(): void {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('collection-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
