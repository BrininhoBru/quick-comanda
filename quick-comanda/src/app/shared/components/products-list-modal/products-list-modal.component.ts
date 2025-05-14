import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormattedProduct } from '../../models/product.model';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';
import { ProductsRegistrationModalComponent } from '../products-registration-modal/products-registration-modal.component';
import { CategoryService } from '../../services/categories/category.service';

@Component({
  selector: 'quick-products-list-modal',
  templateUrl: './products-list-modal.component.html',
  styleUrls: ['./products-list-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProductsListModalComponent implements OnInit {
  searchTerm = signal('');

  products = signal<FormattedProduct[]>([]);

  filteredProducts = computed(() => {
    return this.products().filter(p =>
      p.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  });

  constructor(
    private modalCtrl: ModalController,
    private productsService: ProductsService,
  ) {
    this.productsService.getProducts().subscribe(products => {
      this.products.set(products);
    });
  }

  ngOnInit() { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async openProductRegistrationModal() {
    const modal = await this.modalCtrl.create({
      component: ProductsRegistrationModalComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
  }
}
