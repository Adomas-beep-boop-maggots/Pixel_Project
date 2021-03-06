var sliderX = document.getElementById("sliderX");
var sliderY = document.getElementById("sliderY");
// var outputX = document.getElementById("valueX");
// var outputY = document.getElementById("valueY");



var CanvasDivision = 2.1; // canvas x size = window x size / CanvasDivision
var x = 30;
var y = 30;
var xmax = 30;
var ymax = 30;
var ratioXY = y/x; //i dont think we need that



class Canvas {
    constructor(canvas, c, x, y){
        this.canvas = canvas;
        this.c = c;
        this.x = x;
        this.y = y;
        canvas.height = Math.floor(window.innerWidth/y/CanvasDivision) *y * ratioXY;
        canvas.width = Math.floor(window.innerWidth/x/CanvasDivision) *x;        
    }
    coolBackground(c, x, y){
        var CanvasW = c.canvas.width;
        var CanvasH = c.canvas.height;
        // c.fillRect(100,100,100,100);
        // for (var i = 0; i < x; i++){
        //     for (var j = 0; j < y; j++){
        //         c.fillStyle = 'rgba( ' + (j*j)/6 + ',' + (i+j)*2  +',' + (i*i)/6 + ')';
        //         c.fillRect(i*(CanvasW/x),j*(CanvasH/y), (CanvasW/x)+1, (CanvasH/y)+1)
        //     }
        // }
        c.fillRect(100,100,100,100);
        for (var i = 0; i < x; i++){
            for (var j = 0; j < y; j++){
                //c.fillStyle = 'rgba( ' + (j*j)/6 + ',' + (i+j)*2  +',' + (i*i)/6 + ')';
                c.fillStyle = 'rgba(255,255,255,1)';
                c.fillRect(i*(CanvasW/x),j*(CanvasH/y), (CanvasW/x)+1, (CanvasH/y)+1)
            }
        }
    }
}


var canvas1 = document.getElementById("canvas1");
canvas1.onmouseout = function() {finishedPosition();};
var c1 = canvas1.getContext("2d");
Canvas1 = new Canvas(canvas1,c1,x,y);
Canvas1.coolBackground(c1, x, y);

var CanvasW = c1.canvas.width;
var CanvasH = c1.canvas.height;


// outputX.innerHTML = 30;
// sliderX.oninput = function() {
//     outputX.innerHTML = this.value;
// }

// outputY.innerHTML = 30;
// sliderY.oninput = function() {
//     outputY.innerHTML = 32 - this.value;
// }

var start_value = sliderX.getAttribute("value");
var SliderX_value = start_value;
sliderX.style.width = CanvasW;
//var color = 'linear-gradient(90deg, rgb(107, 107, 107)' + SliderX_value * (100/xmax) + '% , rgb(177, 177, 177)' + SliderX_value * (100/xmax) + '%)';
//sliderX.style.background = color;

//sliderX.style.height = CanvasW;
//color = 'linear-gradient(90deg, rgb(107, 107, 107)' + (((SliderX_value  - 2) * (100/xmax)) + 4) + '% , rgb(177, 177, 177)' + (((SliderX_value  - 2) * (100/xmax)) + 4) + '%)';
sliderX.addEventListener("mousemove", function() {
    //color = 'linear-gradient(90deg, rgb(107, 107, 107)' + (((SliderX_value  - 2) * (100/xmax)) + 4) + '% , rgb(177, 177, 177)' + (((SliderX_value  - 2) * (100/xmax)) + 4) + '%)';
    SliderX_value = sliderX.value;
    //sliderX.style.background = color;
    //console.log(Math.floor(window.innerWidth/x/CanvasDivision))
    x = sliderX.value;
    ratioXY = y/x;
    canvas1.width = Math.floor(window.innerWidth/x/CanvasDivision)*x;
    canvas1.height = Math.floor(window.innerWidth/y/CanvasDivision * ratioXY)*y;
    CanvasW = c1.canvas.width;
    CanvasH = c1.canvas.height;
    Canvas1.coolBackground(c1, x, y);
    //console.log(Math.floor(window.innerWidth/x/CanvasDivision)*x,Math.floor(window.innerWidth/y/CanvasDivision * ratioXY)*y)
    //console.log(sliderX.value,sliderY.value)
    drawPaths();    
});

var start_value = sliderY.getAttribute("value");
var SliderY_value = start_value;
sliderY.style.height = CanvasH;
sliderY.addEventListener("mousemove", function() {
    SliderY_value = sliderY.value;
    //color = 'linear-gradient(0deg, rgb(177, 177, 177)' + (((SliderY_value  - 2) * (100/ymax)) + 4) + '% , rgb(107, 107, 107)' + (((SliderY_value  - 2) * (100/ymax)) + 4) + '%)';
    //sliderY.style.background = color;
    //console.log(Math.floor(window.innerWidth/x/CanvasDivision))
    y = 32 - sliderY.value;
    ratioXY = y/x;
    canvas1.height = Math.floor(window.innerWidth/y/CanvasDivision * ratioXY)*y;
    canvas1.width = Math.floor(window.innerWidth/x/CanvasDivision)*x;
    CanvasW = c1.canvas.width;
    CanvasH = c1.canvas.height;
    Canvas1.coolBackground(c1, x, y);
    //console.log(Math.floor(window.innerWidth/x/CanvasDivision)*x,Math.floor(window.innerWidth/y/CanvasDivision * ratioXY)*y)
    //console.log(sliderX.value,sliderY.value)
    drawPaths();
});







/// --- Canvas part --- ///


var canvas2 = document.getElementById("canvas2");
canvas2.onmouseout = function() {finishedPosition()};
var c2 = canvas2.getContext("2d");
Canvas2 = new Canvas(canvas2,c2, x, y);



// canvas resolution variables

// painting stuff
let painting = false;

function startPosition(e){
    
    painting = true;
    draw(e);
}


function finishedPosition(){
        painting = false;
        points_arr.push(points);
        points = [];
}

var pixelPos = {x: 0, y: 0}

var _pixelPos = {x: -1, y: -1}


//variables that stores pixel info
//thats for undo functionality
let points = [];
let points_arr = [];
//functions for undo functionality
function drawPaths(){
    // delete everything
    Canvas1.coolBackground(c1, x, y);
    // draw all the paths in the paths array
    points_arr.forEach(points=>{
        
        for(let i = 0; i < points.length; i++){
            c1.fillStyle = 'rgba(0,0,0,1)';
            c1.fillRect(points[i].x * CanvasW/x,points[i].y * CanvasH/y,CanvasW/x,CanvasW/x)
        }
    })
}
function Undo(){
    // remove the last path from the paths array
    points_arr.splice(-1,1);
    // draw all the paths in the paths array
    drawPaths();
}

undo.addEventListener("click",Undo);

var canvas_array = {};

//var _pixelPos = {x: -1, y: -1}


function draw(e){
    //c1.fillStyle = 'rgba(0,0,255,0.1)';
    var mouseX, mouseY;
    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    
    pixelPos.x = Math.floor(mouseX/(CanvasW/x));
    pixelPos.y = Math.floor(mouseY/(CanvasH/y));
    PtC_X = pixelPos.x*CanvasW/x; //pixel to canvas X
    PtC_Y = pixelPos.y*CanvasH/y; //pixel to canvas Y
    
    //console.log("aaa");
    //console.log(pixelPos.x,pixelPos.y)
    c2.drawImage(tempImg, 0, 0, c2.canvas.width, c2.canvas.height);
    c2.fillRect(PtC_X,PtC_Y,CanvasW/x,CanvasW/x);

    if(!painting) {
        if(((_pixelPos.x !== pixelPos.x) || (_pixelPos.y !== pixelPos.y))){
            //console.log(_pixelPos.x , pixelPos.x)
            //Canvas1.coolBackground(c1, x, y);
            //console.log(PtC_X,PtC_Y,CanvasW/x,CanvasW/x)
            drawPaths();
            c1.fillStyle = 'rgba(255,0,0,1)';
            c1.fillRect(PtC_X,PtC_Y,CanvasW/x,CanvasW/x);
            c2.fillStyle = 'rgba(255,0,0,0.3)';
           
        }
        return;
    }

    
    // mouse position pixel wise (2-30) 
    
    if(((_pixelPos.x !== pixelPos.x) || (_pixelPos.y !== pixelPos.y))){
        points.push({x:pixelPos.x, y:pixelPos.y,color:[0,0,0]});
    }
    
    _pixelPos.x = pixelPos.x;
    _pixelPos.y = pixelPos.y;
    //console.log(pixelPos.x,pixelPos.y)

    // mouse position canvas wise
    c1.fillStyle = 'rgba(255,0,0,1)';
    c1.fillRect(PtC_X,PtC_Y,CanvasW/x,CanvasW/x)

}



canvas2.addEventListener('mousedown', startPosition);
canvas2.addEventListener('mouseup', finishedPosition);
canvas2.addEventListener('mousemove', draw);

canvas1.addEventListener('mousedown', startPosition);
canvas1.addEventListener('mouseup', finishedPosition);
canvas1.addEventListener('mousemove', draw);


let src = 'img/doge.jpg';

make_base(src);

function make_base(src)
{
  base_image = new Image();
  base_image.src = src;
  base_image.onload = function(){
    c2.drawImage(base_image, 0, 0, c2.canvas.width, c2.canvas.height);
    tempImg = base_image;
  }
}

var input = document.getElementById('input');
input.addEventListener('change', handleFiles);
var Image_Res = 1;

var tempImg;

function handleFiles(e) {
    var files=e.target.files;
    for(var i=0;i<files.length;i++){
        var img=new Image;
        img.onload=function(){

            Image_Res = Math.floor(this.height/this.width*30)/30;
            canvas2.width = Math.floor(window.innerWidth/30/CanvasDivision)*30;
            canvas2.height = canvas2.width * Image_Res;
            canvas1.width = canvas2.width;
            canvas1.height = canvas2.height;
            //console.log(Math.floor(window.innerWidth/30/CanvasDivision)*30,(Math.floor(window.innerWidth/30/CanvasDivision * Image_Res)*30))
            console.log(Image_Res)
            tempImg = this;
            c2.drawImage(this,0,0,c2.canvas.width,c2.canvas.height);
            x = 30;
            y = 30*(canvas2.height/canvas2.width);
            sliderX.value = x;
            sliderY.value = y;
            SliderX_value = x;
            SliderY_value = y;
            CanvasW = c1.canvas.width;
            CanvasH = c1.canvas.height;
            sliderY.style.height = CanvasH;
            console.log(x,y)
            Canvas1.coolBackground(c1, x, y);
            points_arr = [];

            console.log(canvas2.height/canvas2.width)
        }
    //Canvas1.coolBackground(c1, x, y);
    img.src=URL.createObjectURL(files[i]);
    //console.log("here!!!")
    }
  }

function GridToggle(id, btn) {
    var checkBox = document.getElementById("GridCheck");
    if (checkBox.checked == true){
        document.getElementById(id).style.display = 'none';
    }
    else{
        document.getElementById(id).style.display = 'inline';
    }
    //btn.style.display = 'none';
}

sliderX.sliderUpdate = function(){

}

sliderY.sliderUpdate = function(){

}

function download_image(){
    c1.fillStyle = 'rgba(255,255,255,1)';
    c1.fillRect(PtC_X,PtC_Y,CanvasW/x,CanvasW/x)
    image = canvas1.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
  }

  function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

var sus = [ 0,255,255,0,0,0,0,255,
            0,255,255,0,255,255,0,255,
            0,255,255,0,255,255,255,255,
            0,255,255,0,0,255,255,255,
            0,255,255,255,0,255,0,255,
            0,255,255,255,0,0,255,255]

var temp_data_del = new Uint8Array(sus.length)

function image_to_array(){
    for(var xi = 0; xi < x; xi++){
        for(var yi = 0; yi < y; yi++){
            
        }
    }
}

function download_binary() {
    // for (var i = 0; i < sus.length; i++) {
    //     if(sus[i] == 255){
    //         temp_data_del[i] = 255;
    //     }
    //     else{
    //         temp_data_del[i] = 0;
    //     }
       // }
    download(temp_data_del,"axaxa.bin")
}