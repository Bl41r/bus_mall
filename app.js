'use strict';

var totalClicks = 0;
var usedArray = [];
var productsArray = [];
var container = document.getElementById('container');

function Product(name, loc) {
  this.name = '',
  this.loc = '',
  this.tally = 0;
  this.views = 0;
  this.rating = 1;
}
function getRandomIntInclusive(min, max) {  //from MDN
  return Math.floor(Math.random() * (max - min + 1)) + min;
} //find better func later

function reset(i) {
  for (var j = 0; j < i; j++) {
    var index = getRandomIntInclusive(0, productsArray.length);
    usedArray.push(productsArray[index]);
    productsArray.splice(index,1);
  }
}

function selectImages() {
  var nums = [];
  for (var i = 0; i < 3; i++) {
    nums[i] = getRandomIntInclusive(0, productsArray.length);
  }
  if (nums[0] === nums[1] || nums[0] === nums[2] || nums[1] === nums[2]) {
    console.log('matching nums: ', nums);
    nums = selectImages();
  } else {
    return nums;
  }
}

function loadProducts() { //later, for all in txt file, put into array
  productsArray.push(new Product('bag', 'img/bag.jpg'));
  productsArray.push(new Product('banana', 'img/banana.jpg'));
  productsArray.push(new Product('bathroom', 'img/bathroom.jpg'));
  productsArray.push(new Product('boots', 'img/boots.jpg'));
  productsArray.push(new Product('breakfast', 'img/breakfast.jpg'));
  productsArray.push(new Product('bubblegum', 'img/bubblegum.jpg'));
  productsArray.push(new Product('chair', 'img/chair.jpg'));
  productsArray.push(new Product('cthulhu', 'img/cthulhu.jpg'));
  productsArray.push(new Product('dogduck', 'img/dogduck.jpg'));
  productsArray.push(new Product('dragon', 'img/dragon.jpg'));
  productsArray.push(new Product('petsweep', 'img/petsweep.jpg'));
  productsArray.push(new Product('scissors', 'img/scissors.jpg'));
  productsArray.push(new Product('shark', 'img/shark.jpg'));
  productsArray.push(new Product('sweep', 'img/sweep.png'));
  productsArray.push(new Product('tauntaun', 'img/tauntaun.jpg'));
  productsArray.push(new Product('unicorn.jpg', 'img/unicorn.jpg'));
  productsArray.push(new Product('usb', 'img/usb.gif'));
  productsArray.push(new Product('watercan', 'img/watercan.jpg'));
  productsArray.push(new Product('winglass', 'img/winglass.jpg'));
  productsArray.push(new Product('pen', 'img/pen.jpg'));
  reset(3);
  console.log('products loaded: ', productsArray);
}

function displayImages() {
  console.log('displayImages called');
  var index = selectImages();
  document.getElementById('img1').src = productsArray[index[0]].loc;
  document.getElementById('img2').src = productsArray[index[1]].loc;
  document.getElementById('img3').src = productsArray[index[2]].loc;
  usedArray.push(productsArray[index[0]]);
  usedArray.push(productsArray[index[1]]);
  usedArray.push(productsArray[index[2]]);
  productsArray.splice(productsArray[index[0]],1);
  productsArray.splice(productsArray[index[1]],1);
  productsArray.splice(productsArray[index[2]],1);
}

function onClick() {
  if (totalClicks > 25) {
    console.log('25 data points aquired');
  } else {
    totalClicks++;
    console.log('click number ' + totalClicks);
  }
}

function main() {
  console.log('main called');
  loadProducts();
  container.addEventListener('click', onClick);
}

main();
