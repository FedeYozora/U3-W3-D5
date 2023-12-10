import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.http
      .get('http://localhost:4201/movies-toprated/' + movieId)
      .subscribe((data) => {
        this.movie = data;
      });
  }
}
