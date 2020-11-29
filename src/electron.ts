// src/electron.js
const { app, BrowserWindow, session } = require('electron');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const path = require('path')
const os = require('os')


/* This currently isn't working 
* https://github.com/electron/electron/issues/23662
 */
async function loadExtensions() {
  installExtension(REACT_DEVELOPER_TOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));
}
  
async function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  
  // and load the index.html of the app.
  win.loadFile('index.html');
}
console.log(os.homedir());

app.whenReady().then(loadExtensions).then(createWindow)
