import React, {FormEvent, useState} from 'react';
import {useEditor, EditorContent, JSONContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {EditorMenuBar, GoBackBtn} from '../../components';
import EditorLink from '@tiptap/extension-link';
import {useAppDispatch} from '../../utils/hooks';
import {create} from '../../store/asyncActions/posts.actions';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';


function PostCreateEditPage() {
    const [title, setTitle] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit,
            EditorLink.configure({
                openOnClick: false,
                validate: href => /^https?:\/\//.test(href),
            }),
        ],
        content: '<p>Post body</p>',
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const body: JSONContent | undefined = editor?.getJSON();

        if (title.trim() && body) {
            dispatch(create({title, body}));
            navigate('/');
        } else {
            toast.error('Fill all fields');
        }
    }

    return (
        <div className="lg:w-2/3 w-full mx-auto my-10">
            <GoBackBtn/>
            <div className="flex flex-col my-5 py-5 px-10 rounded bg-white dark:bg-slate-800">
                <h1 className="text-2xl font-semibold text-gray-800 my-4 dark:text-slate-100">Create post</h1>
                <input className="input"
                       type="text"
                       placeholder="Post title"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />

                <div className="mt-4 border rounded dark:border-slate-700">
                    <EditorMenuBar editor={editor}/>
                    <EditorContent editor={editor}/>
                </div>

                <button
                    className="btn self-end mt-4 bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 dark:focus:ring-offset-slate-800"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Create
                </button>
            </div>

        </div>
    );
}

export default PostCreateEditPage;