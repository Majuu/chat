import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  @ViewChild('chatInput') chatInput!: ElementRef;

  @Output() sendMessage = new EventEmitter<string>();

  chatForm = this.fb.nonNullable.group({
    chatMessage: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    setTimeout(() => {
    this.chatInput.nativeElement.focus();
    }, 0)
  }

  submit(): void {
    const chatMessage: string | undefined = this.chatForm.get('chatMessage')?.value;

    if(chatMessage) {
      this.sendMessage.emit(chatMessage);
      this.chatForm.reset();
      this.chatInput.nativeElement.focus();
    }
  }
}
