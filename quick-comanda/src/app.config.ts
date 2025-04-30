import { APP_INITIALIZER, ApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { HealthCheckService } from './app/shared/services/heath-check/health-check.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAppInitializer(() => {
      const healthCheck = new HealthCheckService();
      healthCheck.check();
    })
  ]
};