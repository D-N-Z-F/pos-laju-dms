import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-service-progress',
  imports: [CommonModule],
  templateUrl: './customer-service-progress.component.html',
  styleUrl: './customer-service-progress.component.scss'
})
export class CustomerServiceProgressComponent {

  // serviceStatus: any = "Ready To Collect"
  serviceStatusList = ['Order Received', 'Waiting In Line', 'Service In Progress', 'Completed', 'Ready To Collect'];
  index = 0;
  serviceStatus = this.serviceStatusList[0];
  intervalId: any;

  constructor() {
    console.log("serviceStatus", this.serviceStatus)
    // let value = 1
    // setInterval(() => {
    //   value++;
    //   console.log('Value is now:', value);
    // }, 5000); // 5000 milliseconds = 5 seconds
  }
  
  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.serviceStatus = this.serviceStatusList[this.index];
      this.index = this.index + 1;
      if (this.index >= this.serviceStatusList.length) {
        clearInterval(this.intervalId); // Stop the interval after last element
      }
    }, 5000);
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
      waitingInLine.bar = "bg-success"
      waitingInLine.check = "bg-success"
    } else if (this.serviceStatus == "Service In Progress") {
      waitingInLine.bar = "bg-success"
      waitingInLine.check = "bg-success"
      serviceInProgress.bar = "bg-success"
      serviceInProgress.check = "bg-success"
    } else if (this.serviceStatus == "Completed") {
      waitingInLine.bar = "bg-success"
      waitingInLine.check = "bg-success"
      serviceInProgress.bar = "bg-success"
      serviceInProgress.check = "bg-success"
      completed.bar = "bg-success"
      completed.check = "bg-success"
    } else if (this.serviceStatus == "Ready To Collect") {
      waitingInLine.bar = "bg-success"
      waitingInLine.check = "bg-success"
      serviceInProgress.bar = "bg-success"
      serviceInProgress.check = "bg-success"
      completed.bar = "bg-success"
      completed.check = "bg-success"
      readyToCollect.bar = "bg-success"
      readyToCollect.check = "bg-success"
    }
    return { waitingInLine, serviceInProgress, completed, readyToCollect }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
