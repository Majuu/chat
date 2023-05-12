import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, DatabaseReference, ref, onValue, DataSnapshot, set } from 'firebase/database';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private app: FirebaseApp = initializeApp(environment.firebase);
  private db: Database = getDatabase(this.app);

  constructor(private http: HttpClient) {}

    deleteItems(itemsCategory: string): Observable<void> {
      return this.http.delete<void>(`${environment.firebase.databaseURL}/${itemsCategory}.json`);
    }

   listenToDatabaseChanges<K>(endpoint: string, cb: Function, cb2?: Function): void {
    const chatsRef: DatabaseReference = ref(this.db, endpoint);
    onValue(chatsRef, (snapshot: DataSnapshot) => {
      const data: {[key: string]: K} = snapshot.val();
      cb(data, cb2);
    });
  }

    addItem<K extends {id: string}>(endpoint: string, item: K): void {
      set(ref(this.db, `${endpoint}/${item.id}`), item);
    }


}
