import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-about-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div class="bg-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#E5DACF] shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- Left Column: Story & Principles (lg:col-span-6) -->
          <div class="lg:col-span-6 flex flex-col justify-center">
            <span class="text-xs font-bold tracking-[0.25em] uppercase text-[#806345] mb-2">
              Our Design Philosophy
            </span>
            
            <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241B14] mb-6 leading-tight text-balance">
              BUILT FOR EVERY STEP
            </h2>

            <p class="text-base sm:text-lg text-[#4B3928] leading-relaxed mb-8 font-normal">
              SOLECRAFT brings together modern design, everyday comfort and premium craftsmanship to create sneakers made for real life.
            </p>

            <!-- 3 Pillars of Excellence -->
            <div class="space-y-4 mb-8">
              <div class="flex items-start gap-3.5">
                <div class="w-9 h-9 rounded-xl bg-[#E9DFD2] flex items-center justify-center text-[#4B3928] shrink-0 mt-0.5">
                  <mat-icon class="text-lg">architecture</mat-icon>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-[#241B14]">Sculptural Modern Geometry</h4>
                  <p class="text-xs text-[#806345] leading-normal">
                    Precision-contoured lasts tailored for all-day comfort without sacrificing contemporary silhouette lines.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3.5">
                <div class="w-9 h-9 rounded-xl bg-[#E9DFD2] flex items-center justify-center text-[#4B3928] shrink-0 mt-0.5">
                  <mat-icon class="text-lg">waves</mat-icon>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-[#241B14]">Proprietary CloudForm™ Sole</h4>
                  <p class="text-xs text-[#806345] leading-normal">
                    Dual-density nitrogen foam provides optimal rebound and reduces joint impact across 20,000 steps daily.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3.5">
                <div class="w-9 h-9 rounded-xl bg-[#E9DFD2] flex items-center justify-center text-[#4B3928] shrink-0 mt-0.5">
                  <mat-icon class="text-lg">eco</mat-icon>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-[#241B14]">Responsible Atelier Sourcing</h4>
                  <p class="text-xs text-[#806345] leading-normal">
                    Gold-certified tannery leather, recycled ocean poly mesh, and vulcanized gum rubber outsoles.
                  </p>
                </div>
              </div>
            </div>

            <!-- Learn More CTA -->
            <div>
              <button
                type="button"
                (click)="store.openBrandStory()"
                class="w-full sm:w-auto justify-center px-8 py-3.5 bg-[#4B3928] hover:bg-[#382B1E] text-white text-xs sm:text-sm font-semibold tracking-wider rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm inline-flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928]"
              >
                <span>LEARN MORE</span>
                <mat-icon class="text-base">arrow_forward</mat-icon>
              </button>
            </div>
          </div>

          <!-- Right Column: Lifestyle Craftsmanship Imagery (lg:col-span-6) -->
          <div class="lg:col-span-6">
            <div class="relative rounded-2xl overflow-hidden shadow-lg border border-[#E5DACF] bg-[#F7F3ED] aspect-[4/3] group">
              <img
                src="/images/craftsmanship_about_sneaker_1790699468947.jpg"
                alt="SOLECRAFT sneaker craftsmanship workshop"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <!-- Subtle Floating Tag -->
              <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E5DACF] shadow-sm">
                <p class="font-serif text-xs font-bold text-[#241B14]">Solecraft Atelier Workshop</p>
                <p class="text-[11px] text-[#806345]">Handcrafted in small disciplined batches</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class AboutSectionComponent {
  readonly store = inject(StoreService);
}
