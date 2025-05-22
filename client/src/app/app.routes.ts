import { Routes } from '@angular/router';
import { CustomerServiceProgressComponent } from './customer-service-progress/customer-service-progress.component';
import { TechnicianChatComponent } from './technician-chat/technician-chat.component';

export const routes: Routes = [
    {
        path: '',
        component: TechnicianChatComponent,
    },
    {
        path: 'customer-service-progress',
        component: CustomerServiceProgressComponent,
    },
];
