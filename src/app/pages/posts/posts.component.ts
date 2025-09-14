import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading: boolean = true;
  error = '';

  searchTerm = '';
  tagsFilter = '';

  currentPage = 1;
  itemsPerPage = 10;

  sort: 'likes' | 'dislikes' | 'views' |''= '';
  sortDirection: 'asc' | 'desc' = 'asc';

  selectedPost = '';
  showModal = '';

  constructor(public postsService: PostsService,private router:Router) {}

  ngOnInit() {
    this.postsService.posts$.subscribe((posts) => {
      this.posts = posts;
    });

    this.postsService.fetchPosts().subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load Posts';
        this.loading = false;
      },
    });
  }


  // sorting handler
  
  sortData(key:'likes' | 'dislikes' | 'views' ) {
    if (this.sort === key) {
 this.sortDirection= this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    else {
      this.sort = key;
      this.sortDirection = 'asc';
    }
  }


// filter by title & tags

  filteredPosts():Post[] {
    let filtered = [...this.posts];

    // filter by title
    if (this.searchTerm) {
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.tags.join(" ").toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }    

    // filter by tag
    if (this.tagsFilter) {
      filtered = filtered.filter(p => p.tags.includes(this.tagsFilter));
    }

// sorting of reactions,views,userId

    if (this.sort) {
      filtered.sort((a, b) => {
        let valueA: number = 0;
        let valueB: number = 0;

        if (this.sort === 'likes') {
          valueA = a.reactions.likes;
          valueB = b.reactions.likes;
        }
        else if (this.sort === 'dislikes') {
          valueA = a.reactions.dislikes;
          valueB = b.reactions.dislikes;
        }
        else if (this.sort === 'views') {
          valueA = a.views;
          valueB = b.views;
        }

        return this.sortDirection === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
      });
    }

    return filtered;
  };




  // pagination

  totalPages(): number[] {
    const total = Math.ceil(this.filteredPosts().length / this.itemsPerPage);
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  paginatedPosts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredPosts().slice(start, end);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages().length) {
      this.currentPage = page;
    }
  }

  // Action Logic

  editPost(id: number) {

  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postsService.deletePost(id);
    }
  }

}
