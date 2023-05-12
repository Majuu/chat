import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chat } from 'src/app/models/chat.model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {
  @ViewChild('chatRef') chatRef!: ElementRef;

  constructor(private userService: UserService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.listenToDatabaseChanges(this.scrollToBottom);
  }

  get chatList$(): BehaviorSubject<Chat[]> {
    return this.messageService.chats$;
  }

  onChatSubmit(msg: string): void {
    const chat = new Chat(uuidv4(), this.userService.user, msg, new Date().toString());
    this.messageService.onChatSubmit(chat);
  }

  scrollToBottom = (): void => {
    setTimeout(() => {
      try {
        this.chatRef.nativeElement.scrollTop = this.chatRef.nativeElement.scrollHeight;
      } catch (err) { return; }
    }, 0)
  }
}

// ! move WS logic to services????
// ! WHO IS ONLINE!
// ! forms handling
// ! delete all on init
// ! add prettier
// ! tests
// ! delete env on github https://stackoverflow.com/questions/30696930/how-to-hide-env-file-from-github
