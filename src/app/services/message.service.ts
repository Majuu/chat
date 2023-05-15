import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _chats = new BehaviorSubject<Chat[]>([]);

  constructor(private wsService: WsService) {}

  private lookForDuplicatesAndSortChats(data: {[key: string]: Chat}, scrollCb: (() => void) | undefined): void {
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

    if(scrollCb) scrollCb();
  }

  get chats$(): Observable<Chat[]> {
    return this._chats.asObservable();
  }

  listenToDatabaseChanges(scrollCb: () => void): void {
    this.wsService.listenToDatabaseChanges<Chat>('chats', this.lookForDuplicatesAndSortChats.bind(this), scrollCb);
  }

  onChatSubmit(chat: Chat): void {
    this.wsService.addItem<Chat>('chats', chat);
  }
}
