"use strict";
const $inputURL = document.querySelector('.inputURL');
const $img = document.querySelector('img');
const $form = document.querySelector('form');
// we are selecting div with data-view="entries"
// using as makes typescript knows its type and removing the error
const $divEntryForm = document.querySelector('div[data-view=entry-form]');
// console.log($divFormEntry);
// output the <div data-view="entries"></div>
const $divEntries = document.querySelector('div[data-view=entries]');
// console.log($divEntries);
const $h3Entries = document.querySelector('.header-h3');
if (!$h3Entries) {
    throw new Error('$$h3Entries not exists');
}
if (!$divEntries || !$divEntryForm) {
    throw new Error('$divEntries or !$divEntryForm not exist');
}
if (!$inputURL || !$img || !$form) {
    throw new Error('$inputURL or $img or $form are not exists');
}
$inputURL.addEventListener('input', (event) => {
    const eventTarget = event.target;
    const imgURL = eventTarget.value;
    $img.src = imgURL;
});
$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formElements = $form.elements;
    const formTitle = $form.elements[0];
    const formURL = $form.elements[1];
    const formTextArea = $form.elements[2];
    const entry = {
        entryTitle: formTitle.value,
        entryURL: formURL.value,
        entryTextArea: formTextArea.value,
        entryId: data.nextEntryId,
    };
    // or
    // entry.entryTitle = formTitle.value;
    // entry.entryURL = formURL.value;
    // entry.entryTextArea = formTextArea.value;
    // entry.entryId = data.nextEntryId;
    data.nextEntryId = data.nextEntryId + 1;
    // adding new post to te end which is wrong because new posts have to be at the top
    // data.entries.push(entry);
    // adding the new post data to the top, so we know its a new post
    data.entries.unshift(entry);
    // changing writeEntry to writeData, so it matches the naming requirement
    writeData();
    $img.src = 'images/placeholder-image-square.jpg';
    $form.reset();
});
// from somewhere an entry will be passed to renderEntry function
function renderEntry(entry) {
    const $parentLI = document.createElement('li');
    const $divRow = document.createElement('div');
    $divRow.setAttribute('class', 'row');
    // after being appended, it will be outputted because its added to the DOM
    $parentLI.appendChild($divRow);
    const $divColHalfFirst = document.createElement('div');
    $divColHalfFirst.setAttribute('class', 'column-half');
    $divRow.appendChild($divColHalfFirst);
    const $img = document.createElement('img');
    $img.setAttribute('class', 'entries-img');
    // after removing ? thats making the the entryURL to be type string | undefined
    // it become type string again
    $img.setAttribute('src', entry.entryURL);
    $img.setAttribute('alt', 'mountain view');
    $divColHalfFirst.appendChild($img);
    const $divColHalfSecond = document.createElement('div');
    $divColHalfSecond.setAttribute('class', 'column-half');
    $divRow.appendChild($divColHalfSecond);
    const $h2 = document.createElement('h2');
    $h2.textContent = entry.entryTitle;
    $divColHalfSecond.appendChild($h2);
    const $h5 = document.createElement('h5');
    $h5.textContent = entry.entryTextArea;
    $divColHalfSecond.appendChild($h5);
    return $parentLI;
}
// safety function because even if we don't create it it will load everything
// all our elements in ul are created in our DOM or the page
document.addEventListener('DOMContentLoaded', () => {
    const $ulList = document.querySelector('.Entry-List-ul');
    if (!$ulList) {
        throw new Error("$ul not exists");
    }
    for (let i = 0; i < data.entries.length; i++) {
        $ulList.appendChild(renderEntry(data.entries[i]));
    }
    // we are testing it  here because when our elements are created
    // we call toggle to switch between adding h2 no entries or seeing the entries if they are exists
    // toggleNoEntries();
});
$h3Entries.addEventListener('click', () => {
    // just passing any string even a literal not just a variable
    // viewSwap("entries")
    // const eventTarget = event.target as HTMLDivElement;
    viewSwap('entries');
});
function toggleNoEntries() {
    const $NoEntriesH2 = document.querySelector('.no-entries-msg');
    const $ulList = document.querySelector('.Entry-List-ul');
    if (!$NoEntriesH2 || !$ulList) {
        throw new Error('$NoEntriesH2 or $ulList not exist');
    }
    if (data.entries.length === 0) {
        $NoEntriesH2.className = 'no-entries-msg';
        // $ulList.className = 'hidden';
    }
    else {
        $NoEntriesH2.className = 'hidden';
        // $ulList.className = 'Entry-List-ul';
    }
}
// this function is just doing the functionality of swapping pages
function viewSwap(viewName) {
    if (viewName === 'entries') {
        // adding class property to a DOM elements
        // $entryForm.classList.add('hidden')
        // $entryView.classList.remove('hidden')
        $divEntries.classList.remove('hidden');
        $divEntryForm.classList.add('hidden');
        // updating our local storage data
        data.view = viewName;
    }
    else if (viewName === 'entry-form') {
        $divEntries.classList.add('hidden');
        $divEntryForm.classList.remove('hidden');
        data.view = viewName;
    }
}
// blueprint renderEntry()
// <li>
//     <div class="row">
//       <div class="column-half">
//         <img class="entries-img src="https://i.imgur.com/pTFzrug.jpeg" alt="mountain view" />
//       </div>
//       <div class="column-half">
//         <h2>A newer image</h2>
//         <h5>A very nice lake</h5>
//       </div>
//     </div>
// </li>
