import { Component, ElementRef, OnInit, output, viewChild, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-chat-form',
    templateUrl: './chat-form.component.html',
    styleUrl: './chat-form.component.scss',
    imports: [FormsModule, ReactiveFormsModule, MatButton, MatIcon]
})
export class ChatFormComponent implements OnInit {
  readonly chatInput = viewChild.required<ElementRef>('chatInput');

  sendMessage = output<string>();

  private fb = inject(FormBuilder);

  chatForm = this.fb.nonNullable.group({
    chatMessage: ['', Validators.required]
  })

  ngOnInit(): void {
    setTimeout(() => {
    this.chatInput().nativeElement.focus();
    }, 0)
  }

  submit(): void {
    const chatMessage: string | undefined = this.chatForm.get('chatMessage')?.value;

    if(chatMessage) {
      this.sendMessage.emit(chatMessage);
      this.chatForm.reset();
      this.chatInput().nativeElement.focus();
    }
  }
}
