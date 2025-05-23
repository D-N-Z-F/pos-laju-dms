import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import $ from 'jquery';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-technician-service-update',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './technician-service-update.component.html',
  styleUrl: './technician-service-update.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TechnicianServiceUpdateComponent {
  messages: any = [];
  newMessage = '';
  options: string[] = ['Order Received', 'Waiting In Line', 'Service In Progress', 'Completed', 'Ready To Collect'];
  selectedOption: string = 'Order Received';
  carPlate = 'SYG1234';
  chassisNumber = '23458039';
  recipientNumber: string = '60148320826'; // Phone number input
  messageText: string = 'Your order has been received and is being processed.'; // Message input
  responseMessage: string = ''; // Response from backend
  intervalId: any;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("serviceStatus")) {
      localStorage.removeItem("serviceStatus")
    }

    // TEMPORARYYYYY
    // this.getMessages()   

    // REMOVE THE REMARK IF WANT TO TEST SEND WHATSAPP WHEN THE SCREEN IS LOADED
    // this.sendWhatsAppMessage('Your order has been received and is being processed.')
  }
  
  ngOnInit() {
    // this.intervalId = setInterval(() => {
    //   this.getMessages()
    // }, 5000);
  }

  onActionClick() {
    if (localStorage.getItem("serviceStatus")) {
      localStorage.removeItem("serviceStatus")
    }
    localStorage.setItem("serviceStatus", this.selectedOption)
  }

  sendMsg() {
    const msg = ($('#chat-message') as any).val().trim();
    this.sendWhatsAppMessage(msg)
  }

  sendWhatsAppMessage(msg: any) {
    if (this.recipientNumber && msg) {
      const payload = { to: this.recipientNumber, body: msg };
      console.log("weiiiii", payload)
      // Create HttpParams with the form data
      const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const params = new HttpParams()
        .set('to', this.recipientNumber)
        .set('body', msg);
      this.http.post('http://localhost:3000/send-whatsapp', params.toString(), { headers }).subscribe(response => {
        console.log('Response from API:', response);
        this.messages.push({ from: 'You', messageBody: msg });
        console.log("messagesssss", this.messages)
        msg = ''; // Clear the input after sending
      });
    } else {
      this.responseMessage = 'Please enter both phone number and message.';
    }
  }

  getMessages() {
    this.http.get<any>('http://localhost:3000/messages').subscribe(response => {
      console.log('Response from API 33333:', response);
      if (response.length != 0) {
        for (let res of response) {
          this.messages.push(res)
        }
      }
      console.log("messagesssss 2", this.messages)
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
