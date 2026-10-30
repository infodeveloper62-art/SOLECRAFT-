import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CheckoutData } from '../models';
import { StoreService } from '../services/store';

@Component({
  selector: 'app-checkout-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    @if (store.isCheckoutOpen()) {
      <div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <button
          type="button"
          aria-label="Close checkout backdrop"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity w-full h-full cursor-default"
          (click)="store.closeCheckout()"
        ></button>

        <!-- Checkout Dialog -->
        <div class="flex min-h-full items-center justify-center p-2 sm:p-6 text-center">
          <div
            class="relative w-full max-w-5xl transform overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F7F3ED] text-left align-middle shadow-2xl transition-all border border-[#E5DACF]"
          >
            <!-- Checkout Header -->
            <div class="p-4 sm:p-6 bg-white border-b border-[#E5DACF] flex items-center justify-between">
              <div class="flex items-center gap-2 sm:gap-3">
                <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#241B14]">
                  SOLECRAFT
                </span>
                <span class="text-xs text-[#806345]/50">|</span>
                <span class="text-xs font-semibold uppercase tracking-wider text-[#806345]">
                  Secure Checkout
                </span>
              </div>

              <button
                type="button"
                (click)="store.closeCheckout()"
                class="p-2 text-[#806345] hover:text-[#241B14] rounded-full hover:bg-[#F7F3ED]"
                aria-label="Close checkout"
              >
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- 2-Column Checkout Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-12">
              
              <!-- Left: Shipping & Payment Form (lg:col-span-7) -->
              <div class="lg:col-span-7 p-4 sm:p-8 bg-[#F7F3ED] max-h-[80vh] overflow-y-auto">
                <form [formGroup]="checkoutForm" (ngSubmit)="onSubmitOrder()">
                  
                  <!-- Section 1: Customer & Delivery Details -->
                  <div class="mb-8">
                    <h3 class="font-serif text-lg font-bold text-[#241B14] mb-4 flex items-center gap-2">
                      <mat-icon class="text-[#4B3928] text-base">local_shipping</mat-icon>
                      <span>1. Shipping Information</span>
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <!-- Full Name -->
                      <div class="sm:col-span-2">
                        <label for="fullName" class="block text-xs font-semibold text-[#241B14] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          formControlName="fullName"
                          placeholder="e.g. Alexander Vance"
                          class="w-full px-3.5 py-2.5 bg-white border border-[#E5DACF] rounded-xl text-sm text-[#241B14] focus:outline-none focus:border-[#4B3928] focus:ring-1 focus:ring-[#4B3928]"
                        />
                        @if (checkoutForm.get('fullName')?.touched && checkoutForm.get('fullName')?.invalid) {
                          <span class="text-xs text-red-600 mt-1 block">Full name is required</span>
                        }
                      </div>

                      <!-- Email -->
                      <div>
                        <label for="email" class="block text-xs font-semibold text-[#241B14] uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          formControlName="email"
                          placeholder="alexander@example.com"
                          class="w-full px-3.5 py-2.5 bg-white border border-[#E5DACF] rounded-xl text-sm text-[#241B14] focus:outline-none focus:border-[#4B3928] focus:ring-1 focus:ring-[#4B3928]"
                        />
                        @if (checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid) {
                          <span class="text-xs text-red-600 mt-1 block">Valid email required</span>
                        }
                      </div>

                      <!-- Phone Number -->
                      <div>
                        <label for="phone" class="block text-xs font-semibold text-[#241B14] uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          formControlName="phone"
                          placeholder="+1 (555) 234-5678"
                          class="w-full px-3.5 py-2.5 bg-white border border-[#E5DACF] rounded-xl text-sm text-[#241B14] focus:outline-none focus:border-[#4B3928] focus:ring-1 focus:ring-[#4B3928]"
                        />
                        @if (checkoutForm.get('phone')?.touched && checkoutForm.get('phone')?.invalid) {
                          <span class="text-xs text-red-600 mt-1 block">Phone is required</span>
                        }
                      </div>

                      <!-- Address -->
                      <div class="sm:col-span-2">
                        <label for="address" class="block text-xs font-semibold text-[#241B14] uppercase tracking-wider mb-1.5">
                          Street Address *
                        </label>
                        <input
                          id="address"
                          type="text"
                          formControlName="address"
                          placeholder="Apartment, suite, street name"
                          class="w-full px-3.5 py-2.5 bg-white border border-[#E5DACF] rounded-xl text-sm text-[#241B14] focus:outline-none focus:border-[#4B3928] focus:ring-1 focus:ring-[#4B3928]"
                        />
                        @if (checkoutForm.get('address')?.touched && checkoutForm.get('address')?.invalid) {
                          <span class="text-xs text-red-600 mt-1 block">Address is required</span>
                        }
                      </div>

                      <!-- City -->
                      <div>
                        <label for="city" class="block text-xs font-semibold text-[#241B14] uppercase tracking-wider mb-1.5">
                          City *
                        </label>
                        <input
                          id="city"
                          type="text"
                          formControlName="city"
                          placeholder="New York"
                          class="w-full px-3.5 py-2.5 bg-white border border-[#E5DACF] rounded-xl text-sm text-[#241B14] focus:outline-none focus:border-[#4B3928] focus:ring-1 focus:ring-[#4B3928]"
                        />
                      </div>

                      <!-- Postal Code -->
                      <div>
                        <label for="postalCode" class="block text-xs font-semibold text-[#241B14] uppercase tracking-wider mb-1.5">
                          Postal / ZIP Code *
                        </label>
                        <input
                          id="postalCode"
                          type="text"
                          formControlName="postalCode"
                          placeholder="10001"
                          class="w-full px-3.5 py-2.5 bg-white border border-[#E5DACF] rounded-xl text-sm text-[#241B14] focus:outline-none focus:border-[#4B3928] focus:ring-1 focus:ring-[#4B3928]"
                        />
                      </div>

                      <!-- Country -->
                      <div class="sm:col-span-2">
                        <label for="country" class="block text-xs font-semibold text-[#241B14] uppercase tracking-wider mb-1.5">
                          Country / Region *
                        </label>
                        <select
                          id="country"
                          formControlName="country"
                          class="w-full px-3.5 py-2.5 bg-white border border-[#E5DACF] rounded-xl text-sm text-[#241B14] focus:outline-none focus:border-[#4B3928]"
                        >
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Japan">Japan</option>
                        </select>
                      </div>

                    </div>
                  </div>

                  <!-- Section 2: Payment Method Selection -->
                  <div class="mb-8">
                    <h3 class="font-serif text-lg font-bold text-[#241B14] mb-4 flex items-center gap-2">
                      <mat-icon class="text-[#4B3928] text-base">payment</mat-icon>
                      <span>2. Payment Option</span>
                    </h3>

                    <div class="space-y-3">
                      <!-- Cash on Delivery -->
                      <label class="flex items-center gap-3 p-4 bg-white rounded-xl border cursor-pointer transition-all"
                        [class]="checkoutForm.get('paymentMethod')?.value === 'cod' ? 'border-[#4B3928] ring-1 ring-[#4B3928]' : 'border-[#E5DACF]'"
                      >
                        <input
                          type="radio"
                          value="cod"
                          formControlName="paymentMethod"
                          class="text-[#4B3928] focus:ring-[#4B3928]"
                        />
                        <div class="flex-1">
                          <span class="text-sm font-bold text-[#241B14] block">Cash on Delivery (COD)</span>
                          <span class="text-xs text-[#806345]">Pay in cash or mobile terminal upon doorstep arrival.</span>
                        </div>
                        <mat-icon class="text-[#806345]">payments</mat-icon>
                      </label>

                      <!-- Credit / Debit Card -->
                      <label class="flex items-center gap-3 p-4 bg-white rounded-xl border cursor-pointer transition-all"
                        [class]="checkoutForm.get('paymentMethod')?.value === 'card' ? 'border-[#4B3928] ring-1 ring-[#4B3928]' : 'border-[#E5DACF]'"
                      >
                        <input
                          type="radio"
                          value="card"
                          formControlName="paymentMethod"
                          class="text-[#4B3928] focus:ring-[#4B3928]"
                        />
                        <div class="flex-1">
                          <span class="text-sm font-bold text-[#241B14] block">Credit / Debit Card</span>
                          <span class="text-xs text-[#806345]">Visa, Mastercard, American Express (Encrypted 256-bit)</span>
                        </div>
                        <mat-icon class="text-[#806345]">credit_card</mat-icon>
                      </label>

                      <!-- PayPal -->
                      <label class="flex items-center gap-3 p-4 bg-white rounded-xl border cursor-pointer transition-all"
                        [class]="checkoutForm.get('paymentMethod')?.value === 'paypal' ? 'border-[#4B3928] ring-1 ring-[#4B3928]' : 'border-[#E5DACF]'"
                      >
                        <input
                          type="radio"
                          value="paypal"
                          formControlName="paymentMethod"
                          class="text-[#4B3928] focus:ring-[#4B3928]"
                        />
                        <div class="flex-1">
                          <span class="text-sm font-bold text-[#241B14] block">PayPal Express</span>
                          <span class="text-xs text-[#806345]">Fast, secure checkout with buyer protection.</span>
                        </div>
                        <mat-icon class="text-[#806345]">account_balance_wallet</mat-icon>
                      </label>
                    </div>

                    <!-- Card Fields (shown if card selected) -->
                    @if (checkoutForm.get('paymentMethod')?.value === 'card') {
                      <div class="mt-4 p-4 bg-white rounded-xl border border-[#E5DACF] space-y-3">
                        <div>
                          <label for="cardNumber" class="block text-xs font-semibold text-[#241B14] uppercase mb-1">
                            Card Number
                          </label>
                          <input
                            id="cardNumber"
                            type="text"
                            formControlName="cardNumber"
                            placeholder="4000 1234 5678 9010"
                            class="w-full px-3 py-2 bg-[#F7F3ED] border border-[#E5DACF] rounded-lg text-sm font-mono"
                          />
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                          <div>
                            <label for="cardExpiry" class="block text-xs font-semibold text-[#241B14] uppercase mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="cardExpiry"
                              type="text"
                              formControlName="cardExpiry"
                              placeholder="MM/YY"
                              class="w-full px-3 py-2 bg-[#F7F3ED] border border-[#E5DACF] rounded-lg text-sm font-mono"
                            />
                          </div>
                          <div>
                            <label for="cardCvv" class="block text-xs font-semibold text-[#241B14] uppercase mb-1">
                              Security CVV
                            </label>
                            <input
                              id="cardCvv"
                              type="text"
                              formControlName="cardCvv"
                              placeholder="123"
                              class="w-full px-3 py-2 bg-[#F7F3ED] border border-[#E5DACF] rounded-lg text-sm font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Submit Button on Desktop -->
                  <div class="pt-4 border-t border-[#E5DACF]">
                    <button
                      type="submit"
                      [disabled]="checkoutForm.invalid"
                      class="w-full py-4 bg-[#4B3928] hover:bg-[#382B1E] disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B3928]"
                    >
                      <mat-icon class="text-sm">verified_user</mat-icon>
                      <span>Complete Purchase (\${{ store.cartTotal().toFixed(2) }})</span>
                    </button>
                    <p class="text-[11px] text-center text-[#806345] mt-2">
                      By completing your order, you agree to Solecraft Terms & 30-Day Guarantee.
                    </p>
                  </div>

                </form>
              </div>

              <!-- Right: Order Summary (lg:col-span-5) -->
              <div class="lg:col-span-5 p-4 sm:p-8 bg-white border-t lg:border-t-0 lg:border-l border-[#E5DACF] flex flex-col justify-between max-h-[80vh] overflow-y-auto">
                <div>
                  <h3 class="font-serif text-lg font-bold text-[#241B14] mb-4">
                    Order Summary ({{ store.cartCount() }} items)
                  </h3>

                  <!-- Items Mini-List -->
                  <div class="space-y-4 mb-6 divide-y divide-[#E5DACF]/60">
                    @for (item of store.cart(); track item.id) {
                      <div class="pt-3 first:pt-0 flex items-center gap-3">
                        <div class="relative w-16 h-16 rounded-xl bg-[#F7F3ED] border border-[#E5DACF] overflow-hidden shrink-0">
                          <img
                            [src]="item.product.image"
                            [alt]="item.product.name"
                            referrerpolicy="no-referrer"
                            class="w-full h-full object-cover"
                          />
                          <span class="absolute -top-1 -right-1 bg-[#4B3928] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                            {{ item.quantity }}
                          </span>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="font-serif text-sm font-bold text-[#241B14] truncate">
                            {{ item.product.name }}
                          </p>
                          <p class="text-xs text-[#806345]">
                            Size US {{ item.selectedSize }} · {{ item.selectedColor }}
                          </p>
                        </div>
                        <span class="text-sm font-semibold text-[#241B14] tabular-nums">
                          \${{ (item.product.price * item.quantity).toFixed(2) }}
                        </span>
                      </div>
                    }
                  </div>

                  <!-- Financial Breakdown -->
                  <div class="space-y-2 text-xs sm:text-sm text-[#4B3928] pt-4 border-t border-[#E5DACF]">
                    <div class="flex justify-between">
                      <span>Subtotal</span>
                      <span class="font-semibold text-[#241B14] tabular-nums">\${{ store.cartSubtotal().toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Shipping (Express Courier)</span>
                      <span class="font-semibold text-[#241B14] tabular-nums">
                        @if (store.shippingFee() === 0) {
                          <span class="text-emerald-700">FREE</span>
                        } @else {
                          \${{ store.shippingFee().toFixed(2) }}
                        }
                      </span>
                    </div>
                    <div class="flex justify-between">
                      <span>Carbon Offset Guarantee</span>
                      <span class="font-semibold text-emerald-700">Included</span>
                    </div>
                    <div class="flex justify-between text-base font-bold text-[#241B14] pt-3 border-t border-[#E5DACF]">
                      <span class="font-serif">Total Due</span>
                      <span class="font-serif text-xl tabular-nums">\${{ store.cartTotal().toFixed(2) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Trust Callout -->
                <div class="mt-8 pt-4 border-t border-[#E5DACF] text-xs text-[#806345] space-y-2">
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-sm text-[#4B3928]">lock</mat-icon>
                    <span>256-Bit Bank Grade SSL Encryption</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <mat-icon class="text-sm text-[#4B3928]">autorenew</mat-icon>
                    <span>30-Day Hassle-Free Returns & Exchanges</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    }
  `,
})
export class CheckoutModalComponent {
  readonly store = inject(StoreService);

  readonly checkoutForm = new FormGroup({
    fullName: new FormControl('Julian Sterling', [Validators.required]),
    email: new FormControl('julian.sterling@atelier.com', [Validators.required, Validators.email]),
    phone: new FormControl('+1 (212) 555-0199', [Validators.required]),
    address: new FormControl('442 Broadway, Soho', [Validators.required]),
    city: new FormControl('New York', [Validators.required]),
    postalCode: new FormControl('10013', [Validators.required]),
    country: new FormControl('United States', [Validators.required]),
    paymentMethod: new FormControl<'cod' | 'card' | 'paypal'>('cod', [Validators.required]),
    cardNumber: new FormControl('4242 4242 4242 4242'),
    cardExpiry: new FormControl('12/28'),
    cardCvv: new FormControl('892'),
  });

  onSubmitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    const val = this.checkoutForm.value as CheckoutData;
    this.store.submitOrder(val);
  }
}
