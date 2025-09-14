import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-per-user',
  templateUrl: './posts-per-user.component.html',
  styleUrls: ['./posts-per-user.component.css']
})
export class PostsPerUserComponent implements OnInit {
  userPosts:Post[] = [];
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute,private postsService:PostsService, private router:Router) { }
  
ngOnInit() {
  const userIdParam = this.route.snapshot.paramMap.get('userId');
  console.log(userIdParam);
  const userId = userIdParam ? Number(userIdParam) : null;
  if (!userId) {
    this.error = "Invalid UserId!!";
    this.loading = false;
    return;
  }

  this.postsService.getPostsByUserId(userId).subscribe({
    next: posts => {
      this.userPosts = posts;
      this.loading = false;
    },
    error: () => {
      this.error = "Failed to fetch detail!";
      this.loading = false;
    }
  });
    console.log("UserId:", userId, "Posts:", this.userPosts);
}

  backToList() {
    this.router.navigate(['/posts']);
  }
}
