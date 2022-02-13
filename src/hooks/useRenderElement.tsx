import { elementTypes } from 'Models/SlateTypes';
import React, { useCallback } from 'react';
import { DefaultElement } from 'slate-react';
import CodeElement from 'src/Components/EditorElements/CodeElement';

export const renderElements = {
  [elementTypes.paragraph]: DefaultElement,
  [elementTypes.code]: CodeElement,
};
export const useRenderElement = () => {
  const renderElement = useCallback((props) => {
    let CurrentElement = renderElements[props.element.type];
    if (!CurrentElement) {
      CurrentElement = DefaultElement;
    }
    return <CurrentElement {...props} />;
  }, []);

  return renderElement;
};
