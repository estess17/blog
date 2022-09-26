export interface IUser {
    name: string;
    email: string;
    role: string;
    _id: string;
    avatar: File | string | null;
    threads: [];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IPost {
    id: number;
    title: string;
    body: string;
    author?: IUser;
    authorId: number;
    comments: [];
    views: number;
    createdAt: Date | string;
    updatedAt: Date | string;
}
