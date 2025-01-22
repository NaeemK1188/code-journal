// data modal for entry object
// each entry in the webpage

interface Entry {
  // properties not optional
  entryTitle: string;

  entryURL: string;
  entryTextArea: string;
  entryId: number;
}

// entry object should not be a global object here

const $inputURL = document.querySelector('.inputURL') as HTMLInputElement | any;
const $inputTitle = document.querySelector('.inputTitle') as
  | HTMLInputElement
  | any;
const $textArea = document.querySelector('textarea') as
  | HTMLTextAreaElement
  | any;
const $img = document.querySelector('img') as HTMLImageElement | any;
const $h1 = document.querySelector('.New-Entry-H1') as HTMLElement;

const $form = document.querySelector('form');

// we are selecting div with data-view="entries"
// using as makes typescript knows its type and removing the error
const $divEntryForm = document.querySelector(
  'div[data-view=entry-form]',
) as HTMLDivElement;
const $divEntries = document.querySelector(
  'div[data-view=entries]',
) as HTMLDivElement;
const $h3Entries = document.querySelector('.header-h3');
const $newButton = document.querySelector('.new-btn');
const $ulList = document.querySelector('.Entry-List-ul');
const $NoEntriesH2 = document.querySelector('.no-entries-msg') as HTMLElement;

// unable to select element that are not exists on the DOM like .fas.fa-pencil'
// it will show null

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

// --------------------input()----------------------------------
$inputURL.addEventListener('input', (event: Event) => {
  const eventTarget = event.target as HTMLInputElement;

  const imgURL = eventTarget.value;

  $img.src = imgURL;
});
// --------------------input()----------------------------------

// -------------------submit()---------------------------------------------
$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const formElements = $form.elements;

  const formTitle = $form.elements[0] as HTMLInputElement;
  const formURL = $form.elements[1] as HTMLInputElement;
  const formTextArea = $form.elements[2] as HTMLTextAreaElement;

  // when the data.editing array is empty or no editing yet
  if (data.editing === null) {
    const entry: Entry = {
      entryTitle: formTitle.value,
      entryURL: formURL.value,
      entryTextArea: formTextArea.value,
      entryId: data.nextEntryId,
    };
    data.nextEntryId = data.nextEntryId + 1;

    // every time we hit submit, a DOM tree is created or one entry li and appending it to ul a list
    // of entries
    // adding new post data to the top or beginning, so we know its a new post
    data.entries.unshift(entry);

    // adding only the newly created entry not the whole entries so we can see it in DOM
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
  }

  // when data.editing array has data to edit
  else if (data.editing !== null) {
    // we only change the entry id
    // so we can use it in comparison
    const entry: Entry = {
      entryTitle: formTitle.value,
      entryId: data.editing.entryId,
      entryTextArea: formTextArea.value,
      entryURL: formURL.value,
    };

    // finding the original entry in data.entries, and then replacing it with the new entry in line 119
    // so we can then append it to the ul
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entry.entryId) {
        data.entries[i] = entry;
      }
    }

    // capturing all li's in the Ul
    const $liElements = document.querySelectorAll('li');

    for (let i = 0; i < $liElements.length; i++) {
      if (Number($liElements[i].dataset.entryId) === entry.entryId) {
        const newLi = renderEntry(entry);
        $liElements[i].replaceWith(newLi);
      }
    }
    // update the status title from Edit Entry to New Entry when data.editing != null and clicking submit
    $h1.textContent = 'New Entry';
    // setting it to null so it doesn't not replace the new image added
    // because it goes the first if when data.editing === null
    data.editing = null;
    $form.reset();
    $img.src = 'images/placeholder-image-square.jpg';
  }
});
// -------------------submit()---------------------------------------------

// ------------------------renderEntry()------------------------------------------
// returning an entry
// it follows the blueprint of the li structure in html
function renderEntry(entry: Entry): HTMLLIElement {
  const $parentLI = document.createElement('li');

  let newEntryId = '';
  // to handle the undefined because of the usage of ? making properties optional
  // we only care if it exists entry.entryId
  if (entry.entryId) {
    // if entry exists then the entryId exists, so change the type to string
    newEntryId = entry.entryId.toString();
    // there is a content so the current id is 1
  }
  // if there is not entry, therefore no entryId give a default value to newEntryId
  else {
    // we should give a default value which should be the current value. I used 0 as a test
    newEntryId = '0';
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
// ------------------------renderEntry()------------------------------------------

// -----------------------DOMContentLoader()-------------------------------------c
// safety function because even if we don't create it it will load everything
// all our elements in ul are created in our DOM or the page
document.addEventListener('DOMContentLoaded', () => {
  viewSwap(data.view); // to starts at the 'entries' page when the document contents load up
  // creating one entry and appending it to list ul
  for (let i = 0; i < data.entries.length; i++) {
    $ulList.appendChild(renderEntry(data.entries[i]));
  }
  // we are testing it  here because when our elements are created
  // we call toggle to switch between adding h2 no entries or seeing the entries if they are exists
  // seeing exact same view we left from using viewSwap()
  // when refresh the creation will start from entry-form or when we open the html file using viewSwap(data.view);
  // so when we open the html file the first time it goes directly to 'entry-form' page
  toggleNoEntries();
});
// -----------------------DOMContentLoader()-------------------------------------

// --------------------------click()----------------------------------------------
$h3Entries.addEventListener('click', () => {
  // just passing any string even a literal not just a variable
  viewSwap('entries');
});
// --------------------------click()----------------------------------------------

// --------------------------click()----------------------------------------------
$newButton.addEventListener('click', () => {
  viewSwap('entry-form');
  // resetting when creating new entry
  $h1.textContent = 'New Entry';
  // because image doesn't reset when we switch to New Entry
  $img.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});
// --------------------------click()----------------------------------------------

// -----------------------click()-------------------------------------------------
$ulList.addEventListener('click', (event: Event) => {
  // we can see which li element the eventtarget belongs to because eventTarget is DOM element
  const $eventTarget = event.target as HTMLElement; // ALL ELEMENTS IN DOM
  // whenever we click its an LI element because we used closest with it
  const $eventTargetParent = $eventTarget.closest('li'); // treating eventTarget as DOM element
  if ($eventTarget.tagName === 'I') {
    // after using .closest we can know the entryId of the Li
    for (let i = 0; i < data.entries.length; i++) {
      if (
        data.entries[i].entryId === Number($eventTargetParent?.dataset.entryId)
      ) {
        data.editing = data.entries[i];
      }
    }
    // after applying the changes, we apply them on the local storage
    writeData();

    // update entry inputs with the data.editing that was found through the for loop by entryID
    if (data.editing) {
      // we only update if we have data.editing
      $inputTitle.value = data.editing.entryTitle;
      $inputURL.value = data.editing?.entryURL;
      $img.src = data.editing?.entryURL;
      $textArea.value = data.editing?.entryTextArea;
      $h1.textContent = 'Edit Entry';
    }

    viewSwap('entry-form');
  }
});
// -----------------------click()-------------------------------------------------

// -------------------toggleNoEntries()--------------------------------------------
function toggleNoEntries(): void {
  // we can override the name of the class and applying other class names to it
  // to change the behavior of the DOM element
  if (data.entries.length === 0) {
    $NoEntriesH2.className = 'no-entries-msg';
  } else {
    $NoEntriesH2.className = 'hidden';
  }
}
// -------------------toggleNoEntries()--------------------------------------------

// -------------------viewSwap()------------------------------------------------------
// this function is just doing the functionality of swapping pages
function viewSwap(viewName: string): void {
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
// -------------------viewSwap()------------------------------------------------------
