import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-newsletter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div class="relative overflow-hidden rounded-3xl bg-[#E9DFD2] p-6 sm:p-12 lg:p-16 border border-[#E5DACF] text-center max-w-4xl mx-auto">
        
        <!-- Subtle Corner Emblem -->
        <div class="w-12 h-12 rounded-full bg-[#4B3928]/10 mx-auto flex items-center justify-center text-[#4B3928] mb-4">
          <mat-icon>mail_outline</mat-icon>
        </div>

        <span class="text-xs font-bold tracking-[0.25em] uppercase text-[#806345] mb-2 block">
          Private Client Dispatch
        </span>

        <h2 class="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241B14] mb-3">
          STAY IN THE LOOP
        </h2>

        <p class="text-xs sm:text-base text-[#4B3928] max-w-lg mx-auto mb-6 sm:mb-8 leading-relaxed">
          Get early access to new drops, exclusive offers and sneaker news.
        </p>

        <!-- Form -->
        @if (subscribed()) {
          <div class="bg-white p-6 rounded-2xl border border-emerald-300 max-w-md mx-auto animate-fadeIn">
            <mat-icon class="text-3xl text-emerald-600 mb-1">check_circle</mat-icon>
            <h4 class="font-serif text-lg font-bold text-[#241B14]">Welcome to Solecraft Atelier</h4>
            <p class="text-xs text-[#806345] mt-1">
              You're on the priority list. Use code <strong class="text-[#4B3928] font-mono text-sm">ATELIER10</strong> for 10% off your first pair.
            </p>
          </div>
        } @else {
          <form (submit)="onSubscribe($event)" class="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div class="relative flex-1">
              <input
                type="email"
                [formControl]="emailControl"
                placeholder="Enter your email"
                class="w-full px-4 py-3.5 bg-white border border-[#E5DACF] rounded-xl text-sm text-[#241B14] placeholder-[#806345]/70 focus:outline-none focus:border-[#4B3928] focus:ring-1 focus:ring-[#4B3928] shadow-xs"
              />
              @if (emailControl.touched && emailControl.invalid) {
                <span class="text-xs text-red-600 mt-1 block text-left">Please enter a valid email</span>
              }
            </div>

            <button
              type="submit"
              [disabled]="emailControl.invalid && emailControl.touched"
              class="w-full sm:w-auto px-8 py-3.5 bg-[#4B3928] hover:bg-[#382B1E] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm tracking-widest uppercase rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0 justify-center flex items-center"
            >
              SUBSCRIBE
            </button>
          </form>
          <p class="text-[11px] text-[#806345] mt-3">
            No spam, ever. Unsubscribe at any time with one click.
          </p>
        }

      </div>
    </section>
  `,
})
export class NewsletterComponent {
  readonly store = inject(StoreService);
  readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  readonly subscribed = signal<boolean>(false);

  onSubscribe(e: Event): void {
    e.preventDefault();
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }
    this.subscribed.set(true);
    this.store.showToast('Subscription confirmed!', 'Use code ATELIER10 for 10% off.', 'success');
  }
}
