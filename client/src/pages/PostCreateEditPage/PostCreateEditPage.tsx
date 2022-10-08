import React, {FormEvent, useEffect, useState} from 'react';
import {useEditor, EditorContent, JSONContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {EditorMenuBar, GoBackBtn} from '../../components';
import EditorLink from '@tiptap/extension-link';
import {useAppDispatch} from '../../utils/hooks';
import {create, update} from '../../store/asyncActions/posts.actions';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {CodeBlockLowlight} from '@tiptap/extension-code-block-lowlight';
import {lowlight} from 'lowlight'
import PostsService from "../../services/posts.service";
import {IPost} from "../../utils/interfaces";


function PostCreateEditPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [post, setPost] = useState<null | IPost>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const createEditor = useEditor({
        extensions: [
            StarterKit,
            EditorLink.configure({
                openOnClick: false,
                validate: href => /^https?:\/\//.test(href),
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: '<p>Post body</p>',
    });

    const editEditor = useEditor({
        extensions: [
            StarterKit,
            EditorLink.configure({
                openOnClick: false,
                validate: href => /^https?:\/\//.test(href)
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: '',
    });

    useEffect(() => {
        if (id) {
            PostsService.getPostById(id).then(res => {
                setPost(res.data);
                setTitle(res.data.title);
            });
        }
    }, [id]);

    useEffect(() => {
        if (editEditor && !editEditor.isDestroyed) {
            editEditor.chain().focus().setContent(post?.body!).run();
        }
    }, [editEditor, post]);


    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const body: JSONContent | undefined = id ? editEditor?.getJSON() : createEditor?.getJSON();

        if (title.trim() && body) {
            if (id) {
                dispatch(update({post: {title, body}, id}));
            } else {
                dispatch(create({title, body}));
            }
            navigate(-1);
        } else {
            toast.error('Fill all fields!');
        }
    }

    return (
        <div className="lg:w-2/3 w-full mx-auto my-10">
            <GoBackBtn/>
            <div className="flex flex-col my-5 py-5 px-10 rounded bg-white dark:bg-slate-800">
                <h1 className="text-2xl font-semibold text-gray-800 my-4 dark:text-slate-100">{id ? 'Edit' : 'Create'} post</h1>
                <input className="input"
                       type="text"
                       placeholder="Post title"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />

                <div className="mt-4 border rounded dark:border-slate-700">
                    <EditorMenuBar editor={id ? editEditor : createEditor}/>
                    <EditorContent editor={id ? editEditor : createEditor}/>
                </div>

                <button
                    className="btn self-end mt-4 bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 dark:focus:ring-offset-slate-800"
                    type="submit"
                    onClick={handleSubmit}
                >
                    {id ? 'Edit' : 'Create'}
                </button>
            </div>

        </div>
    );
}

export default PostCreateEditPage;
