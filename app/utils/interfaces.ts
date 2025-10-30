export interface Article {
  id?: number; 
  author_id: number | null;
  tag_id: number | null;
  title: string;
  content: string;
}

export interface Tag {
  id?: number,
  tag: string
}

export interface Author {
  id?: number,
  name: string
}