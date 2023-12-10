import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  user: any;
  serverStatus = 'Not started';
  constructor(private authSrv: AuthService, private movieSrv: MoviesService) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.movieSrv.getTop().subscribe(
      (movies) => {
        this.movies = movies;
        this.serverStatus = 'Server is up and running';
      },
      (error) => {
        console.error('Errore nella GET', error);
        this.serverStatus = 'Server is down';
      }
    );
  }
}
