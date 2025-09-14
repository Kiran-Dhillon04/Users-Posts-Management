import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-chart',
  templateUrl: './post-chart.component.html',
  styleUrls: ['./post-chart.component.css'],
})
export class PostChartComponent implements OnInit {
  PostsPerTagChartData: any;
  viewsChartData: any;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.posts$.subscribe((posts) => {
      this.preparePostsPerTagBarChart(posts);
      this.prepareViewsLineChart(posts);
    });
  }

  preparePostsPerTagBarChart(posts: Post[]) {
    const group: any = {};

      posts.forEach(p => {
          p.tags.forEach(tags => {
              if (group[tags]) {
                  group[tags]++;
              }
              else {
                  group[tags] = 1;
              }
    })
})
    this.PostsPerTagChartData = {
      labels: Object.keys(group),
      datasets: [
        {
          label: 'Posts Per Tag',
          data: Object.values(group),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
      ],
    };
  }

  prepareViewsLineChart(posts: Post[]) {
    const viewsBucket: any = {
      '<1000': 0,
      '1000-1999': 0,
      '2000-2999': 0,
      '3000-3999': 0,
      '4000+': 0,
    };
    posts.forEach((p) => {
      if (p.views < 1000) viewsBucket['<1000']++;
      else if (p.views < 2000) viewsBucket['1000-1999']++;
      else if (p.views < 3000) viewsBucket['2000-2999']++;
      else if (p.views < 4000) viewsBucket['3000-3999']++;
      else {
        viewsBucket['4000+']++;
      }
    });

    this.viewsChartData = {
      labels: Object.keys(viewsBucket),
      datasets: [
        {
          label: 'Posts per Views ',
          data: Object.values(viewsBucket),
          backgroundColor: 'rgb(75, 192, 192)',
        },
      ],
    };
  }
}
