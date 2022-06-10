import { elementTypes } from 'Models/SlateTypes';
import { Descendant, Editor, Element, Node, Text, Transforms } from 'slate';

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

/**
 * We consider descendants empty if we can't find a node that contains any content, even if there
 * are multiple nodes (i.e. linebreaks)
 * @param content : List of descendants;
 * @returns boolean
 */
export const isDescendantsEmpty = (content: Descendant[]) => {
  if (content.find((node) => Node.string(node) !== '')) {
    return false;
  }
  return true;
};
