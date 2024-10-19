export async function getUserPreferences() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["userPreferences"], (result) => {
      resolve(result.userPreferences || { autoCategorization: false, selectedProfile: '', categoriesToHide: [] });
    });
  });
}

export async function saveUserPreferences(preferences) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ userPreferences: preferences }, () => {
      resolve();
    });
  });
}

export async function getBrowsingData() {
  const history = await new Promise((resolve) => {
    chrome.history.search({ text: '', maxResults: 100 }, (data) => {
      resolve(data);
    });
  });

  const bookmarks = await new Promise((resolve) => {
    chrome.bookmarks.getTree((data) => {
      resolve(data);
    });
  });

  const downloads = await new Promise((resolve) => {
    chrome.downloads.search({ limit: 100 }, (data) => {
      resolve(data);
    });
  });

  return { history, bookmarks, downloads };
}
