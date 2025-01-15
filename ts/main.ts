const $inputURL = document.querySelector('.inputURL');
// console.log($input1);
const $img = document.querySelector('img');
// console.log($img?.getAttribute('src'));

if (!$inputURL || !$img) {
  throw new Error('$inputURL or $img are not exists');
}

let $imgURL = $img.getAttribute('src');
// console.log($imgURL);

$inputURL.addEventListener('input', (event: Event) => {
  console.log('input event was fired');
  const eventTarget = event.target as HTMLInputElement;
  // $imgURL = $inputURL.textContent;
  // here we are only updating the variable $imgsrc not the actual image
  $imgURL = eventTarget.value;
  // here we are explicitly updating the image by using new src variable $imgURL
  // it worked although the conversion from HTMLimageElement to string
  // $img = $imgURL;
  $img.setAttribute('src', $imgURL);
  console.log($imgURL);
});
