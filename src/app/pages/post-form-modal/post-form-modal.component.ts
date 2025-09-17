import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-form-modal',
  templateUrl: './post-form-modal.component.html',
  styleUrls: ['./post-form-modal.component.css'],
})
export class PostFormModalComponent implements OnInit {
  @Input() postData!: Post | null;  
  @Output() closeModal = new EventEmitter<void>();

  postForm!: FormGroup;
  isEdit = false;

  constructor(private fb: FormBuilder, private postsService: PostsService) {}

  ngOnInit() {
    this.isEdit = !!this.postData;
    this.postForm = this.fb.group({
      title: [this.postData?.title || '', Validators.required],
      tags: [this.postData?.tags.join(', ') || '', Validators.required],
    });
  }

  onSubmit() {
    if (this.postForm.invalid) return;

    const updatedPost: Post = {
      ...this.postData!,
      title: this.postForm.value.title,
      tags: this.postForm.value.tags.split(',').map((t: string) => t.trim()),
    };

    this.postsService.editPost(updatedPost);
    this.close();
  }

  close() {
    this.closeModal.emit();
  }
}
