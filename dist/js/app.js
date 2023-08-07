// Archivo app.js

function loadLanguageFile(language) {
  return fetch(`/locales/${language}.json`)
    .then(response => response.json())
    .catch(error => console.error('Error loading language file:', error));
}

function getSafeValue(obj, key) {
  return obj && obj[key] !== undefined ? obj[key] : '';
}

function changeLanguage(event) {
  const language = event.target.value;

  loadLanguageFile(language)
    .then(data => {
      const headerElementsToUpdate = document.querySelectorAll('[data-translate]');
      headerElementsToUpdate.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getSafeValue(data, key);
      });
    });
}

const languageSelector = document.getElementById('language-selector');
if (languageSelector) {
  languageSelector.addEventListener('change', changeLanguage);
  changeLanguage({ target: languageSelector });
}