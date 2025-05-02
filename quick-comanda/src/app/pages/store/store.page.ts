import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ProductsModalComponent } from 'src/app/shared/components/products-modal/products-modal.component';

@Component({
  selector: 'quick-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class StorePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async openProductsModal() {
    const modal = await this.modalCtrl.create({
      component: ProductsModalComponent
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
  }
}
