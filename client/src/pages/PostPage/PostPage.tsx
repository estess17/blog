import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import PostsService from '../../services/posts.service';
import {IPost} from '../../utils/interfaces';
import {EditorContent, useEditor} from '@tiptap/react';
import EditorLink from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import avatar from '../../assets/images/avatar.png';
import timeSince from '../../utils/timeSince';
import {CgEye} from 'react-icons/cg';
import {CommentEditor, GoBackBtn} from '../../components';
import Comment from '../../components/Comment/Comment';


function PostPage() {
    const {id} = useParams();
    const [post, setPost] = useState<null | IPost>(null);

    const postEditor = useEditor({
        extensions: [
            StarterKit,
            EditorLink.configure({
                openOnClick: true,
            }),
        ],
        content: '',
        editable: false,
    });


    useEffect(() => {
        if (id) {
            PostsService.getPostById(id).then(res => {
                setPost(res.data);
            });
        }
    }, [id]);

    useEffect(() => {
        if (postEditor && !postEditor.isDestroyed) {
            // @ts-ignore
            postEditor.chain().focus().setContent(post?.body).run();
        }
    }, [postEditor, post]);


    return (
        <div className="flex flex-col lg:w-2/3 w-full mx-auto my-10">
            <GoBackBtn/>

            {post &&
                <>
                    <h1 className="text-4xl text-center font-semibold text-gray-800 dark:text-slate-200">{post.title}</h1>

                    <div className="flex items-center justify-center my-4">
                        <Link to={`user/${post.authorId}`}>
                            <img src={post.author?.avatar || avatar}
                                 alt="avatar"
                                 className="w-10 rounded-full mr-2 ring-2 ring-gray-100 dark:ring-slate-700"/>
                        </Link>
                        <Link to={`user/${post.authorId}`}
                              className="font-medium text-gray-800 dark:text-slate-200">
                            {post.author?.username}
                        </Link>
                        <div className="flex items-center mx-4 text-gray-500 dark:text-slate-400">
                            {timeSince(post.createdAt)}
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-slate-400">
                            <CgEye className="mr-2"/>
                            {post.views} views
                        </div>
                    </div>

                    <EditorContent editor={postEditor}/>

                    <div className="flex my-5">
                        <span className="mr-2 px-1.5 py-1 border border-gray-300 bg-gray-200 text-sm rounded-md cursor-pointer
                                        hover:bg-gray-300 dark:bg-slate-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
                            Web Components
                        </span>
                        <span className="mr-2 px-1.5 py-1 border border-gray-300 bg-gray-200 text-sm rounded-md cursor-pointer
                                        hover:bg-gray-300 dark:bg-slate-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
                            HTML5
                        </span>
                        <span className="mr-2 px-1.5 py-1 border border-gray-300 bg-gray-200 text-sm rounded-md cursor-pointer
                                        hover:bg-gray-300 dark:bg-slate-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
                            JavaScript
                        </span>
                        <span className="mr-2 px-1.5 py-1 border border-gray-300 bg-gray-200 text-sm rounded-md cursor-pointer
                                        hover:bg-gray-300 dark:bg-slate-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
                            Web Development
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-b mt-5 p-5 dark:border-slate-700">
                        <div className="flex">
                            <Link to={`user/${post.authorId}`}>
                                <img src={post.author?.avatar || avatar}
                                     alt="avatar"
                                     className="w-16 rounded-full mr-3 ring-2 ring-gray-100 dark:ring-slate-700"/>
                            </Link>
                            <div>
                                <div className="dark:text-slate-200">WRITTEN BY</div>
                                <Link to={`user/${post.authorId}`}
                                      className="text-xl font-semibold text-gray-800 dark:text-slate-200">
                                    {post.author?.username}
                                </Link>
                            </div>
                        </div>
                        <button
                            className="btn justify-self-end dark:bg-transparent dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800 dark:hover:bg-slate-800">
                            Follow
                        </button>
                    </div>

                    <CommentEditor comments={post.comments}/>
                </>
            }
        </div>
    );
}

export default PostPage;