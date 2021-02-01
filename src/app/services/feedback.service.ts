import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback} from '../shared/feedback';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

     getFeedbacks(): Observable<Feedback[]> {
       return this.http.get<Feedback[]>(baseURL + 'feedbacks')
       .pipe(catchError(this.processHTTPMsgService.handleError));
      
     }
  
     getFeedback(id: number): Observable<Feedback> {
       return this.http.get<Feedback>(baseURL + 'feedbacks/' + id)
       .pipe(catchError(this.processHTTPMsgService.handleError));
     }

      getFeedbackIds(): Observable<number[] | any> {
        return this.getFeedbacks().pipe(map(feedbacks => feedbacks.map(feedback => feedback.email)))
        .pipe(catchError(error => error));
      }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(feedback);
    return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

}
