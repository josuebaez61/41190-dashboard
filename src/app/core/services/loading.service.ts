import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading$ = new BehaviorSubject(false);

  constructor() { }

  getIsLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setIsLoading(value: boolean): Observable<boolean>{
    this.loading$.next(value);
    return this.getIsLoading();
  }
}
