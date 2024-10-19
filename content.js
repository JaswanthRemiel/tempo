(async function() {
  const userPreferences = await getUserPreferences();
  const webContent = document.body.innerText; // Simplified example

  let categorizedContent = {};
  if (userPreferences.autoCategorization) {
    categorizedContent = categorizeContentAuto(webContent);
  } else {
    categorizedContent = categorizeContent(webContent);
  }

  const profileSettings = userPreferences.profileSettings[userPreferences.selectedProfile];
  for (const [category, elements] of Object.entries(categorizedContent)) {
    if (profileSettings.categoriesToHide.includes(category)) {
      elements.forEach(element => element.style.display = 'none');
    }
  }

  function categorizeContent(content) {
    // Example categorization logic
    const categories = {
      "News": [],
      "Sports": [],
      "Entertainment": [],
      // Add more categories as needed
    };

    // Categorize elements (simplified)
    document.querySelectorAll("*").forEach(element => {
      if (element.innerText.includes("news")) {
        categories.News.push(element);
      } else if (element.innerText.includes("sports")) {
        categories.Sports.push(element);
      } // Add more conditions as needed
    });

    return categories;
  }

  function categorizeContentAuto(content) {
    // Implement auto-categorization using browsing data and ML model
    const categories = {
      "News": [],
      "Sports": [],
      "Entertainment": [],
      // Add more categories
    };

    // Auto-categorize elements (simplified)
    document.querySelectorAll("*").forEach(element => {
      if (element.innerText.includes("news")) {
        categories.News.push(element);
      } else if (element.innerText.includes("sports")) {
        categories.Sports.push(element);
      } // Add more conditions as needed
    });

    return categories;
  }

  async function getUserPreferences() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["userPreferences"], (result) => {
        resolve(result.userPreferences || { profiles: [], selectedProfile: '', profileSettings: {} });
      });
    });
  }
})();
