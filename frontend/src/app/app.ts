import { Component } from '@angular/core';
import { PhotoManagerComponent } from './photo-manager/photo-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PhotoManagerComponent],
  templateUrl: './app.html' // <-- Certifique-se de que está usando 'templateUrl' apontando pro arquivo
})
export class AppComponent {}