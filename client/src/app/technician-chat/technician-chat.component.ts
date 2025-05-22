import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../services/socket.service';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technician-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './technician-chat.component.html',
  styleUrl: './technician-chat.component.scss'
})
export class TechnicianChatComponent {
  contacts: any[] = [];
  messages: any[] = [];
  selectedContact: any;
  technician: any;
  newMessage: string = '';
  private socketSub!: Subscription;

  constructor(private socketService: SocketService, private chatService: ChatService) {}

  ngOnInit() {
    this.loadContacts();
    this.socketSub = this.socketService.listenNewMessages().subscribe(() =>  this.loadMessages());
  }

  selectContact = (contactId: string) => {
    this.selectedContact = this.contacts.find((contact) => contact._id === contactId);
    this.loadMessages();
  }

  loadContacts = () => {
    this.chatService.getAllContacts().subscribe((data) => {
      this.contacts = data.filter((each: any) => !each.isTechnician);
      this.technician = data.find((each: any) => each.isTechnician);
      console.log("LOAD CONTACTS", this.contacts, this.technician);
    });
  };

  loadMessages = () => {
    if(this.selectedContact) {
      this.chatService
        .getMessageByContactId(this.selectedContact._id, this.technician._id)
        .subscribe((data) => {
          this.messages = data;
          console.log("LOAD MESSAGES", this.messages);
        });
    } else {
      this.loadContacts();
    }
  };

  sendMessage = () => {
    if (!this.newMessage.trim()) return;
    this.chatService.sendMessage(this.selectedContact._id ,this.newMessage).subscribe(() => {
      this.newMessage = '';
    });
  }

  ngOnDestroy() {
    this.socketSub.unsubscribe();
    this.socketService.disconnect();
  }
}
