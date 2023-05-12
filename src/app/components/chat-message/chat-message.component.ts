import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() chats!: Chat[];

  user!: User;
  authorUserName = '';

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.user = this.userService.user$.getValue()!;
    this.authorUserName = `You (${this.user.name})`;
  }
}
