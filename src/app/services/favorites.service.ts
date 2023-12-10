import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private api = environment.apiURL;

  constructor(private http: HttpClient) {}

  getFavorites(userId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.api}/favorites?userId=${userId}`);
  }

  addFavorite(userId: number, movieId: number): Observable<Favorite> {
    const newFavorite: Favorite = { userId, movieId };
    console.log(newFavorite);
    return this.http.post<Favorite>(`${this.api}/favorites`, newFavorite);
  }

  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/favorites/${id}`);
  }
}
