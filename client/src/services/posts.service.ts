import instance from './api-instance';
import authHeader from '../utils/auth-header';


const getPosts = async () => {
    return await instance.get('posts');
};

const getPostById = async (id: string) => {
    return await instance.get(`posts/${id}`);
};


const postsService = {
    getPosts,
    getPostById
};

export default postsService;