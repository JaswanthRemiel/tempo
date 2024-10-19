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