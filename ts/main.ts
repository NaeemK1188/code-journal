interface Entry
{
  entryTitle?: string;
  entryURL?: string;
  entryTextArea?: string;
  entryId?:number;
}

const $inputURL = document.querySelector('.inputURL');

const $img = document.querySelector('img');


const $form = document.querySelector('form');


if (!$inputURL || !$img || !$form)
{
  throw new Error('$inputURL or $img or $form are not exists');
}



$inputURL.addEventListener('input', (event: Event) => {

  const eventTarget = event.target as HTMLInputElement;


  const imgURL = eventTarget.value;


  $img.src = imgURL;

});


$form.addEventListener('submit', (event: Event) => {

  event.preventDefault();

  const entry: Entry = {};

  const formElements = $form.elements;

  const formTitle = $form.elements[0] as HTMLInputElement;
  const formURL = $form.elements[1] as HTMLInputElement;
  const formTextArea = $form.elements[2] as HTMLTextAreaElement;


  entry.entryTitle = formTitle.value;
  entry.entryURL = formURL.value;
  entry.entryTextArea = formTextArea.value;
  entry.entryId = data.nextEntryId; 
  data.nextEntryId = data.nextEntryId + 1;
  data.entries.push(entry);




  writeEntry();
  $img.src = "images/placeholder-image-square.jpg"
  $form.reset();
});
