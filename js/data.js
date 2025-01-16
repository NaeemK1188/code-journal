"use strict";
const data = {
    view: 'entry-form',
    entries: [], // array of objects entry
    editing: null,
    nextEntryId: 1,
};
// preventing the lost of data after refreshing the page
data.entries = readEntry();
function writeEntry() {
    const entryJSON = JSON.stringify(data.entries);
    localStorage.setItem('entry-storage', entryJSON);
}
// returning an array of entries to assigns it back to data.entries where entries are null []
function readEntry() {
    const entryList = localStorage.getItem('entry-storage');
    // or if (entry != null)
    if (entryList) {
        // or const newEntryList:Data[] = JSON.parse(entryList);
        return JSON.parse(entryList);
    }
    else {
        return [];
    }
}
