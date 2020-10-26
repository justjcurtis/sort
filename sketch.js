let w;
let h;
let bars;
const sorter = new Sorter();
const arrSupplier = new ArrSupplier();
let arr = undefined
let sorted = undefined;
let highlights = [];
let currentSortType = -1
let sortTypeP = undefined;

const maxBars = 300

function setup() {
  w = windowWidth;
  console.log(w)
  h = windowHeight-60;
  bars = map(w, 0, 1600, 0, maxBars)
  createCanvas(w, h)
  sortTypeP = createP(`SortType: ??????????`)
  // frameRate(1)
}

function draw() {
  background(0)
  if(arr == undefined || done()){
    arr = arrSupplier.randomStraightArr(bars, 0, h)
    sorted = sorter.sort(arr);
    currentSortType ++;
  }
  sortFrame();
  render()
}

function render(){
  background(0);
  let step = (w/bars);
  stroke(0)
  strokeWeight(2)
  for(let i = 0; i<arr.length; i++){
    if(highlights.includes(i)){
      fill(0,255,0);
    }else{
      fill(220);
    }
    rect(i*step, h-(arr[i]), step, arr[i])
  }
}

function selectionSortFrame(){
  // for(let i = 0; i<5; i++){
    [arr, highlights] = sorter.selectionSortStep(arr);
  // }
}

function bubbleSortFrame(){
  for(let i = 0; i<bars; i++){
    [arr, highlights] = sorter.bubbleSortStep(arr);
  }
}

function quickSortFrame(){
  [arr, highlights] = sorter.quickSortStep(arr);
}

function sortFrame(){
  switch(currentSortType){
    case 0:
      frameRate(60*(bars/maxBars))
      selectionSortFrame()
      sortTypeP.html(`SortType: "Selection Sort"`)
      break;
    case 1:
      frameRate(60*(bars/maxBars))
      bubbleSortFrame();
      sortTypeP.html(`SortType: "Bubble Sort"`)
      break;
    case 2:
      frameRate(10*(bars/maxBars))
      quickSortFrame();
      sortTypeP.html(`SortType: "Quick Sort"`)
      break;
    case 3:
      frameRate(10*(bars/maxBars))
      quickSortFrame();
      sortTypeP.html(`SortType: "Quick Sort"`)
      break;
    case 4:
      frameRate(10*(bars/maxBars))
      quickSortFrame();
      sortTypeP.html(`SortType: "Quick Sort"`)
      break;
    default:
      currentSortType = 0;
      break;
  }
}

function done(){
  if(arr != undefined){
    let d = arr.join() == sorted.join()
    return d
  }
  return false;
}