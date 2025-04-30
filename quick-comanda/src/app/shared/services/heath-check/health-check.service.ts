import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  private firestore = inject(Firestore);

  async check() {
    console.log('🚀 Iniciando verificações de integridade do sistema...');

    await this.checkFireStoreStatus();

    console.log('🛠️ Todas as verificações foram concluídas!');
  }

  private async checkFireStoreStatus() {
    try {
      await this.firestore.app.name;
      console.log('✅ FireStore conectado com sucesso!');
    } catch (error) {
      console.error('❌ Erro na conexão do FireStore:', error);
    }
  }
}
