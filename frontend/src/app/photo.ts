import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Photo {
  id: number;
  url: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/photo'; 

  photos = signal<Photo[]>([]);
  isLoading = signal<boolean>(false);

  getPhotos(): void {
    this.isLoading.set(true);
    this.http.get<Photo[]>(this.API_URL).subscribe({
      next: (data) => this.photos.set(data),
      error: (err) => console.error('Erro ao buscar fotos:', err),
      complete: () => this.isLoading.set(false)
    });
  }

  uploadPhoto(formData: FormData): Observable<Photo> {
    return this.http.post<Photo>(this.API_URL, formData).pipe(
      tap((newPhoto) => {
        this.photos.update((current) => [newPhoto, ...current]);
      })
    );
  }
}
