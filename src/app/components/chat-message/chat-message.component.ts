import { Component, Input } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {
  @Input() chats: Chat[] = [];

  user: User;
  authorUserName: string = `You (${this.userService.user.name})`;

  constructor(private userService: UserService) {
    this.user = this.userService.user;
  }
}
