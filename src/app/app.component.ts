import { Component, OnInit, inject } from '@angular/core';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';
import { WsService } from './services/ws.service';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ChatContainerComponent, AsyncPipe]
})
export class AppComponent implements OnInit {
  private wsService = inject(WsService);
  private userSerivce = inject(UserService);
  private dialog = inject(MatDialog);

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
