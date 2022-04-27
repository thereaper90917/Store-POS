const setupEvents = require("./installers/setupEvents");
if (setupEvents.handleSquirrelEvent()) {
  return;
}

const server = require("./server");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const contextMenu = require("electron-context-menu");

// Live Reload
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  awaitWriteFinish: true
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1200,
    frame: false,
    minWidth: 1200,
    minHeight: 750,
    webPreferences: {
      preload: path.join(__dirname, 'public/preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  mainWindow.maximize();
  mainWindow.show();

  // mainWindow.loadURL(`file://${path.join(__dirname, "index.html")}`);
  mainWindow.loadURL(`file://${path.join(__dirname, "public/index.html")}`);
  // mainWindow.loadURL('http://localhost:8001/index.html');

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  require('@electron/remote/main').initialize()
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("app-quit", (evt, arg) => {
  app.quit();
});

ipcMain.on("app-reload", (event, arg) => {
  mainWindow.reload();
});

contextMenu({
  prepend: (params, browserWindow) => [
    {
      label: "DevTools",
      click(item, focusedWindow) {
        focusedWindow.toggleDevTools();
      },
    },
    {
      label: "Reload",
      click() {
        mainWindow.reload();
      },
      // },
      // {  label: 'Quit',  click:  function(){
      //    mainWindow.destroy();
      //     mainWindow.quit();
      // }
    },
  ],
});
