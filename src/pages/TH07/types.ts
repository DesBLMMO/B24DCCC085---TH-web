
export type Tag = {
  id: string;
  name: string;
};


export type Post = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[]; 
  status: "draft" | "published";
  views: number;
  createdAt: string; 
  author: string;
};