import React, {useState} from 'react';
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorLink from '@tiptap/extension-link';
import {EditorMenuBar} from '../../index';


function CommentEditor(props: { comments: any }) {
    const [showEditor, setShowEditor] = useState(false);

    const commentEditor = useEditor({
        extensions: [
            StarterKit,
            EditorLink.configure({
                openOnClick: false,
                validate: href => /^https?:\/\//.test(href),
            }),
        ],
        content: '<p>Comment</p>',
    });


    return (
        <>
            <div className="flex items-center justify-between mt-10 mb-5 p-4 border rounded dark:border-slate-700">
                <h3 className="text-xl font-semibold dark:text-slate-200">Comments</h3>
                <button className="btn dark:bg-transparent dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800 dark:hover:bg-slate-800" onClick={() => setShowEditor(true)}>Write a comment</button>
            </div>

            {showEditor &&
                <div className="border rounded dark:border-slate-700">
                    <EditorMenuBar editor={commentEditor}/>
                    <EditorContent editor={commentEditor}/>

                    <div className="flex items-center justify-end p-2 ">
                        <button className="btn mr-2 dark:bg-transparent dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800 dark:hover:bg-slate-800" onClick={() => setShowEditor(false)}>Cancel</button>
                        <button className="btn bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 dark:focus:ring-offset-slate-800">Post</button>
                    </div>
                </div>
            }
        </>
    );
}

export default CommentEditor;