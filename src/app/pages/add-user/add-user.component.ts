import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() isModal: boolean = false; // true if opened as modal
  @Input() userData: User | null = null; 
  @Output() formSubmit = new EventEmitter<User>();
  @Output() closeModal = new EventEmitter<void>();

  userForm!: FormGroup;
  isEdit = false;
  usernames: string[] = ['alpha', 'beta', 'gamma', 'delta'];

  constructor(private fb: FormBuilder, private usersService: UsersService,private router: Router) {}

  ngOnInit(): void {
    this.isEdit = !!this.userData;

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
      height: [this.userData?.height || null],
      weight: [this.userData?.weight || null]
    });

    this.userForm.get('extraFields')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.userForm.get('height')?.setValidators([Validators.required]);
        this.userForm.get('weight')?.setValidators([Validators.required]);
      } else {
        this.userForm.get('height')?.clearValidators();
        this.userForm.get('weight')?.clearValidators();
      }
      this.userForm.get('height')?.updateValueAndValidity();
      this.userForm.get('weight')?.updateValueAndValidity();
    });
  }

  get firstName() { return this.userForm.get('firstName')!; }
  get lastName() { return this.userForm.get('lastName')!; }
  get email() { return this.userForm.get('email')!; }
  get phone() { return this.userForm.get('phone')!; }
  get gender() { return this.userForm.get('gender')!; }
  get birthDate() { return this.userForm.get('birthDate')!; }
  get username() { return this.userForm.get('username')!; }
  get height() { return this.userForm.get('height')!; }
  get weight() { return this.userForm.get('weight')!; }

onSubmit() {
  if (this.userForm.invalid) { this.userForm.markAllAsTouched(); return; }
  const user: User = this.userForm.value;
  if (this.isEdit) this.usersService.updateUser(user);
  else this.usersService.addUser(user);
  this.close();
}

close() {
  if (this.isModal) {
    this.closeModal.emit(); // tells parent to hide modal
  } else {
    // optional: navigate to users page if standalone
    this.router.navigate(['/users']);
  }
}
}
