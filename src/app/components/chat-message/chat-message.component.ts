import { Component, Input } from '@angular/core';
import { Chat } from 'src/models/chat.model';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent {
  @Input() chats: Chat[] = []
}
