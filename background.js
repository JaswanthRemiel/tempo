chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "preferences",
    title: "Set Preferences",
    contexts: ["action"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "preferences") {
    chrome.action.openPopup();
  }
});
