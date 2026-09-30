import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
      @for (toast of store.toasts(); track toast.id) {
        <div
          class="pointer-events-auto bg-[#241B14] text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-start gap-3 transform transition-all duration-300 animate-slideUp"
        >
          <!-- Icon -->
          <div class="p-1 rounded-full shrink-0 mt-0.5"
            [class]="
              toast.type === 'cart'
                ? 'bg-[#E9DFD2] text-[#241B14]'
                : toast.type === 'success'
                ? 'bg-emerald-900 text-emerald-300'
                : 'bg-white/10 text-white'
            "
          >
            <mat-icon class="text-base">
              {{
                toast.type === 'cart'
                  ? 'shopping_bag'
                  : toast.type === 'success'
                  ? 'check_circle'
                  : 'info'
              }}
            </mat-icon>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h5 class="text-sm font-bold text-white">{{ toast.title }}</h5>
            @if (toast.subtitle) {
              <p class="text-xs text-[#E9DFD2]/80 mt-0.5 leading-relaxed">{{ toast.subtitle }}</p>
            }
          </div>

          <!-- Dismiss button -->
          <button
            type="button"
            (click)="store.dismissToast(toast.id)"
            class="text-[#E9DFD2]/60 hover:text-white transition-colors p-1"
            aria-label="Dismiss notification"
          >
            <mat-icon class="text-sm">close</mat-icon>
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  readonly store = inject(StoreService);
}
