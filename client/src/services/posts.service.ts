import instance from './api-instance';
import authHeader from '../utils/auth-header';
import {JSONContent} from '@tiptap/react';


const getPosts = async () => {
    return await instance.get('posts');
};

const getPostById = async (id: string) => {
    return await instance.get(`posts/${id}`);
};

const createPost = async (post: { title: string, body: JSONContent }) => {
    return await instance.post('posts', post, {headers: authHeader() as { Authorization: string | any }});
};


const postsService = {
    getPosts,
    getPostById,
    createPost,
};

export default postsService;