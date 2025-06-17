export type News = {
  id: string;
  title: string;
  content: string;
  image: string;
  category: "general" | "promotion" | "event";
};

export type NewsDataProps = {
  page: number;
  pages: number;
  countItems: number;
  entities: News[];
};

export type UpdateNewsDto = {
  title: string;
  content: string;
  category: "general" | "event" | "promotion";
};
