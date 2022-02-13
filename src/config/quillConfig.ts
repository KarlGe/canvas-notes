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
