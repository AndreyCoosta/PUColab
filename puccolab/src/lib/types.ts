export type Comment = { author: string; body: string; date: string };

type Base = {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  author: string;
  date: string;
  score: number;
  comments: Comment[];
};
export type Material = Base & {
  kind: "material";
  docType: string;
  description: string;
  pages: number;
  downloads: number;
};
export type Post = Base & { kind: "post"; tag: string; body: string };
export type Item = Material | Post;
export type Subject = { code: string; name: string; dept: string };
