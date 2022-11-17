let ALdone = false;
let Al;
let sel = document.querySelector('.select-alt');
let countSwap = document.querySelector('.countSwap');
let condition = document.querySelector('.condition');

function setup() {
  createCanvas(windowWidth - 180, windowHeight - 50);
  frameRate(15);
  Al = new Sort(200, 50, windowWidth * 0.75, windowHeight * 0.5);
  Al.shuffle();
  condition.classList.toggle('active');
  countSwap.classList.toggle('active');
}
function draw(a) {
  
    background-color('green');

    ALdone = Al.InsertSort();
}