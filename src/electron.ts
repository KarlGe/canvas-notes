// src/electron.js
const { app, BrowserWindow, session } = require('electron');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer');
const path = require('path');
const os = require('os');
const { setupStore } = require('MainProcess/store/store');

async function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // TODO: This should probably be replaced with preloading
      // https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  win.loadFile('index.html');
}
setupStore();
console.log(os.homedir());

app
  .whenReady()
  .then(() => {
    installExtension(REACT_DEVELOPER_TOOLS, {
      loadExtensionOptions: { allowFileAccess: true },
    })
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  })
  .then(createWindow);
