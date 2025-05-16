import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'store',
        loadComponent: () => import('./pages/store/store.page').then(m => m.StorePage)
      },
      {
        path: 'order',
        loadComponent: () => import('./pages/order/order.page').then(m => m.OrderPage)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
