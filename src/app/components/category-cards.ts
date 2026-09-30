import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

interface CategoryCardItem {
  id: string;
  title: string;
  subtitle: string;
  categoryFilter: string;
  image: string;
  itemCount: string;
}

@Component({
  selector: 'app-category-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span class="text-xs font-semibold tracking-widest uppercase text-[#806345]">
            Curated Disciplines
          </span>
          <h2 class="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#241B14] mt-1">
            Explore Categories
          </h2>
        </div>
        <p class="text-sm text-[#4B3928]/70 max-w-md">
          Distinctive footwear engineered with precision geometry, tailored for athletic performance and daily urban style.
        </p>
      </div>

      <!-- 3-Column Category Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        @for (item of categoryCards; track item.id) {
          <button
            type="button"
            (click)="selectCategory(item.categoryFilter)"
            class="text-left w-full group relative overflow-hidden rounded-2xl cursor-pointer bg-[#241B14] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-end min-h-[260px] sm:min-h-[380px] lg:min-h-[420px] p-5 sm:p-7 lg:p-8"
          >
            <!-- Background Image with Hover Zoom -->
            <img
              [src]="item.image"
              [alt]="item.title"
              referrerpolicy="no-referrer"
              class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            <!-- Gradient Scrim for WCAG AA readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#241B14] via-[#241B14]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity"></div>

            <!-- Card Content Over Image -->
            <div class="relative z-10 flex flex-col">
              <!-- Item Count Indicator -->
              <div class="flex items-center justify-between text-xs text-[#E9DFD2]/80 uppercase tracking-widest font-semibold mb-2">
                <span>{{ item.itemCount }}</span>
                <span class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#806345] group-hover:translate-x-1 transition-all">
                  <mat-icon class="text-sm">arrow_forward</mat-icon>
                </span>
              </div>

              <!-- Category Title (Large Bold Serif) -->
              <h3 class="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mb-2 group-hover:text-[#E9DFD2] transition-colors">
                {{ item.title }}
              </h3>

              <!-- Category Subtitle -->
              <p class="text-sm text-[#E9DFD2]/80 font-normal leading-relaxed mb-4">
                {{ item.subtitle }}
              </p>

              <!-- Clean Link Action -->
              <div class="inline-flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider">
                <span>Shop Category</span>
                <span class="h-0.5 w-6 bg-[#E9DFD2] group-hover:w-10 transition-all duration-300"></span>
              </div>
            </div>
          </button>
        }
      </div>
    </section>
  `,
})
export class CategoryCardsComponent {
  readonly store = inject(StoreService);

  readonly categoryCards: CategoryCardItem[] = [
    {
      id: 'running',
      title: 'RUNNING',
      subtitle: 'Performance sneakers built for every move.',
      categoryFilter: 'Running',
      image: '/images/category_running_sneaker_1790699422343.jpg',
      itemCount: 'Collection · 01',
    },
    {
      id: 'lifestyle',
      title: 'LIFESTYLE',
      subtitle: 'Everyday sneakers made for modern style.',
      categoryFilter: 'Lifestyle',
      image: '/images/category_lifestyle_sneaker_1790699438751.jpg',
      itemCount: 'Collection · 02',
    },
    {
      id: 'new-arrivals',
      title: 'NEW ARRIVALS',
      subtitle: 'Fresh designs. New energy.',
      categoryFilter: 'New Arrivals',
      image: '/images/category_new_arrivals_1790699454744.jpg',
      itemCount: 'Collection · 03',
    },
  ];

  selectCategory(filter: string): void {
    this.store.setCategory(filter);
  }
}
