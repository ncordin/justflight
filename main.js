'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const isDev =
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath);

let mainWindow;

function createWindow() {
  const appWidth = 450;
  const appHeight = 600;

  mainWindow = new BrowserWindow({
    width: isDev ? appWidth + 500 : appWidth,
    height: appHeight,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;
  if (isDev) {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:3000',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'build', 'index.html'),
      slashes: true,
    });
  }
  mainWindow.loadURL(indexPath);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
