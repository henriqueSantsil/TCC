import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function InputGroupCKEditor({ label, placeholder, name, handleChange, value }) {
    return (
        <div className='mb-3 input-group'>
            <label className='input-group-text'>{label}</label>
            <CKEditor
                editor={ClassicEditor}
                data={value || placeholder}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    handleChange({
                        target: {
                            name: name,
                            value: data
                        }
                    });
                }}
                //... outros props e eventos, se necessário
            />
        </div>
    );
}

export default InputGroupCKEditor;