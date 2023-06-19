chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "resizeWindow") {
        chrome.windows.getCurrent(function (window) {
            const newWidth = Math.round(window.width * 0.8);
            chrome.windows.update(window.id, { width: newWidth });
        });
    }
});