'use strict';
const $inputURL = document.querySelector('.inputURL');
const $img = document.querySelector('img');
// console.log($img?.getAttribute('src'));
const $form = document.querySelector('form');
// console.log($form);
if (!$inputURL || !$img || !$form) {
  throw new Error('$inputURL or $img or $form are not exists');
}
$inputURL.addEventListener('input', (event) => {
  console.log('input event is fired');
  const eventTarget = event.target;
  // $imgURL = $inputURL.textContent;
  // here we are only updating the variable $imgURL not the actual image
  const imgURL = eventTarget.value; // value of the input like .textContent
  console.log(imgURL);
  // here we are explicitly updating the image by using new src variable $imgURL
  // it worked although the conversion from HTMLimageElement to string
  // $img = $imgURL;
  // $img.setAttribute('src', $imgURL);
  // image is an object and has an attribute src so its similar to objects on typescript
  // $img.src = imgURL;
  // console.log($imgURL);
});
$form.addEventListener('submit', (event) => {
  console.log('submit event is fired');
  event.preventDefault();
  console.log('form submitted');
  const entry = {};
  // const formElements = $form.elements as HTMLFormControlsCollection;
  // console.log(formElements);
  // different way than the typescript from assignment
  const formTitle = $form.elements[0];
  const formURL = $form.elements[1];
  const formTextArea = $form.elements[2];
  // we can get the value from the input elements and textarea
  entry.entryTitle = formTitle.value;
  entry.entryURL = formURL.value;
  entry.entryTextArea = formTextArea.value;
  console.log(entry);
});
