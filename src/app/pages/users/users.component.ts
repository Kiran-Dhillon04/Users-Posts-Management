import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  loading = true;
  error = '';

  searchTerm = '';
  genderFilter = '';
  ageFilter = '';

  sort: 'age' | 'phone' | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  currentPage = 1;
  itemsPerPage = 10;

  showModal = false;
  selectedUser: User | null = null; 

  constructor(public usersService: UsersService) {}

  ngOnInit(){
    // Subscribe to BehaviorSubject for live updates
    this.usersService.users$.subscribe(users => this.users = users);

    // Fetch users from API
    this.usersService.fetchUsers().subscribe({
      next: () => this.loading = false,
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }
//  Calculate age from birth date 
  getAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

    //  Sorting handler 
  sortData(key: 'age' | 'phone') {
    if (this.sort === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.sort = key;
      this.sortDirection = 'asc';
    }
  }



  //  Filter, search, and sort users 
  filteredUsers(): User[] {
    let filtered = [...this.users];

    // Search by name/email
    if (this.searchTerm) {
      filtered = filtered.filter(u =>
        u.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by gender
    if (this.genderFilter) filtered = filtered.filter(u => u.gender === this.genderFilter);

    // Filter by age
    if (this.ageFilter) {
      filtered = filtered.filter(u => {
        const age = this.getAge(u.birthDate);
        switch (this.ageFilter) {
          case 'below30': return age < 30;
          case '30to40': return age >= 30 && age < 40;
          case '40to50': return age >= 40 && age < 50;
          case '50to60': return age >= 50 && age < 60;
          case 'above60': return age >= 60;
          default: return true;
        }
      });
    }

    // Sorting
    if (this.sort) {
      filtered.sort((a, b) => {
        let valueA: number | string = '';
        let valueB: number | string = '';

        if (this.sort === 'age') {
          valueA = this.getAge(a.birthDate);
          valueB = this.getAge(b.birthDate);
        } else if (this.sort === 'phone') {
          valueA = a.phone;
          valueB = b.phone;
        }

        return this.sortDirection === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
      });
    }

    return filtered;
  }

  // Pagination 
  
    totalPages():number[]{
    const total = Math.ceil(this.filteredUsers().length / this.itemsPerPage);
      const pages = [];
      for (let i = 1; i <= total; i++){
        pages.push(i);
      }
      return pages;
  }

  paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers().slice(start, start + this.itemsPerPage);
  }


  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages().length) this.currentPage = page;
  }

  //  Delete user 
  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(userId);
    }
  }
  
editUser(user: User) { this.selectedUser = user; this.showModal = true; }

closeModal() {
  this.showModal = false;
  this.selectedUser = null;
}
}
