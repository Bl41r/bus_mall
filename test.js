// File to test effectiveness of random number generators

function getRandomIntInclusive(min, max) {  //from MDN
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var a = 0;
var b = 0;
var c = 0;
var d = 0;
var e = 0;
var f = 0;
var g = 0;
var h = 0;
var i = 0;
var j = 0;

for (var z = 0; z < 10000000; z++) { // 10 million picks, avg should be close to 1 mill
  x = getRandomIntInclusive(1,10);
  switch(x) {
  case 1:
    a++;
    break;
  case 2:
    b++;
    break;
  case 3:
    c++;
    break;
  case 4:
    d++;
    break;
  case 5:
    e++;
    break;
  case 6:
    f++;
    break;
  case 7:
    g++;
    break;
  case 8:
    h++;
    break;
  case 9:
    i++;
    break;
  case 10:
    j++;
    break;
  }
}

console.log('a: ', a);
console.log('b: ', b);
console.log('c: ', c);
console.log('d: ', d);
console.log('e: ', e);
console.log('f: ', f);
console.log('g: ', g);
console.log('h: ', h);
console.log('i: ', i);
console.log('j: ', j);
