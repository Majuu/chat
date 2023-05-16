import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';
import { WsService } from './services/ws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private wsService: WsService, private userSerivce: UserService, private dialog: MatDialog) { }

  private initiallyClearAllData(): void {
    this.wsService.deleteItems('chats').subscribe();
    this.wsService.deleteItems('users').subscribe();
  }

  ngOnInit(): void {
    this.initiallyClearAllData();
    this.dialog.open(UserDialogComponent, {
      disableClose: true
    });
  }

  get user$(): BehaviorSubject<User | null> {
    return this.userSerivce.user$
  }
}
