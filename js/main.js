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
    const entry = {};
    const formElements = $form.elements;
    const formTitle = $form.elements[0];
    const formURL = $form.elements[1];
    const formTextArea = $form.elements[2];
    entry.entryTitle = formTitle.value;
    entry.entryURL = formURL.value;
    entry.entryTextArea = formTextArea.value;
    entry.entryId = data.nextEntryId;
    data.nextEntryId = data.nextEntryId + 1;
    // adding new post to te end which is wrong because new posts have to be at the top
    // data.entries.push(entry);
    // adding the new post data to the top, so we know its a new post
    data.entries.unshift(entry);
    writeEntry();
    $img.src = "images/placeholder-image-square.jpg";
    $form.reset();
});
