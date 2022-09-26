import React from 'react';
import {useAppSelector} from '../../utils/hooks';
import {Post} from '../../components';


function MainPage() {
    const {posts} = useAppSelector(state => state.posts);

    return (
        <div className="container grid grid-cols-3 gap-4 p-8">
            <div className="col-span-2">
                {posts.map(post => <Post key={post.id} post={post}/>)}
            </div>
            <div className="border rounded-md dark:border-slate-800">

            </div>
        </div>
    );
}

export default MainPage;