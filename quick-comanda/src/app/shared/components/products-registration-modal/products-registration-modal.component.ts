import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ProductsService } from '../../services/products/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'quick-products-registration-modal',
  templateUrl: './products-registration-modal.component.html',
  styleUrls: ['./products-registration-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProductsRegistrationModalComponent implements OnInit {

  editMode = false;

  constructor(
    private modalCtrl: ModalController,
    private productsService: ProductsService
  ) { }

  ngOnInit() { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
