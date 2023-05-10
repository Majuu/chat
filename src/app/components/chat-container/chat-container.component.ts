import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue, DatabaseReference, DataSnapshot } from "firebase/database";
import { Chat } from 'src/app/models/chat.model';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {
  @ViewChild('chatRef') chatRef!: ElementRef;

  private app: FirebaseApp = initializeApp(environment.firebase);
  private db: Database = getDatabase(this.app);

  chats: Chat[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.listenToDatabaseChanges();
  }

  listenToDatabaseChanges(): void {
    const chatsRef: DatabaseReference = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: DataSnapshot) => {
      const data: {[key: string]: Chat} = snapshot.val();
        this.lookForDuplicatesAndSortChats(data);
    });
  }

  lookForDuplicatesAndSortChats(data: {[key: string]: Chat}): void {
    const unsortedChats: Chat[] = [];
    for(const id in data) {
      if (!this.chats.map(chat => chat.id).includes(id)) {
        unsortedChats.push(data[id])
      }
    }
    if(!this.chats.length) {
      this.chats = unsortedChats.sort((a, b) => (Date.parse(a.timestamp) - Date.parse(b.timestamp)));
    } else {
      this.chats.push(...unsortedChats)
    }
     this.scrollToBottom();
  }

  onChatSubmit(msg: string): void {
    const chat = new Chat(uuidv4(), this.userService.user, msg, new Date().toString());
    set(ref(this.db, `chats/${chat.id}`), chat);
  }

  scrollToBottom = (): void => {
    setTimeout(() => {
      try {
        this.chatRef.nativeElement.scrollTop = this.chatRef.nativeElement.scrollHeight;
      } catch (err) { return; }
    }, 0)
  }
}

// ! WHO IS ONLINE!
// ! forms handling
// ! delete all on init
// ! tests
// ! linter
// ! delete env on github https://stackoverflow.com/questions/30696930/how-to-hide-env-file-from-github
