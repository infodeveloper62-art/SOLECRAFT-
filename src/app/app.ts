import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './components/header';
import { HeroComponent } from './components/hero';
import { CategoryCardsComponent } from './components/category-cards';
import { ProductCatalogComponent } from './components/product-catalog';
import { BrandBannerComponent } from './components/brand-banner';
import { AboutSectionComponent } from './components/about-section';
import { NewsletterComponent } from './components/newsletter';
import { FooterComponent } from './components/footer';
import { CartDrawerComponent } from './components/cart-drawer';
import { CheckoutModalComponent } from './components/checkout-modal';
import { ProductModalComponent } from './components/product-modal';
import { WishlistDrawerComponent } from './components/wishlist-drawer';
import { ToastComponent } from './components/toast';
import { InfoModalsComponent } from './components/info-modals';
import { MobileNavComponent } from './components/mobile-nav';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    CategoryCardsComponent,
    ProductCatalogComponent,
    BrandBannerComponent,
    AboutSectionComponent,
    NewsletterComponent,
    FooterComponent,
    CartDrawerComponent,
    CheckoutModalComponent,
    ProductModalComponent,
    WishlistDrawerComponent,
    ToastComponent,
    InfoModalsComponent,
    MobileNavComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
