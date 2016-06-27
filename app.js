'use strict';

var totalCLicks = 0;

function Product(name, loc) {
  this.name = '',
  this.loc = '',
  this.tally = 0;
  this.views = 0;
  this.rating = 1;
}

var usedArray = [];
var productsArray = [];

function getRandomIntInclusive(min, max) {  //from MDN
  return Math.floor(Math.random() * (max - min + 1)) + min;
} //find better func later

function reset(i) {
  for (var j = 0; j < i; j++) {
    index = getRandomIntInclusive(0, productsArray.length);
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
  productsArray.push(new Product('pen', 'img/pen.jpg'));
  reset(3);
}

function displayImages() {
  var index = selectImages();
  //
}
