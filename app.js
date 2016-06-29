'use strict';

var clicksAllowed = 25;
var totalClicks = 0;
var uindexArray = [-1,-1,-1]; //used index array
var productsArray = [];
var productNames = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dogduck.jpg','dragon.jpg','petsweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','watercan.jpg','wineglass.jpg','pen.jpg'];

var chart = document.getElementById('chart');
var productTallys = [];
var productViews = [];

var container = document.getElementById('container');
var welcomeScreen = document.getElementById('welcome');
var displayResultsBtn = document.getElementById('genResults');

function Product(name) {
  this.name = name,
  this.tally = 0;
  this.views = 0;
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
    productTallys[i] = productsArray[i].tally;
    productViews[i] = productsArray[i].views;
  }
}

function printResults() {
  printResultsChart();
  printResultsTable();
}

function drawTable() {
  var table = new google.visualization.Table(document.getElementById('tablediv'));
  var data = new google.visualization.DataTable();
  var rowData = [];
  data.addColumn('string', 'Item');
  data.addColumn('number', 'Clicks');
  data.addColumn('number', 'Views');
  data.addColumn('number', 'Clicks/Views');
  for (var i = 0; i < productsArray.length; i++) {
    rowData[i] = [productsArray[i].name.split('.')[0], productsArray[i].tally, productsArray[i].views, (productsArray[i].tally / productsArray[i].views)];
  }
  console.table(rowData);
  data.addRows(rowData);
  console.log('table should be visible');
  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
  document.getElementById('tablediv').setAttribute('class', 'visible');
}

function printResultsTable() {
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(drawTable);
}

function printResultsChart() {
  console.table(productsArray);
  updateChartData();
  chart.getContext('2d');
  var chartData = {
    labels : fileNameNoExt(productNames),
    datasets : [ {
      label: 'Product Clicks',
      backgroundColor: 'rgba(167,255,44,0.6)',
      borderColor: 'rgba(111,178,18,0.9)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(111,178,18,0.9)',
      hoverBorderColor: 'rgba(111,178,18,0.9)',
      data : productTallys
    },
      {
        label: 'Product Views',
        backgroundColor: 'rgba(44,255,249,0.2)',
        borderColor: 'rgba(44,255,249,0.8)',
        hoverBackgroundColor: 'rgba(44,255,249,0.8)',
        hoverBorderColor: 'rgba(44,255,249,0.8)',
        borderWidth: 1,
        data: productViews
      }
	]};
  chart.setAttribute('class', 'visible');
  new Chart.Bar(chart, {
    data: chartData,
  });
}

function fileNameNoExt(filelist) {
  var files = [];
  for (var i = 0; i < filelist.length; i++) {
    files.push(filelist[i].split('.')[0]);
  }
  return files;
}

function loadProducts() { //later, for all in local storage, put into array
  if (localStorage.busMall) {
    productsArray = JSON.parse(localStorage.busMall);
    console.log('localStorage for busMall exists.');
  } else {
    console.log('localStorage was not found.');
    for (var i = 0; i < productNames.length; i++) {
      productsArray.push(new Product(productNames[i].split('.')[0]));
    }
  }
}

function onClick(e) {
  if (e.target.id === 'container') {
    console.log('container clicked');
    return;
  } else {
    totalClicks++;
    if (e.target.id === 'img1') {
      productsArray[uindexArray[0]].tally++;
    } else if (e.target.id === 'img2') {
      productsArray[uindexArray[1]].tally++;
    } else if (e.target.id === 'img3') {
      productsArray[uindexArray[2]].tally++;
    }
    localStorage.busMall = JSON.stringify(productsArray);

  }
  if (totalClicks >= clicksAllowed) {
    console.log(clicksAllowed + ' data points aquired.');
    container.removeEventListener('click', onClick);
    displayResultsBtn.setAttribute('class', 'visible');
    return;
  } else {
    init();
  }
}

function init() { // initialize images
  uindexArray = selectImages(uindexArray); //exclude previous images
  document.getElementById('img1').src = 'img/' + productNames[uindexArray[0]];
  document.getElementById('img2').src = 'img/' + productNames[uindexArray[1]];
  document.getElementById('img3').src = 'img/' + productNames[uindexArray[2]];
  productsArray[uindexArray[0]].views++;
  productsArray[uindexArray[1]].views++;
  productsArray[uindexArray[2]].views++;
}

function eventsListen() {
  welcomeScreen.addEventListener('click', function(e) {
    welcomeScreen.setAttribute('class', 'hidden');
    e.stopPropagation();
  });
  container.addEventListener('click', onClick);
  displayResultsBtn.addEventListener('click', printResults);
}

function main() {
  loadProducts();
  init();
  eventsListen();
}

main();
