import React from 'react';
import {IPost} from '../../utils/interfaces';
import {Link} from 'react-router-dom';
import avatar from '../../assets/images/avatar.png';
import {CgComment, CgEye} from 'react-icons/cg';
import cutText from '../../utils/cutText';
import timeSince from '../../utils/timeSince';
import {useEditor} from '@tiptap/react';
import EditorLink from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';


function Post(props: { post: IPost }) {
    const post = props.post;

    const editor = useEditor({
        extensions: [
            StarterKit,
            EditorLink.configure({
                openOnClick: false,
            }),
        ],
        content: post.body,
        editable: false,
    });

    const body: string | undefined = editor?.getText();

    function cutBody() {
        if (body) {
            return cutText(body, 110);
        } else return 'error';
    }

    return (
        <div className="p-10 rounded-md shadow bg-white dark:bg-slate-800">
            <Link to={`post/${post.id}`}
                  className="block mb-2 text-xl font-semibold text-gray-800 hover:text-gray-600 dark:text-slate-100 dark:hover:text-slate-300">
                {cutText(post.title, 50)}
            </Link>
            <Link to={`post/${post.id}`}
                  className="block text-sm text-gray-500 hover:text-gray-400 dark:text-slate-200 dark:hover:text-slate-400">
                {cutBody()}
            </Link>
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                    <Link to={`user/${post.authorId}`}>
                        <img src={post.author?.avatar || avatar}
                             alt="avatar"
                             className="w-10 rounded-full mr-2 ring-2 ring-gray-100 dark:ring-slate-700"/>
                    </Link>
                    <div>
                        <Link to={`user/${post.authorId}`}
                              className="text-sm font-medium text-gray-800 dark:text-slate-100">
                            {post.author?.username}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{timeSince(post.createdAt)}</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <span className="flex items-center mr-2 text-gray-600 dark:text-slate-500">
                        <CgComment className="mr-1"/> {post?.comments?.length}
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