"use strict";
// calling function definition readEntry()
const data = readEntry();
function writeEntry() {
    // we should stringify the whole object not only data entry
    // now we can see all the object data are stringified in the localstorage not only the Entry[]
    const entryJSON = JSON.stringify(data);
    localStorage.setItem('entry-storage', entryJSON);
}
function readEntry() {
    const entryList = localStorage.getItem('entry-storage');
    if (entryList) {
        // we don't want to return and array of entry only, it has to be the entire object Data
        // if there is a data in localstorage we parse it
        // return the whole object not just the entry array
        return JSON.parse(entryList);
    }
    else {
        // if its empty we are returning the default state of the object not only the
        // Entry[] because the return is Data object with the initial state
        return { view: 'entry-form', entries: [], editing: null, nextEntryId: 1 };
    }
}
