import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'quick-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginPage {
  authService = inject(AuthService);

  email = '';
  password = '';

  constructor() {
    // con
    // (savedEmail) this.email = savedEmail;
  }

  async login() {
    localStorage.setItem('lastUserEmail', this.email);

    await this.authService.login(this.email, this.password);
  }

  // private _auth = inject(Auth);
  // private _router = inject(Router);
  // private _fb = inject(FormBuilder);
  // private _loadingCtrl = inject(LoadingController);
  // private _toastCtrl = inject(ToastController);

  // loginForm!: FormGroup;
  // loading = signal(false);

  // ngOnInit() {
  //   this.loginForm = this._fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //   });
  // }

  // async onSubmit() {
  //   if (this.loginForm.invalid) return;

  //   this.loading.set(true);
  //   const loading = await this._loadingCtrl.create({ message: 'Autenticando...' });
  //   await loading.present();

  //   try {
  //     const { email, password } = this.loginForm.value;
  //     await signInWithEmailAndPassword(this._auth, email, password);

  //     await loading.dismiss();
  //     this.loading.set(false);
  //     this._router.navigate(['/tabs/home']);
  //   } catch (error) {
  //     await loading.dismiss();
  //     this.showErrorToast(error);
  //     this.loading.set(false);
  //   }
  // }

  // private async showErrorToast(error: any) {
  //   let message = 'Falha no login. Verifique seus dados!';

  //   switch (error.code) {
  //     case 'auth/user-not-found':
  //       message = 'Usuário não encontrado';
  //       break;
  //     case 'auth/wrong-password':
  //       message = 'Senha incorreta';
  //       break;
  //   }

  //   const toast = await this._toastCtrl.create({
  //     message,
  //     duration: 3000,
  //     color: 'danger'
  //   });
  //   toast.present();
  // }

  // goToRegister() {
  //   console.log('Navegando para a página de registro...');
  // }
}
