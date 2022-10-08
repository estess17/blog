import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {Post, PostSkeleton} from '../../components';
import {useNavigate} from 'react-router-dom';
import {openLogin} from '../../store/slices/modals.slice';
import {getAll} from '../../store/asyncActions/posts.actions';


function MainPage() {
    const {posts, isLoading} = useAppSelector(state => state.posts);
    const user = useAppSelector(state => state.auth.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleClick() {
        if (user) {
            navigate('post/create');
        } else {
            dispatch(openLogin());
        }
    }

    useEffect(() => {
        dispatch(getAll());
    }, []);

    return (
        <div className="container mb-5">
            <div
                className="flex flex-col p-4 my-5 bg-white border rounded-md dark:border-slate-800 dark:bg-slate-800 sm:flex-row sm:justify-between sm:items-center">
                <input type="text" className="input mb-2 sm:mb-0"/>
                <button
                    className="btn bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-offset-slate-800"
                    onClick={handleClick}
                >
                    Create a post
                </button>
            </div>
            <div className="grid gap-8 xl:grid-cols-3 lg:grid-cols-2">
                {(posts && posts.length > 0) ?
                    (isLoading ?
                            <>
                                <PostSkeleton/>
                                <PostSkeleton/>
                                <PostSkeleton/>
                            </> :
                            posts.map(post => <Post key={post.id} post={post}/>)
                    ) :
                    <h1 className="text-xl text-center text-gray-800 font-semibold col-span-3 dark:text-slate-200 sm:text-2xl">
                        There are no posts yet :(
                    </h1>
                }
            </div>
        </div>
    );
}

export default MainPage;
