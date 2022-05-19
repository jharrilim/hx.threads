export interface Reaction {
  name: string;
  type: 'like' | 'love';
}

export interface Comment {
  text: string;
  avatar: string;
  name: string;
  badge?: {
    icon?: string;
    text: string;
  };
  postedAt: string;
  reactions?: Reaction[];
}

export interface Thread {
  comments: Comment[];
}