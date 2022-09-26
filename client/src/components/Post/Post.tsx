import React from 'react';
import {IPost} from '../../utils/interfaces';
import {Link} from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import {CgComment, CgEye} from 'react-icons/cg';


function Post(props: { post: IPost }) {
    const post = props.post;

    return (
        <div className="p-10 mb-3 rounded-md shadow bg-white dark:bg-slate-800">
            <Link to={`post/${post.id}`}
                  className="block mb-2 text-3xl font-semibold text-gray-800 hover:text-gray-600 dark:text-slate-50 dark:hover:text-slate-300">
                {post.title}
            </Link>
            <Link to={`post/${post.id}`}
                  className="block text-gray-500 hover:text-gray-400 dark:text-slate-200 dark:hover:text-slate-400">
                {post.body}
            </Link>
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                    <Link to={`user/${post.authorId}`}>
                        <img src={avatar} alt="avatar" className="w-10 rounded-full mr-2"/>
                    </Link>
                    <div>
                        <Link to={`user/${post.authorId}`} className="font-medium text-gray-800 dark:text-slate-100">
                            Dario Lelardi
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-slate-400">23 minutes ago</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <span className="flex items-center mr-2 text-gray-600 dark:text-slate-500">
                        <CgComment className="mr-1"/> {post.comments.length}
                    </span>
                    <span className="flex items-center text-gray-600 dark:text-slate-500">
                        <CgEye className="mr-1"/> {post.views}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Post;