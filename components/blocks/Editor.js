import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

import { connect } from 'react-redux';
import translations from 'constants/translations';
import uiStruct from 'constants/uiStruct';


const quillSettings = {
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            [{ direction: 'rtl' }],
            ['link'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        }
    },
    formats: [
        'header',
        'bold',
        'italic',
        'strike',
        'underline',
        'list',
        'bullet',
        'indent',
        'direction',
        'link'
    ]
};

const quillSettingsComments = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ direction: 'rtl' }],
            ['link'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        }
    },
    formats: [
        'bold',
        'italic',
        'strike',
        'underline',
        'list',
        'bullet',

        'direction',
        'link'
    ]
};

const errorCSS = {
    editor: 'border-red-400'
};

const Editor = ({
    html,
    handleChange,
    globalState: { lang },
    className,
    placeholder="",
    valError,
    minHeight = 'min-h-96',
    commentMode
}) => {
    const { query, isReady } = useRouter();
    const rtl = !!translations[lang].rtl;
    const quillRef = useRef(23);

    useEffect(() => {

        //if(isReady)
      //  quillRef.current.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rtlClass = rtl ? 'ql-rtl' : '';
    return (
        <div
            className={`text-editor ${minHeight} ${rtlClass} ${
                className || ''
            } text-gray-500 w-full `}
        >
            <div
                className={`z-50 border-2 rounded-lg border-transparent scrollbar-thin scrollbar-thumb-kn-primary-500 scrollbar-track-kn-primary-100 bg-transparent px-4 sm:px-8 ${
                    valError ? errorCSS.editor : ''
                }`}
            >
                { <ReactQuill
                    ref={quillRef}
                    id='kn-quill'
                    theme='snow'
                    placeholder={
                        placeholder || "Start writing..."
                    }
                    value={html}
                    onChange={(html) => handleChange(html)}
                    modules={
                        commentMode
                            ? quillSettingsComments.modules
                            : quillSettings.modules
                    }
                    formats={
                        commentMode
                            ? quillSettingsComments.formats
                            : quillSettings.formats
                    }
                />}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    globalState: state.globalState
});

export default connect(mapStateToProps, null)(Editor);
