import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent {
  @Output() sendMessage = new EventEmitter<string>();

  chatMessage = '';

  submit(): void {
    this.sendMessage.emit(this.chatMessage);
    this.chatMessage = '';
  }
}
