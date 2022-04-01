import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  getUserId(): string {
    return '4f34b48e-947c-421a-b5d3-ceb5729c43b8';
  }

}
