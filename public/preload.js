const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  quitApp: () => ipcRenderer.send('app-quit', ''),
  reloadApp: () => ipcRenderer.send('app-reload', ''),
})