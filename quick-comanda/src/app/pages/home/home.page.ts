import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'quick-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  authService = inject(AuthService);

  currentRestaurant = this.authService.currentRestaurant()?.name
}
