'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('ready', function(){
    mainWindow = new BrowserWindow({width: 1280, height: 800, webPreferences: {nodeIntegration: false}});
    mainWindow.loadURL('file://' + __dirname + '/public/index.html');

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
});