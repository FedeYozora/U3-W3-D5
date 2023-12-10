import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie';
import { FavoritesService } from 'src/app/services/favorites.service';
import { UserService } from 'src/app/services/user-service.service';
import { Favorite } from 'src/app/models/favorite';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  user: any;
  favorites: Favorite[] = [];
  constructor(
    private movieSrv: MoviesService,
    private favSrv: FavoritesService,
    private userSrv: UserService
  ) {}

  ngOnInit(): void {
    this.movieSrv.getMovies().subscribe(
      (movies) => {
        this.movies = movies;
      },
      (error) => {
        console.error('Errore nella GET', error);
      }
    );
    this.user = this.userSrv.getCurrentUser();
    console.log(this.user);
  }
  addToFavorites(userId: number, movieId: number) {
    return this.favSrv.addFavorite(userId, movieId).subscribe((newFav) => {
      this.favorites.push(newFav);
    });
  }
}
