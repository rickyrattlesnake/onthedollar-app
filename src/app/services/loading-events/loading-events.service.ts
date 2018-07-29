import { Injectable, EventEmitter } from '@angular/core';

export enum LoadingState {
  LOADING,
  IDLE,
}

@Injectable({
  providedIn: 'root'
})
export class LoadingEventsService {

  events: EventEmitter<LoadingState> = new EventEmitter();

  constructor() { }

  startLoading() {
    this.events.emit(LoadingState.LOADING);
  }

  stopLoading() {
    this.events.emit(LoadingState.IDLE);
  }
}
