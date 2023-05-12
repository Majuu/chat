import { Injectable } from '@angular/core';
import { DatabaseReference, ref, onValue, DataSnapshot, Database, getDatabase, set } from 'firebase/database';
import { Chat } from '../models/chat.model';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private app: FirebaseApp = initializeApp(environment.firebase);
  private db: Database = getDatabase(this.app);
  private _chats = new BehaviorSubject<Chat[]>([]);

  private lookForDuplicatesAndSortChats(data: {[key: string]: Chat}, scrollCb: Function): void {
    const unsortedChats: Chat[] = [];
    let chats = this._chats.getValue();
    for(const id in data) {
      if (!chats.map(chat => chat.id).includes(id)) {
        unsortedChats.push(data[id]);
      }
    }
    if(!chats.length) {
      chats = unsortedChats.sort((a, b) => (Date.parse(a.timestamp) - Date.parse(b.timestamp)));
    } else {
      chats.push(...unsortedChats);
    }
    this._chats.next(Object.values(chats));

    scrollCb();
  }

  get chats$(): Observable<Chat[]> {
    return this._chats.asObservable();
  }

  listenToDatabaseChanges(scrollCb: Function): void {
    const chatsRef: DatabaseReference = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: DataSnapshot) => {
      const data: {[key: string]: Chat} = snapshot.val();
        this.lookForDuplicatesAndSortChats(data, scrollCb);
    });
  }

  onChatSubmit(chat: Chat): void {
    set(ref(this.db, `chats/${chat.id}`), chat);
  }
}
