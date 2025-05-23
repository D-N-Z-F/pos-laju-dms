import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import $ from 'jquery';
import { ChatService } from '../services/chat.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface ServiceOrder {
  id: number | null,
  carPlate: string,
  chassisNumber: string,
  contactNo: string,
  status: string
}

@Component({
  selector: 'app-technician-service-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './technician-service-update.component.html',
  styleUrl: './technician-service-update.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class TechnicianServiceUpdateComponent {
  serviceOrders: ServiceOrder[] = [];
  selectedServiceOrder: ServiceOrder = {
    id: null,
    carPlate: '',
    chassisNumber: '',
    contactNo: '',
    status: ''
  };
  options: string[] = ['Pending Order', 'Order Received', 'Waiting In Line', 'Service In Progress', 'Completed', 'Ready To Collect'];
  selectedOption: string = '';
  emailMessage: string = 'Hi! Your order has been received, please click the following link for live updates: http://localhost:4200/customer-service-progress';

  constructor(private chatService: ChatService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('serviceOrders');
    if(!saved) {
      this.serviceOrders = [
        {
          id: 1,
          carPlate: 'SYG1234',
          chassisNumber: '23458039',
          contactNo: '601131884569',
          status: 'Pending Order'
        },
        {
          id: 2,
          carPlate: 'WTF7870',
          chassisNumber: '12345678',
          contactNo: '601131884569',
          status: 'Pending Order'
        },
        {
          id: 3,
          carPlate: 'SYG1234',
          chassisNumber: '98765432',
          contactNo: '601131884569',
          status: 'Pending Order'
        }
      ]
      localStorage.setItem('serviceOrders', JSON.stringify(this.serviceOrders));
    } else {
      this.serviceOrders = JSON.parse(saved);
    }
  }

  updateServiceOrder = (serviceOrderId: number) => {
    this.serviceOrders = this.serviceOrders.map(
      (serviceOrder) =>
        serviceOrder.id === serviceOrderId
          ? { ...serviceOrder, status: this.selectedOption }
          : serviceOrder
      );
    localStorage.setItem('serviceOrders', JSON.stringify(this.serviceOrders));
    if(this.selectedOption === 'Order Received') {
      const number = this.selectedServiceOrder.contactNo;
      this.chatService.sendMessage(number, this.emailMessage).subscribe(
        (_) => this.toastr.success('Email successfully sent!', "Success!")
      );
    }
  }

  selectServiceOrder = (serviceOrderId: number) => {
    this.selectedServiceOrder = this.serviceOrders.find((serviceOrder) => serviceOrder.id === serviceOrderId)!;
    this.selectedOption = this.selectedServiceOrder.status;
  }

  redirectToLiveUpdate = () => {
    if (
      this.selectedServiceOrder.id && this.selectedServiceOrder.status != 'Pending Order'
    ) {
      this.router.navigate(['/customer-service-progress', this.selectedServiceOrder.id]);
    }
  };
}
