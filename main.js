const { app, BrowserWindow, Menu, shell } = require('electron');
function create() {
  Menu.setApplicationMenu(null);
  const w = new BrowserWindow({
    width: 1100, height: 700, backgroundColor: '#000000',
    autoHideMenuBar: true, icon: __dirname + '/icon.ico', title: 'N0-1S Player',
    webPreferences: { autoplayPolicy: 'no-user-gesture-required' }
  });
  w.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  w.loadFile('index.html');
  w.on('page-title-updated', e => e.preventDefault());
  w.webContents.on('before-input-event', (e, i) => {
    if (i.type === 'keyDown' && i.key === 'F11') { w.setFullScreen(!w.isFullScreen()); e.preventDefault(); }
  });
}
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
