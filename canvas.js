var sliderX = document.getElementById("sliderX");
var sliderY = document.getElementById("sliderY");
var outputX = document.getElementById("valueX");
var outputY = document.getElementById("valueY");

/// --- Variable part --- ///

var x = 20;
var y = 20;
var xmax = 30;
var ymax = 30;
var ratioXY = x/y; //i dont think we need that


/// --- Slider part --- ///
// remove X slider later !!!

outputX.innerHTML = sliderX.value;
sliderX.oninput = function() {
    outputX.innerHTML = this.value;
}

outputY.innerHTML = sliderY.value;
sliderY.oninput = function() {
    outputY.innerHTML = this.value;
}

var start_value = sliderX.getAttribute("value");
var SliderX_value = start_value;
var color = 'linear-gradient(90deg, rgb(107, 107, 107)' + SliderX_value * (100/xmax) + '% , rgb(177, 177, 177)' + SliderX_value * (100/xmax) + '%)';
sliderX.style.background = color;

sliderX.addEventListener("mousemove", function() {
    SliderX_value = sliderX.value;
    color = 'linear-gradient(90deg, rgb(107, 107, 107)' + (((SliderX_value  - 2) * (100/xmax)) + 4) + '% , rgb(177, 177, 177)' + (((SliderX_value  - 2) * (100/xmax)) + 4) + '%)';
    sliderX.style.background = color;
    console.log(x,SliderX_value)
});

var start_value = sliderY.getAttribute("value");
var SliderY_value = start_value;
sliderY.addEventListener("mousemove", function() {
    SliderY_value = sliderY.value;
    color = 'linear-gradient(90deg, rgb(107, 107, 107)' + (((SliderY_value  - 2) * (100/ymax)) + 4) + '% , rgb(177, 177, 177)' + (((SliderY_value  - 2) * (100/ymax)) + 4) + '%)';
    sliderY.style.background = color;
});

/// --- Canvas part --- ///

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

// canvas resolution
// (we do this so that canvas witdth and height become devidable
// by pixel width and hight, to make easyer and more accurate calculations)
canvas.height = Math.floor(window.innerHeight/y)*y;
canvas.width = Math.floor(window.innerHeight/x)*x * ratioXY;

// canvas resolution variables
var CanvasW = c.canvas.width;
var CanvasH = c.canvas.height;

// cool background
for (var i = 0; i < y; i++){
    for (var j = 0; j < x; j++){
        c.fillStyle = 'rgba( ' + (j*j)/6 + ',' + (i+j)*2  +',' + (i*i)/6 + ')';
        c.fillRect(i*(CanvasW/x),j*(CanvasH/x), (CanvasW/x), (CanvasH/x)) 
    }
}

// painting stuff
let painting = false;

function startPosition(e){
    painting = true;
    draw(e);
}

function finishedPosition(){
    painting = false;
}
var intmouseX;
var intmouseY;
var pixelX;
var pixelY;

// draw/paint function
function draw(e){
    var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    if(!painting) return;

    // mouse position pixel wise (2-30) 
    pixelX = Math.floor(mouseX/(CanvasW/x));
    pixelY = Math.floor(mouseY/(CanvasH/y));

    // mouse position canvas wise
    pixelToCanvasX = pixelX*CanvasW/x;
    pixelToCanvasY = pixelY*CanvasH/y;
    c.fillRect(pixelToCanvasX,pixelToCanvasY,CanvasW/x,CanvasH/x)
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);