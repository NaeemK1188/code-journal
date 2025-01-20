'use strict';
// not global
// let entry: Entry | null = {};
const $inputURL = document.querySelector('.inputURL');
const $inputTitle = document.querySelector('.inputTitle');
const $textArea = document.querySelector('textarea');
const $img = document.querySelector('img');
const $h1 = document.querySelector('.New-Entry-H1');
const $form = document.querySelector('form');
// we are selecting div with data-view="entries"
// using as makes typescript knows its type and removing the error
const $divEntryForm = document.querySelector('div[data-view=entry-form]');
const $divEntries = document.querySelector('div[data-view=entries]');
const $h3Entries = document.querySelector('.header-h3');
const $newButton = document.querySelector('.new-btn');
const $ulList = document.querySelector('.Entry-List-ul');
const $NoEntriesH2 = document.querySelector('.no-entries-msg');
// unable to select element that are not exists on the DOM
// const $pencilIcon = document.querySelector('.fas.fa-pencil');
// console.log($pencilIcon);
if (!$inputTitle || !$textArea) {
  throw new Error('$inputTitle or !$textArea not exist');
}
if (!$NoEntriesH2 || !$ulList) {
  throw new Error('$NoEntriesH2 or $ulList not exist');
}
if (!$h3Entries || !$newButton) {
  throw new Error('$$h3Entries or $newButton are not exist');
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
  data.nextEntryId = data.nextEntryId + 1;
  // every time we hit submit, a DOM tree is created or one entry li and appending it to ul a list
  // of entries
  // so its created quickly after submit which solves the issue of refreshing
  // adding the new post data to the top or beginning, so we know its a new post
  data.entries.unshift(entry);
  // adding only the newly created entry not the whole entries s0 we can see it in DOM
  // prepend adds the new li at the beginning not at the end which is similar to unshift()
  // to maintain the same order in the DOM or html file like in the array entries
  $ulList.prepend(renderEntry(entry));
  // adding new entry data to storage
  writeData();
  // reset image
  $img.src = 'images/placeholder-image-square.jpg';
  $form.reset();
  // when the form reset it immediately goes to entries
  viewSwap('entries');
  toggleNoEntries();
});
// from somewhere an entry will be passed to renderEntry function
// returning an entry
function renderEntry(entry) {
  const $parentLI = document.createElement('li');
  let newEntryId = '';
  // to handle the undefined because of the usage of ? making properties optional
  // if (entry.entryId !== undefined)
  if (entry.entryId) {
    // if entry exists then the entryId exists, so change the type to string
    newEntryId = entry.entryId.toString();
    // there is a content so the current id is 1
    console.log('current Entry ID:', newEntryId);
  } // if there is not entry, therefore no entryId give a default value to newEntryId
  else {
    // we should give a default value which should be the current value. I used 0 as a test
    newEntryId = '0';
    console.log('current Entry ID:', newEntryId);
  }
  // it output the current id along with the previous id
  $parentLI.setAttribute('data-entry-id', newEntryId);
  const $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  // after being appended, it will be outputted because its added to the DOM
  $parentLI.appendChild($divRow);
  const $divColHalfFirst = document.createElement('div');
  $divColHalfFirst.setAttribute('class', 'column-half');
  $divRow.appendChild($divColHalfFirst);
  const $img = document.createElement('img');
  $img.setAttribute('class', 'entries-img');
  if (entry.entryURL) {
    // if there is an entry, it must has an image, so src value exists
    $img.setAttribute('src', entry.entryURL);
  } // else, there is not entry so no src value
  else {
    $img.setAttribute('src', '');
  }
  console.log('current image src:', $img.src); // it output the current image src along with previous image src
  if (entry.entryTitle) {
    $img.setAttribute('alt', entry.entryTitle);
  } else {
    $img.setAttribute('alt', '');
  }
  $divColHalfFirst.appendChild($img);
  const $divColHalfSecond = document.createElement('div');
  $divColHalfSecond.setAttribute('class', 'column-half');
  $divRow.appendChild($divColHalfSecond);
  const $h2 = document.createElement('h2');
  if (entry.entryTitle) {
    $h2.textContent = entry.entryTitle;
  } else {
    $h2.textContent = ''; // default title not title
  }
  const $divIcon = document.createElement('div');
  $divIcon.setAttribute('class', 'set-Icon');
  $divColHalfSecond.appendChild($divIcon);
  const $icon = document.createElement('i');
  $icon.setAttribute('class', 'fas fa-pencil');
  $divIcon.appendChild($h2);
  $divIcon.appendChild($icon);
  const $h5 = document.createElement('h5');
  if (entry.entryTextArea) {
    $h5.textContent = entry.entryTextArea;
  } else {
    $h5.textContent = '';
  }
  $divColHalfSecond.appendChild($h5);
  return $parentLI;
}
// entry blueprint
//   <li>
//     <div class="row">
//       <div class="column-half">
//         <img
//           class="entries-img"
//           src="https://i.imgur.com/pTFzrug.jpeg"
//           alt="mountain view" />
//       </div>
//       <div class="column-half">
//         <h2>A newer image</h2> image title
//          adding font FontAwesome pencil icon
//         <i class='fas fa-pencil'></i>
//         <h5>A very nice lake</h5> textarea
//       </div>
//     </div>
// </li>
// safety function because even if we don't create it it will load everything
// all our elements in ul are created in our DOM or the page
document.addEventListener('DOMContentLoaded', () => {
  // viewSwap('entries'); // to starts at the 'entries' page when the document contents load up
  // then the change of data.view will be sent to storage at line 222
  // creating a one entry and appending it to list ul
  for (let i = 0; i < data.entries.length; i++) {
    $ulList.appendChild(renderEntry(data.entries[i]));
  }
  // we are testing it  here because when our elements are created
  // we call toggle to switch between adding h2 no entries or seeing the entries if they are exists
  // seeing exact same view we left from using viewSwap()
  viewSwap(data.view); // when refresh the creation will start from entry-form or when we open the html file
  // so when we open the html file the first time it goes directly to 'entry-form' page
  toggleNoEntries();
});
$h3Entries.addEventListener('click', () => {
  // just passing any string even a literal not just a variable
  viewSwap('entries');
});
$newButton.addEventListener('click', () => {
  viewSwap('entry-form');
  // resetting when creating new entry
  $h1.textContent = 'New Entry';
  $form.reset();
});
$ulList.addEventListener('click', (event) => {
  // debugger;
  // we can see which li element the eventtarget belongs to
  // debugger;
  // const eventTarget = event.target as HTMLLIElement;
  const $eventTarget = event.target; // ALL ELEMENTS IN DOM
  console.log($eventTarget.tagName);
  // whenever we click its an LI element because we used closest with it
  // const eventTargetParent = (event.target as HTMLElement).closest('li');
  const $eventTargetParent = $eventTarget.closest('li'); // treating eventTarget as DOM element
  // console.log(eventTargetParent);
  if ($eventTarget.tagName === 'I') {
    // after using .closest we can know the entryId of the Li
    // console.log(eventTargetParent?.dataset.entryId);
    // console.log(data.entries[0].entryId);
    for (let i = 0; i < data.entries.length; i++) {
      if (
        data.entries[i].entryId === Number($eventTargetParent?.dataset.entryId)
      ) {
        data.editing = data.entries[i];
        console.log(data);
      }
    }
    // after applying the changes, we apply them on the local storage
    writeData();
    // entry = {
    //   entryTextArea: data.editing?.entryTextArea,
    //   entryTitle: data.editing?.entryTitle,
    //   entryURL: data.editing?.entryURL,
    //   entryId: data.editing?.entryId
    // };
    if (data.editing) {
      // we only update if er have data.editing
      $inputTitle.value = data.editing.entryTitle;
      $inputURL.value = data.editing?.entryURL;
      $img.src = data.editing?.entryURL;
      $textArea.value = data.editing?.entryTextArea;
      $h1.textContent = 'Edit Entry';
    }
    viewSwap('entry-form');
  }
});
function toggleNoEntries() {
  // we can override the name of the class and applying other class names to it
  // to change the behavior of the DOM element
  if (data.entries.length === 0) {
    $NoEntriesH2.className = 'no-entries-msg';
  } else {
    $NoEntriesH2.className = 'hidden';
  }
}
// this function is just doing the functionality of swapping pages
function viewSwap(viewName) {
  if (viewName === 'entries') {
    // adding class property to a DOM elements
    $divEntries.classList.remove('hidden');
    $divEntryForm.classList.add('hidden');
    // updating our local data
    data.view = viewName;
    // updating our local storage data or updating the data.view in local storage
    writeData();
  } else if (viewName === 'entry-form') {
    $divEntries.classList.add('hidden');
    $divEntryForm.classList.remove('hidden');
    data.view = viewName;
    writeData();
  }
}
