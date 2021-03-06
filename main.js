const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win;

function createWindow () {
    win = new BrowserWindow({
    width: config.width,
    height: config.height,
    // frame: false,
    titleBarStyle: 'customButtonsOnHover',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setAutoHideMenuBar(true)
  win.loadFile('./index.html')
}

function toggleDevTools() {
  win.webContents.toggleDevTools()
}

function loadURL() {
  win.webContents.loadURL(config.url2)
}

function server() {
  win.webContents.loadFile('./index.html')
}

function reload() {
  win.webContents.reload()
}

function createShortcuts() {
    globalShortcut.register('F12', toggleDevTools)
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
    globalShortcut.register('F11', fullScreen)
    globalShortcut.register('CmdOrCtrl+T', loadURL)
    globalShortcut.register('CmdOrCtrl+Shift+T', server)
    globalShortcut.register('F5', reload)
}

function fullScreen() {
    win.isSimpleFullScreen() ? win.setSimpleFullScreen(false) : win.setSimpleFullScreen(true);
  }

app.whenReady()
.then(createWindow)
.then(createShortcuts)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
