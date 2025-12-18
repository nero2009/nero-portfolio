(function(){
  function three(){
    console.log('three');
    four();
  }

  function four(){
    console.log('four');
  }

  console.log('one');
  console.log('two');

  
  three();
  console.log('five');



})() ;

function one(){
  console.log('one');
}

function two(){
  console.log('two');
}

function three(){
  console.log('three');
  four();
}

function four(){
  console.log('four');
}

one();
two();
three();


function sum(a,b){
  return a + b;
}

function divide(numerator, denominator){
  return numerator / denominator;
}

function average(a,b){
  return divide(sum(a,b), 2);
}

console.log(average(10,20));