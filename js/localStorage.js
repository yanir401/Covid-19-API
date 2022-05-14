export function saveIntoLocalStorage(objectToSave, objectName) {
  const objSerialized = JSON.stringify(objectToSave);
  localStorage.setItem(objectName, objSerialized);
}

export function getDataFromLocalStorage(storageName) {
  return JSON.parse(localStorage.getItem(storageName));
}

export function ifExistsInLocalStorage(storageName) {
  return localStorage[storageName];
}
