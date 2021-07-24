import ipcMessages from 'Helpers/ipcMessages';
const { ipcMain } = require('electron');
var levelup = require('levelup');
var leveldown = require('leveldown');

export function setupStore() {
  var db = levelup(leveldown('./documents-db'));
  console.log("Testing testing 123");
  
  console.log("Setting up DB");
  
  ipcMain.on(ipcMessages.getAllMessage, (event, arg) => {
    console.log(arg); // prints "ping"
    event.reply(ipcMessages.getAllReply, 'pong');
  });
  //   // 2) Put a key & value
  //   db.put('name', 'levelup', function (err) {
  //     if (err) return console.log('Ooops!', err); // some kind of I/O error

  //     // 3) Fetch by key
  //     db.get('name', function (err, value) {
  //       if (err) return console.log('Ooops!', err); // likely the key was not found

  //       // Ta da!
  //       console.log('name=' + value);
  //     });
  //   });
}
