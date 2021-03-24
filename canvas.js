var sliderX = document.getElementById("sliderX");
var sliderY = document.getElementById("sliderY");
// var slider = document.getElementById("sliderY");
var outputX = document.getElementById("valueX");
var outputY = document.getElementById("valueY");
//some random change

var x = 30;
var y = 30;
var xmax = 30;
var ymax = 30;
var ratioXY = x/y;

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
    // canvas.height = Math.floor(window.innerHeight/y)*y;
});

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.height = Math.floor(window.innerHeight/y)*y;
canvas.width = Math.floor(window.innerHeight/x)*x * ratioXY;

console.log(window.innerHeight,window.innerHeight*ratioXY);

// canvas.addEventListener('mousemove', function cinput (event) {
//     if(mouseDown){
//         console.log(Math.floor(event.clientX/(window.innerHeight/x)),Math.floor(event.clientY/(window.innerHeight*ratioXY/y)));
//     }    
// });

for (var i = 0; i < y; i++){
    for (var j = 0; j < x; j++){
        c.fillStyle = 'rgba( ' + (j*j)/6 + ',' + (i+j)*2  +',' + (i*i)/6 + ')';
        //console.log(Math.floor(255 / (j + 1) ),Math.floor(255 / (y + 1) ))
        //c.fillStyle = 'rgba(' + 40.5 + ',' + 10.5 +',255,1)';
        //c.fillStyle = 'rgba(255,0,255,1)';
        c.fillRect(i*(window.innerHeight/x),j*(window.innerHeight/x), (window.innerHeight/x) + 1, (window.innerHeight/x) + 1) 
    }
}

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
var CanvasW = c.canvas.width;
var CanvasH = c.canvas.height;

function mouseMove(e)
{
    var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

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
    //console.log(Math.floor(e.clientX/(window.innerHeight/x)),Math.floor(e.clientY/(window.innerHeight*ratioXY/y)));
    //intmouseX = Math.floor(e.x)
    //intmouseY = Math.floor(e.y)
    pixelX = Math.floor(mouseX/(CanvasW/x));
    pixelY = Math.floor(mouseY/(CanvasH/y));

    //console.log(pixelX*c.canvas.width/x,pixelY*c.canvas.height/x)
    c.fillRect(pixelX*CanvasW/x,pixelY*CanvasH/x,CanvasW/x,CanvasH/x)
    
    
    
    // console.log(Math.floor(e.clientX/(window.innerHeight/x) * (e.clientX/x)),
    // Math.floor(e.clientY/(window.innerHeight*ratioXY/y) * (e.clientY/y)));
    // c.fillRect(Math.floor(e.clientX/(window.innerHeight/x)) * Math.floor(e.clientX/x),
    // Math.floor(e.clientY/(window.innerHeight*ratioXY/y)) * Math.floor(e.clientY/y),
    // window.innerHeight/x,window.innerHeight/x);
}

canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

// c.beginPath();
// c.moveTo();
// c.lineTo();
// c.stroke();