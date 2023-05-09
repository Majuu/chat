import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { Chat } from 'src/models/chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firechat';
  // app: FirebaseApp;
  // db: Database;
  // form: FormGroup;
  // username = '';
  // message = '';
  // chats: Chat[] = [];
}
