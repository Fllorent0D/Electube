const electron = require('electron');
// Module to control application life.
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const ytid = require('get-youtube-id');
const Downloader = require("./Downloader");


let mainWindow;
var dl;

function createWindow () {
  mainWindow = new BrowserWindow({
      width: 430, height: 54,
      titleBarStyle: 'hidden-inset', show: false

  });

  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
  }));
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });
  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  dl = new Downloader(mainWindow);


}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
var i = 0;

ipc.on('playlist', (event, args)=>{
    console.log(args);
    var id = ytid(args);
    mainWindow.webContents.send("new-download", id);

    console.log(id);

    dl.getMP3({videoId: id});


});




