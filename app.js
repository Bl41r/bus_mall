'use strict';

var totalClicks = 0;
var uindexArray = [0,1,2];
var productsArray = [];
var container = document.getElementById('container');
var clicksAllowed = 25;

function Product(name, loc) {
  this.name = name,
  this.loc = loc,
  this.tally = 0;
  this.views = 0;
  this.rating = 1;
}

function getRandomIntInclusive(min, max) {  //from MDN
  return Math.floor(Math.random() * (max - min + 1)) + min;
} //find better func later

function selectImages(exclude) {
  //select 3 random numbers, which cannot have a number that exclude has
  //and, cannot repeat
  var a,b,c;
  a = getRandomIntInclusive(0, productsArray.length - 1);
  b = getRandomIntInclusive(0, productsArray.length - 1);
  c = getRandomIntInclusive(0, productsArray.length - 1);
  while (a === exclude[0] || a === exclude[1] || a === exclude[2]) {
    a = getRandomIntInclusive(0, productsArray.length - 1);
  }
  while (b === exclude[0] || b === exclude[1] || b === exclude[2] || b === a) {
    b = getRandomIntInclusive(0, productsArray.length - 1);
  }
  while (c === exclude[0] || c === exclude[1] || c === exclude[2] || c === a || c === b) {
    c = getRandomIntInclusive(0, productsArray.length - 1);
  }
  console.log('randoms', [a,b,c]);
  return [a,b,c];
}

function printResults() {
  for (var i = 0; i < productsArray.length; i++) {
    console.log(productsArray[i].name + ': ' + productsArray[i].tally + ', ' + productsArray[i].rating);
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
  productsArray.push(new Product('wineglass', 'img/wineglass.jpg'));
  productsArray.push(new Product('pen', 'img/pen.jpg'));
  console.log('products loaded: ', productsArray);
}

function onClick(e) {
  //load 3 images from 3 rando numbers NOT in uindexArray
  //after loaded, uindexArray[0,1,2] is current images -check
  //products with uindex arrays increment views -check
  //on click, do stuff below
  if (totalClicks >= clicksAllowed) {
    console.log('25 data points aquired');
    container.removeEventListener('click', onClick);
    printResults();
    return;
  }
  uindexArray = selectImages(uindexArray); //exclude previous uindex values
  document.getElementById('img1').src = productsArray[uindexArray[0]].loc;
  document.getElementById('img2').src = productsArray[uindexArray[1]].loc;
  document.getElementById('img3').src = productsArray[uindexArray[2]].loc;
  productsArray[uindexArray[0]].views++;
  productsArray[uindexArray[1]].views++;
  productsArray[uindexArray[2]].views++;
  if (e.target.id === 'container') {
    console.log('container clicked');
  } else {
    totalClicks++;
    console.log('click number ' + totalClicks);
    if (e.target.id === 'img1') {
      console.log('img1 clicked');
      productsArray[uindexArray[0]].tally++;
      productsArray[uindexArray[0]].rating += [uindexArray[1]].rating + productsArray[uindexArray[2]].rating;
    } else if (e.target.id === 'img2') {
      console.log('img2 clicked');
      productsArray[uindexArray[1]].tally++;
      productsArray[uindexArray[1]].rating += productsArray[uindexArray[0]].rating + productsArray[uindexArray[2]].rating;
    } else if (e.target.id === 'img3') {
      console.log('img3 clicked');
      productsArray[uindexArray[2]].tally++;
      productsArray[uindexArray[2]].rating += productsArray[uindexArray[0]].rating + productsArray[uindexArray[1]].rating;
    }
  }
}

function main() {
  console.log('main called');
  loadProducts();
  ////////////////////Load first images
  uindexArray = selectImages(uindexArray); //exclude previous uindex values
  console.log('init, uindexArray: ' + uindexArray[0] + ' ' + uindexArray[1] + ' ' + uindexArray[2]);
  document.getElementById('img1').src = productsArray[uindexArray[0]].loc;
  document.getElementById('img2').src = productsArray[uindexArray[1]].loc;
  document.getElementById('img3').src = productsArray[uindexArray[2]].loc;
  productsArray[uindexArray[0]].views++;
  productsArray[uindexArray[1]].views++;
  productsArray[uindexArray[2]].views++;
  ////////////////////
  container.addEventListener('click', onClick);
}

main();
