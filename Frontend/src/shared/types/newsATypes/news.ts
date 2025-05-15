export type News = {
    id: string;
    title: string;
    content: string;
    image:string;
    category:string;
};

export type UpdateNewsDto = {
    title:string;
    content:string;
    category: "general" | "event" | "promotion";
}
