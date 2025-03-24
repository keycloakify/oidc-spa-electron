import { app, BrowserWindow, shell } from "electron";

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        width: 1920,
        height: 1080
    });

    // Load the Vite dev server URL
    win.loadURL("http://localhost:5173");

    // Handle new window creation (e.g., target="_blank")
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
    });

    // Handle all other navigation attempts
    win.webContents.on("will-navigate", (event, url) => {
        if (!url.startsWith("http://localhost:5173")) {
            event.preventDefault();
            shell.openExternal(url);
        }
    });
}

// Register the onyxia:// protocol handler
app.setAsDefaultProtocolClient("onyxia");

// Handle the protocol callback
app.on("open-url", (event, url) => {
    event.preventDefault();

    const newUrl = new URL("http://localhost:5173/");

    for (const [key, value] of new URL(url).searchParams.entries()) {
        newUrl.searchParams.set(key, value);
    }

    win!.loadURL(newUrl.href);
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    win = null;
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
