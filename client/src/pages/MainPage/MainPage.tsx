import React from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {Post} from '../../components';
import {useNavigate} from 'react-router-dom';
import {openLogin} from '../../store/slices/modals.slice';


function MainPage() {
    const posts = useAppSelector(state => state.posts.posts);
    const user = useAppSelector(state => state.auth.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleClick() {
        if (user) {
            navigate('create');
        } else {
            dispatch(openLogin());
        }
    }

    return (
        <div className="container mb-5">
            <div
                className="flex justify-between items-center p-4 my-5 bg-white border rounded-md dark:border-slate-800 dark:bg-slate-800">
                <input type="text" className="input"/>
                <button
                    className="btn bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-offset-slate-800"
                    onClick={handleClick}
                >
                    Create a post
                </button>
            </div>
            <div className="grid gap-8 xl:grid-cols-3 lg:grid-cols-2">
                {posts.map(post => <Post key={post.id} post={post}/>)}
            </div>
        </div>
    );
}

export default MainPage;