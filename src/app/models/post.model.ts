export interface Post {
  id: number;
  title: string;
  tags:string [];
  reactions:{
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}
