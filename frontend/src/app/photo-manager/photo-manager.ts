import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../photo'; 

@Component({
  selector: 'app-photo-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-manager.html'
})
export class PhotoManagerComponent implements OnInit {
  
  // CORREÇÃO: Fechado com ) corretamente antes do {}
  constructor(private photoService: PhotoService) {}

  get photos() {
    return this.photoService.photos;
  }

  get isLoading() {
    return this.photoService.isLoading;
  }

  isUploading = signal<boolean>(false);

  ngOnInit(): void {
    this.photoService.getPhotos(); 
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      
      formData.append('file', file); 

      this.isUploading.set(true);
      this.photoService.uploadPhoto(formData).subscribe({
        next: () => {
          input.value = '';
        },
        error: (err: any) => console.error('Erro no upload:', err),
        complete: () => this.isUploading.set(false)
      });
    }
  }
}