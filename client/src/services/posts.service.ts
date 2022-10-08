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

const removePost = async (id: string) => {
    return await instance.delete(`posts/${id}`, {headers: authHeader() as { Authorization: string | any }});
};

const updatePost = async (post: { title: string, body: JSONContent }, id: string) => {
    return await instance.patch(`posts/${id}`, post, {headers: authHeader() as { Authorization: string | any }});
};


const postsService = {
    getPosts,
    getPostById,
    createPost,
    removePost,
    updatePost
};

export default postsService;
