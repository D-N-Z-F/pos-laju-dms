import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    private apiUrl = 'https://26f3-175-141-68-26.ngrok-free.app';
    private options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning':  '69420'
        }
    }
    
    constructor(private http: HttpClient) {}

    getAllContacts = (): Observable<any> => this.http.get<any>(`${this.apiUrl}/contacts`, this.options);

    getMessageByContactId = (
        contactId: string, technicianId: string
    ): Observable<any> => this.http.get<any>(
        `${this.apiUrl}/messages/${contactId}/${technicianId}`, this.options
    );

    sendMessage = (
        number: string, message: string
    ): Observable<any> => this.http.post<any>(
        `${this.apiUrl}/send-message`, { number: number, message: message },  this.options
    );

}