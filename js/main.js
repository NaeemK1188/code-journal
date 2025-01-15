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
  const $imgURL = eventTarget.value; // value of the input like .textContent
  console.log($imgURL);
  // here we are explicitly updating the image by using new src variable $imgURL
  // it worked although the conversion from HTMLimageElement to string
  // $img = $imgURL;
  $img.setAttribute('src', $imgURL);
  // console.log($imgURL);
});
$form.addEventListener('submit', (event) => {
  console.log('submit event is fired');
  event.preventDefault();
  console.log('form submitted');
});
