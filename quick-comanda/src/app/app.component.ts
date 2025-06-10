import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { home, settings, storefront, arrowBack, add, receipt, logIn } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      home,
      settings,
      storefront,
      arrowBack,
      add,
      receipt,
      logIn
    });
  }
}
