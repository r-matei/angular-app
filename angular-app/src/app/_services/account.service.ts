import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import usersData from './users.json';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private users: User[] = [];

  constructor(
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
    this.users = usersData;

  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  getAll() {
    return this.users;
  }

  register(user: User) {
    this.users.push(user);
  }

  login(email: string, password: string) {
    let loginUser = this.users.find(user => user.email == email && user.password == password);

    if (loginUser) {
      localStorage.setItem('user', JSON.stringify(loginUser));
      this.userSubject.next(loginUser);
    }

    return loginUser;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }
}
