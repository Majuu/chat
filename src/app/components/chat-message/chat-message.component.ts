import { trigger, transition, animate, style, state } from '@angular/animations';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        position: 'relative',
        top: 0,
      })),
      state('closed', style({
        position: 'relative',
        top: 75,
      })),

      transition('closed => open', [
        animate('0.3s')
      ])
    ])
  ]
})
export class ChatMessageComponent implements OnInit, OnChanges {
  @Input() chats!: Chat[];

  isLastItemOpen = false;
  user!: User;
  authorUserName = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.user$.getValue() as User;
    this.authorUserName = `You (${this.user.name})`;
  }

  ngOnChanges(): void {
      this.triggerLastItemAnimation();
  }

  private triggerLastItemAnimation(): void {
    this.isLastItemOpen = false;
    setTimeout(() => {
      this.isLastItemOpen = true;
    }, 0)
  }
}
