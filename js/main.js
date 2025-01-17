"use strict";
const $inputURL = document.querySelector('.inputURL');
const $img = document.querySelector('img');
const $form = document.querySelector('form');
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
    // entry.entryTitle = formTitle.value;
    // entry.entryURL = formURL.value;
    // entry.entryTextArea = formTextArea.value;
    // entry.entryId = data.nextEntryId;
    data.nextEntryId = data.nextEntryId + 1;
    // adding new post to te end which is wrong because new posts have to be at the top
    // data.entries.push(entry);
    // adding the new post data to the top, so we know its a new post
    data.entries.unshift(entry);
    writeEntry();
    $img.src = "images/placeholder-image-square.jpg";
    $form.reset();
});
// from somewhere an entry will be passed to renderEntry function
function renderEntry(entry) {
    const $parentLI = document.createElement('li');
    const $divRow = document.createElement('div');
    $divRow.setAttribute('class', 'row');
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
    $divColHalfSecond.appendChild($h2);
    const $h5 = document.createElement('h5');
    $divColHalfSecond.appendChild($h5);
    return $parentLI;
}
// blueprint
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
