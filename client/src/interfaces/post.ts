
export interface Post {
    _id: string;
    createdAt: number;
}

export interface CardGridType {
    data: Post[],
    title: string
}
