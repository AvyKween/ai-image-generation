
export type Base64<imageType extends string> = `data:image/${imageType};base64${string}`

export interface Post {
    _id: string;
    name: string;
    prompt: string;
    photo: Base64<'jpg'>;
}

export interface CardGridType {
    data: Post[],
    title: string
}

export interface GetPosts {
    ok: boolean,
    posts: Post[]
}

export interface CreateImage {
    ok: boolean,
    photo: string
}