import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-service-progress',
  imports: [CommonModule],
  templateUrl: './customer-service-progress.component.html',
  styleUrl: './customer-service-progress.component.scss'
})
export class CustomerServiceProgressComponent {

  serviceOrderId: any = '';
  serviceStatusList = ['Order Received', 'Waiting In Line', 'Service In Progress', 'Completed', 'Ready To Collect'];
  index = 0;
  serviceStatus: any;
  intervalId: any;

  constructor(private route: ActivatedRoute) {
    this.serviceOrderId = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit() {
    this.setState();

    this.intervalId = setInterval(() => this.setState(), 5000);
  }

  setState = () => {
    let serviceOrders = JSON.parse(localStorage.getItem('serviceOrders') ?? '') ?? [];
    let serviceOrder = serviceOrders.find((serviceOrder: any) => serviceOrder.id == this.serviceOrderId);
    this.serviceStatus = serviceOrder ? serviceOrder.status : 'Order Received';
    console.log(serviceOrders, serviceOrder, this.serviceStatus);
  }

  colorValidationStatus() {
    let waitingInLine = {
      bar: "bg-secondary",
      check: "bg-secondary"
    }
    let serviceInProgress = {
      bar: "bg-secondary",
      check: "bg-secondary"
    }
    let completed = {
      bar: "bg-secondary",
      check: "bg-secondary"
    }
    let readyToCollect = {
      bar: "bg-secondary",
      check: "bg-secondary"
    } 
    if (this.serviceStatus == "Waiting In Line") {
      waitingInLine.bar = "bg-info"
      waitingInLine.check = "bg-info"
    } else if (this.serviceStatus == "Service In Progress") {
      waitingInLine.bar = "bg-info"
      waitingInLine.check = "bg-info"
      serviceInProgress.bar = "bg-info"
      serviceInProgress.check = "bg-info"
    } else if (this.serviceStatus == "Completed") {
      waitingInLine.bar = "bg-info"
      waitingInLine.check = "bg-info"
      serviceInProgress.bar = "bg-info"
      serviceInProgress.check = "bg-info"
      completed.bar = "bg-info"
      completed.check = "bg-info"
    } else if (this.serviceStatus == "Ready To Collect") {
      waitingInLine.bar = "bg-info"
      waitingInLine.check = "bg-info"
      serviceInProgress.bar = "bg-info"
      serviceInProgress.check = "bg-info"
      completed.bar = "bg-info"
      completed.check = "bg-info"
      readyToCollect.bar = "bg-info"
      readyToCollect.check = "bg-info"
    }
    return { waitingInLine, serviceInProgress, completed, readyToCollect }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
