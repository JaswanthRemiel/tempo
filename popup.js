document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("preferencesForm");
  const profileList = document.getElementById("profileList");
  const addProfileButton = document.getElementById("addProfileButton");
  const newProfileName = document.getElementById("newProfileName");
  let userPreferences = {};

  loadPreferences();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    savePreferences();
  });

  addProfileButton.addEventListener("click", () => {
    const profileName = newProfileName.value.trim();
    if (profileName && !userPreferences.profiles.includes(profileName)) {
      userPreferences.profiles.push(profileName);
      userPreferences.profileSettings[profileName] = { categoriesToHide: [] };
      newProfileName.value = '';
      updateProfileList();
      savePreferences();
    }
  });

  function savePreferences() {
    const autoCategorization = document.getElementById("autoCategorization").checked;
    const selectedProfile = form.elements.profile.value;
    const categoriesToHide = Array.from(form.elements.categories)
      .filter(input => input.checked)
      .map(input => input.value);

    userPreferences.autoCategorization = autoCategorization;
    userPreferences.selectedProfile = selectedProfile;
    userPreferences.profileSettings[selectedProfile].categoriesToHide = categoriesToHide;

    chrome.storage.sync.set({ userPreferences });
  }

  function loadPreferences() {
    chrome.storage.sync.get(["userPreferences"], (result) => {
      userPreferences = result.userPreferences || { autoCategorization: false, selectedProfile: '', profiles: ['Personal', 'Work', 'Study'], profileSettings: { Personal: { categoriesToHide: [] }, Work: { categoriesToHide: [] }, Study: { categoriesToHide: [] } } };
      updateForm();
    });
  }

  function updateForm() {
    document.getElementById("autoCategorization").checked = userPreferences.autoCategorization;
    updateProfileList();
    loadProfilePreferences();
  }

  function updateProfileList() {
    profileList.innerHTML = '';
    userPreferences.profiles.forEach(profile => {
      const profileElement = document.createElement('div');
      profileElement.className = 'profile';
      profileElement.innerHTML = `
        <label>
          <input type="radio" name="profile" value="${profile}"> ${profile}
        </label>
      `;
      profileList.appendChild(profileElement);
    });

    if (userPreferences.selectedProfile) {
      form.querySelector(`input[name="profile"][value="${userPreferences.selectedProfile}"]`).checked = true;
    }
  }

  function loadProfilePreferences() {
    const selectedProfile = userPreferences.selectedProfile;
    const categoriesToHide = userPreferences.profileSettings[selectedProfile].categoriesToHide;
    form.elements.categories.forEach(input => {
      input.checked = categoriesToHide.includes(input.value);
    });
  }
});
