// data modal for entry object
// each entry in the webpage
interface Entry {
  entryTitle: string;
  // having error because of ? making it string and undefined when using entry.url
  entryURL: string;
  entryTextArea: string;
  entryId: number;
}

const $inputURL = document.querySelector('.inputURL');

const $img = document.querySelector('img');

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

$inputURL.addEventListener('input', (event: Event) => {
  const eventTarget = event.target as HTMLInputElement;

  const imgURL = eventTarget.value;

  $img.src = imgURL;
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const formElements = $form.elements;

  const formTitle = $form.elements[0] as HTMLInputElement;
  const formURL = $form.elements[1] as HTMLInputElement;
  const formTextArea = $form.elements[2] as HTMLTextAreaElement;

  const entry: Entry = {
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
function renderEntry(entry: Entry): HTMLLIElement {
  const $parentLI = document.createElement('li');
  $parentLI.setAttribute('data-entry-id', 'entryId');
  const $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  // after being appended, it will be outputted because its added to the DOM
  $parentLI.appendChild($divRow);
  const $divColHalfFirst = document.createElement('div');
  $divColHalfFirst.setAttribute('class', 'column-half');
  $divRow.appendChild($divColHalfFirst);
  const $img = document.createElement('img');
  $img.setAttribute('class', 'entries-img');
  $img.setAttribute('src', entry.entryURL);
  $img.setAttribute('alt', entry.entryTitle);
  $divColHalfFirst.appendChild($img);
  const $divColHalfSecond = document.createElement('div');
  $divColHalfSecond.setAttribute('class', 'column-half');
  $divRow.appendChild($divColHalfSecond);
  const $h2 = document.createElement('h2');
  $h2.textContent = entry.entryTitle;
  const $divIcon = document.createElement('div');
  $divIcon.setAttribute('class', 'set-Icon');
  $divColHalfSecond.appendChild($divIcon);
  const $icon = document.createElement('i');
  $icon.setAttribute('class', 'fas fa-pencil');
  $divIcon.appendChild($h2);
  $divIcon.appendChild($icon);
  const $h5 = document.createElement('h5');
  $h5.textContent = entry.entryTextArea;
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
  // creating a one entry and appending it to list ul

  for (let i = 0; i < data.entries.length; i++) {
    $ulList.appendChild(renderEntry(data.entries[i]));
  }
  // we are testing it  here because when our elements are created
  // we call toggle to switch between adding h2 no entries or seeing the entries if they are exists
  viewSwap(data.view);
  toggleNoEntries();
});

$h3Entries.addEventListener('click', () => {
  // just passing any string even a literal not just a variable
  viewSwap('entries');
});

$newButton.addEventListener('click', () => {
  viewSwap('entry-form');
});

function toggleNoEntries(): void {
  // we can override the name of the class and applying other class names to it
  // to change the behavior of the DOM element
  if (data.entries.length === 0) {
    $NoEntriesH2.className = 'no-entries-msg';
  } else {
    $NoEntriesH2.className = 'hidden';
  }
}

// this function is just doing the functionality of swapping pages
function viewSwap(viewName: string): void {
  if (viewName === 'entries') {
    // adding class property to a DOM elements

    $divEntries.classList.remove('hidden');
    $divEntryForm.classList.add('hidden');
    // updating our local storage data
    data.view = viewName;
    writeData();
    // updating the data.view in local storage
  } else if (viewName === 'entry-form') {
    $divEntries.classList.add('hidden');
    $divEntryForm.classList.remove('hidden');
    data.view = viewName;
    writeData();
  }
}
