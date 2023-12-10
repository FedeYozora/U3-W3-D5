import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Favorite } from 'src/app/models/favorite';
import { UserService } from 'src/app/services/user-service.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  user: any;
  favorites: Favorite[] = [];
  films: any[] = [];

  constructor(
    private favSrv: FavoritesService,
    private userSrv: UserService,
    private mSrv: MoviesService
  ) {}

  ngOnInit(): void {
    this.user = this.userSrv.getCurrentUser();
    console.log(this.user);

    this.mSrv.getMovies().subscribe(
      (movies) => {
        this.films = movies;
        this.loadFavorites();
      },
      (error) => {
        console.error('Errore nella GET', error);
      }
    );
  }

  private loadFavorites(): void {
    this.favSrv
      .getFavorites(this.user?.user?.id)
      .pipe(switchMap((fav) => this.handleFavorites(fav)))
      .subscribe(
        () => {
          console.log(this.favorites);
        },
        (error) => {
          console.error('Errore nella GET', error);
        }
      );
  }

  private handleFavorites(fav: Favorite[]): Observable<void> {
    this.favorites = fav;

    this.films = this.films.filter((film: { id: number }) =>
      this.favorites.some((key) => key.movieId === film.id)
    );

    return of(undefined);
  }

  removeFavorite(id: number) {
    let favRemove: any;

    for (const favorite of this.favorites) {
      if (favorite.movieId === id) {
        favRemove = favorite;
        break;
      }
    }
    if (favRemove) {
      this.favSrv.removeFavorite(favRemove.id).subscribe(
        () => {
          this.favorites = this.favorites.filter(
            (favorite) => favorite !== favRemove
          );
          alert(`Preferito rimosso`);
        },
        (error) => {
          console.error('Errore durante la rimozione del preferito', error);
        }
      );
    } else {
      console.warn('Preferito non trovato movieId:', id);
    }
  }
}
