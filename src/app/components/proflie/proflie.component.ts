import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proflie',
  templateUrl: './proflie.component.html',
  styleUrls: ['./proflie.component.scss'],
})
export class ProflieComponent implements OnInit {
  utente: any;
  currentDateAndTime: any;

  constructor(private userSrv: UserService, private datePipe: DatePipe) {
    this.currentDateAndTime = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    );
  }

  ngOnInit(): void {
    this.utente = this.userSrv.getCurrentUser();
  }
}
