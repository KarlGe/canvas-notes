import { elementTypes } from 'Models/SlateTypes';
import { Editor, Element, Node, Text, Transforms } from 'slate';

export const isElementType = (element: Node, elementType: elementTypes) => {
  return (
    !Editor.isEditor(element) &&
    Element.isElement(element) &&
    element.type === elementType
  );
};

export const isBoldMarkActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && n.bold === true,
    universal: true,
  });

  return !!match;
};

export const matchBlockOfType = (editor: Editor, elementType: elementTypes) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => isElementType(n, elementType),
  });

  return !!match;
};

export const toggleBoldMark = (editor: Editor) => {
  const isActive = isBoldMarkActive(editor);
  Transforms.setNodes(
    editor,
    { bold: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  );
};

export const toggleBlockType = (editor: Editor, elementType: elementTypes) => {
  const isActive = matchBlockOfType(editor, elementType);
  Transforms.setNodes(
    editor,
    { type: isActive ? null : elementType },
    { match: (n) => Editor.isBlock(editor, n) }
  );
};
