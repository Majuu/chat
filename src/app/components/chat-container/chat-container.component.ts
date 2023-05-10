import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue, DatabaseReference, DataSnapshot  } from "firebase/database";
import { environment } from 'src/environments/environment';
import { Chat } from 'src/models/chat.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {
  @ViewChild('chatRef', {static: false}) chatRef!: ElementRef;

  app: FirebaseApp = initializeApp(environment.firebase);
  db: Database = getDatabase(this.app);
  username = '';
  message = '';
  chats: Chat[] = [];

  form: FormGroup = this.formBuilder.group({
    'message': [],
    'username': []
  });

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.listenToDatabaseChanges();
  }

  listenToDatabaseChanges(): void {
    const chatsRef: DatabaseReference = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: DataSnapshot) => {
      const data: {[key: string]: Chat} = snapshot.val();
      for(let id in data) {
        if (!this.chats.map(chat => chat.id).includes(id)) {
          this.chats.push(data[id])
        }
      }
    });
  }

  onChatSubmit(msg: string): void {
    const chat = new Chat(uuidv4(), 'Maju', msg, new Date().toString());
    set(ref(this.db, `chats/${chat.id}`), chat);
    this.form = this.formBuilder.group({
      'message' : [],
      'username' : [chat.username],
    });
    this.scrollToBottom();
  }

  scrollToBottom = (): void => {
    try {
      this.chatRef.nativeElement.scrollTop = this.chatRef.nativeElement.scrollHeight;
    } catch (err) {}
  }

}

// ! WHO IS ONLINE!
