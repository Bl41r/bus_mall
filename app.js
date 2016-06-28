'use strict';

var totalClicks = 0;
var uindexArray = [-1,-1,-1]; //used index array
var productsArray = [];

//for chart
var chart = document.getElementById('chart');
chart.getContext('2d');
var productNames = [];
var productTallys = [];
var productViews = [];
var productRatings = [];

var clicksAllowed = 25;
var totalRating = 0;

var container = document.getElementById('container');
var welcomeScreen = document.getElementById('welcome');
var displayResultsBtn = document.getElementById('genResults');

function Product(name, loc) {
  this.name = name,
  this.loc = loc,
  this.tally = 0;
  this.views = 0;
  this.rating = 1;
}

function getRandomIntInclusive(min, max) {  //from MDN
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectImages(exclude) {
  //select 3 random array indices, which cannot have a number that [exclude] has, and cannot repeat
  var a,b,c;
  do {
    a = getRandomIntInclusive(0, productsArray.length - 1);
  } while (a === exclude[0] || a === exclude[1] || a === exclude[2]);
  do {
    b = getRandomIntInclusive(0, productsArray.length - 1);
  } while (b === exclude[0] || b === exclude[1] || b === exclude[2] || b === a);
  do {
    c = getRandomIntInclusive(0, productsArray.length - 1);
  } while ((c === exclude[0] || c === exclude[1] || c === exclude[2] || c === a || c === b));
  return [a,b,c];
}

function updateChartData() {
  for (var i = 0; i < productsArray.length; i++) {
    productNames[i] = productsArray[i].name;
    productTallys[i] = parseInt(productsArray[i].tally);
    // productViews[i] = productsArray[i].views;
    // productRatings[i] = productsArray[i].rating;
  }
}

function printResults() {
  updateChartData();
  console.table(productsArray);
  for (var i = 0; i < productsArray.length; i++) {
    // productsArray[i].rating /= (productsArray[i].views || 1); //fixlater
    totalRating += productsArray[i].rating;
  }
  console.log('total ratings sum: ', totalRating);
  var chartData = {
    labels : productNames,
    datasets : [ {
      label: 'Selection Data',
      backgroundColor: 'rgba(167,255,44,0.6)',
      borderColor: 'rgba(111,178,18,0.5)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(167,255,44,0.8)',
      hoverBorderColor: 'rgba(111,178,18,0.9)',
      data : productTallys
    }
	]
  };
  chart.setAttribute('class', 'visible');
  new Chart.Bar(chart, {
    // axisY: {scaleOverride: true, scaleSteps : 10,
    //    scaleStepWidth : 1, scaleStartValue : 0,
    // scaleLabel: function(e) {if ((e.value % 1) != 0) {return null;} else {return e.value;}}},
    //okay, screw you too chart.js
    data: chartData,
  });
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
}

function onClick(e) {
  if (e.target.id === 'container') {
    console.log('container clicked');
  } else {
    init();
    totalClicks++;
    if (e.target.id === 'img1') {
      productsArray[uindexArray[0]].tally++;
      productsArray[uindexArray[0]].rating += productsArray[uindexArray[1]].rating + productsArray[uindexArray[2]].rating;
    } else if (e.target.id === 'img2') {
      productsArray[uindexArray[1]].tally++;
      productsArray[uindexArray[1]].rating += productsArray[uindexArray[0]].rating + productsArray[uindexArray[2]].rating;
    } else if (e.target.id === 'img3') {
      productsArray[uindexArray[2]].tally++;
      productsArray[uindexArray[2]].rating += productsArray[uindexArray[0]].rating + productsArray[uindexArray[1]].rating;
    }
  }
  if (totalClicks >= clicksAllowed) {
    console.log('25 data points aquired.');
    container.removeEventListener('click', onClick);
    displayResultsBtn.setAttribute('class', 'visible');
    return;
  }
}

function init() { // initialize images
  uindexArray = selectImages(uindexArray); //exclude previous uindex values
  document.getElementById('img1').src = productsArray[uindexArray[0]].loc;
  document.getElementById('img2').src = productsArray[uindexArray[1]].loc;
  document.getElementById('img3').src = productsArray[uindexArray[2]].loc;
  productsArray[uindexArray[0]].views++;
  productsArray[uindexArray[1]].views++;
  productsArray[uindexArray[2]].views++;
}

function main() {
  loadProducts();
  init();
  welcomeScreen.addEventListener('click', function(e) {welcomeScreen.setAttribute('class', 'hidden'); e.stopPropagation();});
  container.addEventListener('click', onClick);
  displayResultsBtn.addEventListener('click', printResults);
}

main();
