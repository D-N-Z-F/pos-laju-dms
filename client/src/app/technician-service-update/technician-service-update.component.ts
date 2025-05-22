import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-technician-service-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './technician-service-update.component.html',
  styleUrl: './technician-service-update.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TechnicianServiceUpdateComponent {
  messages = [
    { text: 'Hello!', type: 'received' },
    { text: 'Hi, how are you?', type: 'sent' }
  ];
  newMessage = '';
  options: string[] = ['Order Received', 'Waiting In Line', 'Service In Progress', 'Completed', 'Ready To Collect'];
  selectedOption: string = 'Order Received';
  carPlate = 'SYG1234';
  chassisNumber = '23458039';

  constructor() {
    if (localStorage.getItem("serviceStatus")) {
      localStorage.removeItem("serviceStatus")
    }
  }

  onActionClick() {
    // alert('Selected option: ' + this.selectedOption);
    if (localStorage.getItem("serviceStatus")) {
      localStorage.removeItem("serviceStatus")
    }
    localStorage.setItem("serviceStatus", this.selectedOption)
  }

  sendMsg() {
    const msg = ($('#chat-message') as any).val().trim();
      if (msg) {
        $('.chat-box').append(`<div>${msg}</div>`);
        $('.chat-box div').last().addClass("chat-bubble user");
        $('#chat-message').val('');
        $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
      }
  }
}
