import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userSerivce: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(UserDialogComponent);
  }

  get user$(): BehaviorSubject<User | null> {
    return this.userSerivce.user$
  }
}
