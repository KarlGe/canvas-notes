import styled from 'styled-components';
import ElementPosition from 'Models/ElementPosition';
import { settings } from 'Config/baseConfig';


type StyledProps = {
  elementPosition: ElementPosition;
  parentOffset: ElementPosition;
  dragging: Boolean;
  currentIncrement: number;
  editing: Boolean;
  isActive: Boolean;
};

const borderWidth = 1;
const headerColor = '#0178ba';
const headerDarkColor = '#00598a';
const borderColor = '#ccc';

export const EditorWrapper = styled.div.attrs((props: StyledProps) => ({
  style: {
    ...props.elementPosition.getIncrementedStyle(
      props.currentIncrement,
      props.parentOffset
    ),
    width: '250px',
  },
}))`
  position: absolute;
  z-index: 0;
  box-sizing: border-box;
  &:hover {
    .header {
      background: ${(props) => !props.editing && headerColor};
      cursor: move;
    }
    .editable-container {
      border: ${borderWidth}px solid ${borderColor};
    }
  }
  .debug {
    display: none;
    position: absolute;
    width: max-content;
    top: -${settings.sizes.editorHeaderHeight * 2}px;
    z-index: 0;
  }
  .header {
    height: ${settings.sizes.editorHeaderHeight}px;
    background: ${(props: StyledProps) =>
      props.dragging && !props.editing ? headerColor : 'transparent'};
    position: absolute;
    top: -${settings.sizes.editorHeaderHeight}px;
    left: 0;
    right: 0;
    .close-button {
      display: none;
      position: absolute;
      right: 0;
      height: 100%;
      border: none;
      background: ${headerColor};
      border-left: 1px solid ${headerDarkColor};
      &:hover {
        background: ${headerDarkColor};
      }
      > svg:hover {
        cursor: pointer;
      }
    }
    &:hover {
      background: ${headerColor};
      .close-button {
        display: block;
      }
    }
  }
  .editable-container {
    box-sizing: border-box;
    border: ${(props) =>
      props.editing || props.isActive
        ? `${borderWidth}px solid ${borderColor} !important`
        : `${borderWidth}px solid transparent`};
  }
`;
