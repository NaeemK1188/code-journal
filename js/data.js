"use strict";
const data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
function writeEntry() {
    const entryJSON = JSON.stringify(data.entries);
    localStorage.setItem('entry-storage', entryJSON);
}
