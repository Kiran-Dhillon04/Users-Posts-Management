import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  private apiUrl = 'https://dummyjson.com/posts?limit=50';

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('posts');

    if (saved) {
      this.postsSubject.next(JSON.parse(saved));
    }
    this.fetchPosts().subscribe();
  }

  // fetching posts from API
  fetchPosts(): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(this.apiUrl).pipe(
      tap((res) => {
        if (!localStorage.getItem('posts')) {
          this.setPosts(res.posts);
        }
      })
    );
  }

  // centeral function that emit to local storage and BehaviorSubject
  private setPosts(posts: Post[]) {
    this.postsSubject.next(posts);
    localStorage.setItem('Posts', JSON.stringify(posts));
  }

  addPost(post: Post[]) {
    const current = this.postsSubject.getValue();
    const newId =
      current.length > 0 ? Math.max(...current.map((p) => p.id)) + 1 : 1;
    const newPost = { ...post, id: newId };

    const updateList = [...current, ...newPost];
    this.setPosts(updateList);
  }

  editPost(editedPost: Post) {
    const updatedList = this.postsSubject
      .getValue()
      .map((p) => (p.id === editedPost.id ? { ...p, ...editedPost } : p));
    this.setPosts(updatedList);
  }

  deletePost(id: number) {
    const update = this.postsSubject.getValue().filter((p) => p.id !== id);
    this.setPosts(update);
  }

  // Posts per User
getPostsByUserId(userId: number): Observable<Post[]> {
  return this.http
    .get<{ posts: Post[] }>(`https://dummyjson.com/users/${userId}/posts`)
    .pipe(map(res => res.posts));
}
}
