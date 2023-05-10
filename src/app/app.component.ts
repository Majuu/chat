import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  $isUserProvided: BehaviorSubject<boolean>;

  constructor(private userSerivce: UserService, private dialog: MatDialog) {
    this.userSerivce.user = {id:'12345', name: 'Maju'};
    this.$isUserProvided = this.userSerivce.userActive$;
  }

  ngOnInit(): void {
    this.dialog.open(UserDialogComponent);
  }
}
