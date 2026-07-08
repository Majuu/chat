import { Component, OnInit, input, inject } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NgClass, DatePipe } from '@angular/common';

@Component({
    selector: 'app-chat-messages',
    templateUrl: './chat-message.component.html',
    styleUrl: './chat-message.component.scss',
    imports: [NgClass, DatePipe]
})
export class ChatMessageComponent implements OnInit {
  private userService = inject(UserService);

  readonly chats = input.required<Chat[]>();

  user!: User;
  authorUserName = '';

  ngOnInit(): void {
    this.user = this.userService.user$.getValue() as User;
    this.authorUserName = `You (${this.user.name})`;
  }
}
