import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ProductsListModalComponent } from 'src/app/shared/components/products-list-modal/products-list-modal.component';

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

  async openProductsListModal() {
    const modal = await this.modalCtrl.create({
      component: ProductsListModalComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
  }
}
