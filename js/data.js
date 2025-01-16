"use strict";
const data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
data.entries = readEntry();
function writeEntry() {
    const entryJSON = JSON.stringify(data.entries);
    localStorage.setItem('entry-storage', entryJSON);
}
function readEntry() {
    const entryList = localStorage.getItem('entry-storage');
    if (entryList) {
        return JSON.parse(entryList);
    }
    else {
        return [];
    }
}
