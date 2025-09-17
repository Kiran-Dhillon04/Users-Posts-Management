import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private apiUrl = 'https://dummyjson.com/users?limit=50';

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('users');
    if (saved) {
      this.usersSubject.next(JSON.parse(saved));
    } else {
      this.fetchUsers().subscribe();
    }
  }

  // fetching data from API
  fetchUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(this.apiUrl).pipe(
      tap(res => {
        if (!localStorage.getItem('users')) {
          this.setUsers(res.users);
        }
      })
    );
  }

  // Central update function
  private setUsers(users: User[]) {
    this.usersSubject.next(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Add new user with creating new id
  addUser(user: User) {
    const current = this.usersSubject.getValue();
    const newId = current.length > 0 ? Math.max(...current.map(u => u.id)) + 1 : 1;
    const newUser = { ...user, id: newId };

    const updated = [...current, newUser];
    this.setUsers(updated);
  }

  // Update user
 editUser(editedUser: User) {
    const updatedList = this.usersSubject.getValue().map(u =>
      u.id === editedUser.id ? { ...u, ...editedUser } : u
    );
    this.setUsers(updatedList);
  }

  // Delete user
  deleteUser(id: number){
    const updatedList = this.usersSubject.getValue().filter(u => u.id !== id);
    this.setUsers(updatedList);
  }


  // userDetail: Return a single user by id.
getUserById(id: number) {
  return this.http.get<any>(`https://dummyjson.com/users/${id}`);
}

}
