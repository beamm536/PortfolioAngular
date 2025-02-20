import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideFirebaseApp(() => initializeApp({ projectId: "intermodular-angular-firebase", appId: "1:71119221853:web:1eb6609cdde9db033089b4", storageBucket: "intermodular-angular-firebase.firebasestorage.app", apiKey: "AIzaSyDVQ23AsZ2DqY3EooPM1f6CTzvyUY9l7-o", authDomain: "intermodular-angular-firebase.firebaseapp.com", messagingSenderId: "71119221853" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};


