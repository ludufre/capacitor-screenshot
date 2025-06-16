import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Screenshot } from 'capacitor-screenshot';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  screenshotAsBase64 = '';

  takeScreenshot() {
    Screenshot.take({ saveToDisk: true })
      .then((result) => {
        this.screenshotAsBase64 = result.base64;
        console.log('Screenshot taken:', result);
      })
      .catch((error) => {
        console.error('Error taking screenshot:', error);
      });
  }
}
