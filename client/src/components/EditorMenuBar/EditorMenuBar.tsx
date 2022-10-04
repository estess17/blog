import React, {useCallback} from 'react';
import './editorMenuBar.css';
import {
    FaBold,
    FaItalic,
    FaStrikethrough,
    FaCode,
    FaParagraph,
    FaListUl,
    FaListOl,
    FaFileCode,
    FaQuoteRight, FaUndo, FaRedo, FaLink, FaUnlink,
} from 'react-icons/fa';
import {MdFormatClear, MdHorizontalRule, MdLayersClear} from 'react-icons/md';
import {BsFillFileBreakFill} from 'react-icons/bs';


function TextEditorMenu(props: any) {
    const {editor} = props;

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run();

            return;
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({href: url})
            .run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="editor__menu">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleBold().run();
                }}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <FaBold/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <FaItalic/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleStrike().run();
                }}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <FaStrikethrough/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleCode().run();
                }}
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                <FaCode/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().setParagraph().run();
                }}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                <FaParagraph/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({level: 1}).run();
                }}
                className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
            >
                <span>h1</span>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({level: 2}).run();
                }}
                className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
            >
                <span>h2</span>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({level: 3}).run();
                }}
                className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}
            >
                <span>h3</span>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({level: 4}).run();
                }}
                className={editor.isActive('heading', {level: 4}) ? 'is-active' : ''}
            >
                <span>h4</span>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({level: 5}).run();
                }}
                className={editor.isActive('heading', {level: 5}) ? 'is-active' : ''}
            >
                <span>h5</span>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleHeading({level: 6}).run();
                }}
                className={editor.isActive('heading', {level: 6}) ? 'is-active' : ''}
            >
                <span>h6</span>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleBulletList().run();
                }}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <FaListUl/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleOrderedList().run();
                }}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <FaListOl/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleCodeBlock().run();
                }}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
                <FaFileCode/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().toggleBlockquote().run();
                }}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <FaQuoteRight/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                return editor.chain().focus().setHorizontalRule().run();
            }}>
                <MdHorizontalRule/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                return editor.chain().focus().setHardBreak().run();
            }}>
                <BsFillFileBreakFill/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                return editor.chain().focus().undo().run();
            }}>
                <FaUndo/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                return editor.chain().focus().redo().run();
            }}>
                <FaRedo/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                return editor.chain().focus().unsetAllMarks().run();
            }}>
                <MdFormatClear/>
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                return editor.chain().focus().clearNodes().run();
            }}>
                <MdLayersClear/>
            </button>
            <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                <FaLink/>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    return editor.chain().focus().unsetLink().run();
                }}
                disabled={!editor.isActive('link')}
            >
                <FaUnlink/>
            </button>
        </div>
    );
}

export default TextEditorMenu;