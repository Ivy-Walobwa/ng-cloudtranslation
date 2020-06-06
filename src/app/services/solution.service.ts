import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Solution } from '../models/solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  data = {
    title: '',
    description: '',
    detail: '',
  };

  constructor(private http: HttpClient) { }

  getSolution(): Observable<Solution> {
    return this.http.get<Solution>('assets/data.json')
      .pipe(
        map(res => {
          this.data.title = res.title;
          this.data.description = res.description;
          this.data.detail = res.detail;
          return this.data;
        })
      );
  }
}