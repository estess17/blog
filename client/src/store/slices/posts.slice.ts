import {createSlice} from '@reduxjs/toolkit';
import {IPost} from '../../utils/interfaces';


interface postsState {
    posts: IPost[],
    isLoading: boolean
}

const initialState: postsState = {
    posts: [
        {
            id: 1,
            title: 'Migrating a Large Production App From TypeORM To Prisma',
            body: 'One of the last projects we worked on at Myothis is a property management system for a big client. It\'s a pretty large codebase, and we built the backend with the NestJS framework, which is database agnostic but provides strong integration with TypeO...',
            authorId: 2,
            comments: [],
            views: 12,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: 2,
            title: 'Schema-Based Multi-Tenancy with NestJS and Prisma',
            body: 'We recently migrated a big NestJS project to adopt Prisma as the ORM. It turned out to be a great decision, and I described our wonderful experience in a recent blog post.',
            authorId: 3,
            comments: [],
            views: 0,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: 3,
            title: 'Migrating a Large Production App From TypeORM To Prisma',
            body: 'One of the last projects we worked on at Myothis is a property management system for a big client. It\'s a pretty large codebase, and we built the backend with the NestJS framework, which is database agnostic but provides strong integration with TypeO...',
            authorId: 2,
            comments: [],
            views: 12,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: 4,
            title: 'Schema-Based Multi-Tenancy with NestJS and Prisma',
            body: 'We recently migrated a big NestJS project to adopt Prisma as the ORM. It turned out to be a great decision, and I described our wonderful experience in a recent blog post.',
            authorId: 3,
            comments: [],
            views: 0,
            createdAt: '',
            updatedAt: '',
        },
        {
            id: 5,
            title: 'Migrating a Large Production App From TypeORM To Prisma',
            body: 'One of the last projects we worked on at Myothis is a property management system for a big client. It\'s a pretty large codebase, and we built the backend with the NestJS framework, which is database agnostic but provides strong integration with TypeO...',
            authorId: 2,
            comments: [],
            views: 12,
            createdAt: '',
            updatedAt: '',
        }
    ],
    isLoading: false,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {},
});


export default postsSlice.reducer;