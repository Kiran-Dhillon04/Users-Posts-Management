import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() isModal: boolean = false;
  @Input() userData: User | null = null;
  @Output() closeModal = new EventEmitter<void>();

  userForm!: FormGroup;
  isEdit = false;
  usernames: string[] = ['user1', 'user2', 'user3', 'user4'];
  showExtraFields = false; 

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.isEdit = !!this.userData;

    // form group and controls
    this.userForm = this.fb.group({
      id: [this.userData?.id || Date.now()],
      firstName: [this.userData?.firstName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [this.userData?.lastName || '', Validators.required],
      email: [this.userData?.email || '', [Validators.required, Validators.email]],
      phone: [this.userData?.phone || '', Validators.required],
      gender: [this.userData?.gender || '', Validators.required],
      birthDate: [this.userData?.birthDate || '', Validators.required],
      username: [this.userData?.username || '', Validators.required],
      extraFields: [!!(this.userData?.height || this.userData?.weight)],
      height: [this.userData?.height || ''],
      weight: [this.userData?.weight || '']
    });

    // Set the toggle based on existing data
    this.showExtraFields = !!(this.userData?.height || this.userData?.weight);
  }

  onExtraFieldsChange() {
    this.showExtraFields = !this.showExtraFields;
    if (!this.showExtraFields) {
      this.userForm.get('height')?.setValue('');
      this.userForm.get('weight')?.setValue('');
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: User = this.userForm.value;

    if (this.isEdit) this.usersService.editUser(user);
    else this.usersService.addUser(user);

    this.close();
  }

  close() {
    if (this.isModal) this.closeModal.emit();
    else this.router.navigate(['/users']);
  }
}
