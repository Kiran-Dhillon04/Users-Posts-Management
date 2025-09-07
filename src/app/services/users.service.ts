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

  // ✅ Fetch users from API ONCE if no localStorage
  fetchUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(this.apiUrl).pipe(
      tap(res => {
        // Save API users to localStorage only first time
        if (!localStorage.getItem('users')) {
          this.setUsers(res.users);
        }
      })
    );
  }

  // ✅ Central update function
  private setUsers(users: User[]): void {
    this.usersSubject.next(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  // ✅ Add new user with unique ID
  addUser(user: User): void {
    const current = this.usersSubject.getValue();
    const newId = current.length > 0 ? Math.max(...current.map(u => u.id)) + 1 : 1;
    const newUser = { ...user, id: newId };

    const updated = [...current, newUser];
    this.setUsers(updated);
  }

  // ✅ Update user
  updateUser(updatedUser: User): void {
    const updatedList = this.usersSubject.getValue().map(u =>
      u.id === updatedUser.id ? { ...u, ...updatedUser } : u
    );
    this.setUsers(updatedList);
  }

  // ✅ Delete user
  deleteUser(id: number): void {
    const updatedList = this.usersSubject.getValue().filter(u => u.id !== id);
    this.setUsers(updatedList);
  }

  /** Return a single user by id.
 *  First check local BehaviorSubject (localStorage), then fallback to API.
 */
getUserById(id: number) {
  const current = this.usersSubject.getValue();
  const found = current.find(u => u.id === id);
  if (found) {
    // return an observable of the local user (keeps UI reactive)
    return of(found);
  }

  // fallback to API (dummyjson) if not in local list
  return this.http.get<any>(`https://dummyjson.com/users/${id}`).pipe(
    // do not overwrite local storage automatically; just return the API result.
    catchError(err => {
      // rethrow or return of(null) depending on how you handle errors
      throw err;
    })
  );
}

}
