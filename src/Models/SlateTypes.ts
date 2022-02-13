// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export enum elementTypes {
  paragraph,
  code,
}

export type EditorElement = {
  type: elementTypes.paragraph;
  children: Descendant[];
};
export type CodeElement = { type: elementTypes.code; children: Descendant[] };

export type EditorText = { text: string; bold?: true };

export type CustomElement = EditorElement | CodeElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: EditorText;
  }
}
