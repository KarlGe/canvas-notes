import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
const editorOptions = {
  readOnly: false,
  // bounds: '.' + gridBem.block(),
  theme: 'bubble',
  modules: {
    toolbar: [
      [
        { header: '1' },
        { header: '2' },
        { font: ['', 'open-sans', 'roboto', 'proza-libre'] },
        { size: ['1em', '1.25em', '1.5em', '2em', '3em', '4em'] },
      ],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: ['', 'center', 'right'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  },
  formats: [
    'align',
    'background',
    'header',
    'font',
    'size',
    'align',
    'bold',
    'italic',
    'underline',
    'strike',
    'script',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'clean',
  ],
};
export default function Editor() {
  const editorRef = useRef();

  const onChange = (value, delta, source) => {
    /* source === api | user */
    if (source === 'api') {
      return;
    }
    console.log(value);
    // this.html = this.editor.root.innerHTML;

    // if (this.onChangeTimeout) {
    //   clearTimeout(this.onChangeTimeout);
    //   this.onChangeTimeout = null;
    // }

    // this.onChangeTimeout = setTimeout(() => this.commitValue(), 300);
  };

  useEffect(() => {
    const editor = new Quill(editorRef.current, editorOptions);
    console.log(editor);
    editor.on('text-change', onChange);
    return () => {};
  }, []);

  return (
    <div>
      <h1>Editor</h1>
      <div ref={editorRef} />
    </div>
  );
}
