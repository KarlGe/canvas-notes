import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import EditorData from '../Models/EditorData';
import ElementPosition from '../Models/ElementPosition';
import Editor from './Editor';

const Document = styled.div`
  width: 100%;
  height: 100%;
  .documentContent {
    width: 100%;
    height: 100%;
    background-color: #eee;
    position: relative;
  }
`;

function Page(props: { title: string }) {
  const { title } = props;
  const contentRef = useRef(null);
  const [editors, setEditors] = useState<EditorData[]>([]);
  const [mouseDownEvent, setMouseDownEvent] = useState(null);

  const documentMouseDown = (e) => {
    setMouseDownEvent(e);
    const { offsetTop, offsetLeft } = contentRef.current;

    const { clientX, clientY } = e;

    const editorData = new EditorData(
      new ElementPosition(clientX - offsetLeft, clientY - offsetTop),
      e.target
    );
    setEditors((prevEditors) => [...prevEditors, editorData]);
  };
  const editorElements = editors.map((editor) => (
    <Editor editorData={editor} initialEvent={mouseDownEvent} currentIncrement={20} />
  ));
  return (
    <Document>
      <h1>{title}</h1>
      <div
        className="documentContent"
        ref={contentRef}
        onMouseDown={documentMouseDown}
      >
        {editorElements}
      </div>
    </Document>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
