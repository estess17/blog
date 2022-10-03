export interface IUser {
    username: string;
    email: string;
    role: string;
    _id: string;
    avatar: string | null;
    threads: [];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IPost {
    id: number;
    title: string;
    body: JSON;
    author?: IUser;
    authorId: number;
    comments: [];
    views: number;
    createdAt: Date | string;
    updatedAt: Date | string;
}


export interface ILoginFormInputs {
    email: string;
    password: string;
}

export interface IRegisterFormInputs {
    username: string;
    email: string;
    password: string;
}
