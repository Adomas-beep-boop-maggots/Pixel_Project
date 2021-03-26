var sliderX = document.getElementById("sliderX");
var sliderY = document.getElementById("sliderY");
var outputX = document.getElementById("valueX");
var outputY = document.getElementById("valueY");

/// --- Variable part --- ///

var CanvasDivision = 2.2; // canvas x size = window x size / CanvasDivision
var x = 30;
var y = 30;
var xmax = 30;
var ymax = 30;
var ratioXY = y/x; //i dont think we need that


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
    //x = SliderX_value;
    //ratioXY = x/y;
    //canvas.width = Math.floor(window.innerHeight/x)*x * ratioXY;
    //console.log(x,SliderX_value)
});

var start_value = sliderY.getAttribute("value");
var SliderY_value = start_value;
sliderY.addEventListener("mousemove", function() {
    SliderY_value = sliderY.value;
    color = 'linear-gradient(90deg, rgb(107, 107, 107)' + (((SliderY_value  - 2) * (100/ymax)) + 4) + '% , rgb(177, 177, 177)' + (((SliderY_value  - 2) * (100/ymax)) + 4) + '%)';
    sliderY.style.background = color;
});

/// --- Canvas part --- ///




class Canvas {
    constructor(canvas, c, x, y){
        this.canvas = canvas;
        this.c = c;
        this.x = x;
        this.y = y;
        canvas.height = Math.floor(window.innerWidth/y/CanvasDivision)*y * ratioXY;
        canvas.width = Math.floor(window.innerWidth/x/CanvasDivision)*x;        
    }
    coolBackground(c, x, y){
        var CanvasW = c.canvas.width;
        var CanvasH = c.canvas.height;
        c.fillRect(100,100,100,100);
        for (var i = 0; i < x; i++){
            for (var j = 0; j < y; j++){
                c.fillStyle = 'rgba( ' + (j*j)/6 + ',' + (i+j)*2  +',' + (i*i)/6 + ')';
                c.fillRect(i*(CanvasW/x),j*(CanvasH/y), (CanvasW/x), (CanvasH/y))
            }
        }
    }
}


var canvas2 = document.getElementById("canvas2");
var c2 = canvas2.getContext("2d");
Canvas2 = new Canvas(canvas2,c2, x, y);
Canvas2.coolBackground(c2, x, y);

var canvas1 = document.getElementById("canvas1");
var c1 = canvas1.getContext("2d");
Canvas1 = new Canvas(canvas1,c1,x,y);
Canvas1.coolBackground(c1, x, y);

// canvas resolution variables
var CanvasW = c1.canvas.width;
var CanvasH = c1.canvas.height;

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
    c1.fillRect(pixelToCanvasX,pixelToCanvasY,CanvasW/x,CanvasH/y)
    console.log(CanvasW/x,CanvasH/y);
}

canvas2.addEventListener('mousedown', startPosition);
canvas2.addEventListener('mouseup', finishedPosition);
canvas2.addEventListener('mousemove', draw);

canvas1.addEventListener('mousedown', startPosition);
canvas1.addEventListener('mouseup', finishedPosition);
canvas1.addEventListener('mousemove', draw);


make_base();

function make_base()
{
  base_image = new Image();
  base_image.src = 'img/doge.jpg';
  base_image.onload = function(){
    c2.drawImage(base_image, 0, 0, c2.canvas.width, c2.canvas.height);
  }
}