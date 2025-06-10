import { inject, Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { Employee } from '../../models/employee.model';
import { onAuthStateChanged } from 'firebase/auth';
import { collectionGroup, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  currentRestaurant = signal<Restaurant | null>(null);
  userRole = signal<string>('');
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.setupAuthStateListener();
  }

  async login(email: string, password: string): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Login bem-sucedido:', userCredential.user);
    } catch (error) {
      this.handleLoginError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.resetAuthState();
    this.router.navigate(['/login']);
  }

  private setupAuthStateListener(): void {
    onAuthStateChanged(this.auth, async (user) => {
      this.currentUser.set(user);
      this.isLoading.set(true);

      if (user) {
        await this.fetchUserRestaurant(user.uid);
      } else {
        this.resetAuthState();
        this.router.navigate(['/login']);
      }

      this.isLoading.set(false);
    });
  }

  private async fetchUserRestaurant(userId: string): Promise<void> {
    try {
      const employeeQuery = query(
        collectionGroup(this.firestore, 'employees'),
        where('userId', '==', userId)
      );

      const employeeSnapshot = await getDocs(employeeQuery);

      if (employeeSnapshot.empty) {
        throw new Error('Nenhum restaurante vinculado a este usuário');
      }
      const employeeDoc = employeeSnapshot.docs[0];
      const employeeData = employeeDoc.data() as Employee;
      this.userRole.set(employeeData.role);

      const pathSegments = employeeDoc.ref.path.split('/');
      const restaurantId = pathSegments[1];

      const restaurantDoc = await getDoc(doc(this.firestore, 'restaurants', restaurantId));

      if (!restaurantDoc.exists()) {
        throw new Error('Restaurante não encontrado');
      }

      const restaurantData = restaurantDoc.data() as Omit<Restaurant, 'id'>;
      this.currentRestaurant.set({
        id: restaurantDoc.id,
        ...restaurantData
      });

      this.router.navigate(['/tabs/home']);

    } catch (error) {
      console.error('Falha ao buscar dados:', error);
      this.errorMessage.set(error instanceof Error ? error.message : 'Erro desconhecido');
      this.logout();
    }
  }

  private resetAuthState(): void {
    this.currentUser.set(null);
    this.currentRestaurant.set(null);
    this.userRole.set('');
    this.errorMessage.set(null);
  }

  private handleLoginError(error: any): void {
    const errorCode = error.code || 'unknown';
    this.errorMessage.set(this.mapAuthError(errorCode));
    console.warn(`Falha no login (${errorCode}): ${this.errorMessage()}`);
  }

  private mapAuthError(errorCode: string): string {
    const errorMap: Record<string, string> = {
      'auth/invalid-credential': 'Credenciais inválidas',
      'auth/user-disabled': 'Conta desativada',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/too-many-requests': 'Muitas tentativas. Tente mais tarde.',
      'unknown': 'Erro desconhecido ao fazer login'
    };

    return errorMap[errorCode] || errorMap['unknown'];
  }
}
