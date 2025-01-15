'use strict';
const $inputURL = document.querySelector('.inputURL');
// console.log($input1);
const $img = document.querySelector('img');
// console.log($img?.getAttribute('src'));
if (!$inputURL || !$img) {
  throw new Error('$inputURL or $img are not exists');
}
let $imgURL = $img.getAttribute('src');
// console.log($imgURL);
$inputURL.addEventListener('input', (event) => {
  console.log('input event was fired');
  const eventTarget = event.target;
  // $imgURL = $inputURL.textContent;
  $imgURL = eventTarget.value;
  $img.setAttribute('src', $imgURL);
  console.log($imgURL);
});
