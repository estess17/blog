import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PostsService from '../../services/posts.service';
import {IPost} from '../../utils/interfaces';


function PostPage() {
    const {id} = useParams();
    const [post, setPost] = useState<null | IPost>(null);


    useEffect(() => {
        if (id) {
            PostsService.getPostById(id).then(res => {
                setPost(res.data);
            });
        }
    }, [id]);

    return (
        <div className="container">
            <h1 className="text-4xl text-center font-semibold mt-5 text-gray-800">{post?.title}</h1>
            <div>
                
            </div>
        </div>
    );
}

export default PostPage;