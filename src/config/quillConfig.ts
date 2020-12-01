import Quill from 'quill';

export const getEditorOptions = (uuid) => ({
  readOnly: false,
  theme: 'snow',
  modules: {
    toolbar: {
      container: `#toolbar-${uuid}`,
    },
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
});

export const initializeQuill = () => {
  // Add fonts to whitelist
  var Font = Quill.import('formats/font');
  // We do not add Aref Ruqaa since it is the default
  Font.whitelist = ['mirza', 'roboto'];
  Quill.register(Font, true);
};
