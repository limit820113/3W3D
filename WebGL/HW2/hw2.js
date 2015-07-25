"use strict";

var canvas;
var gl;


var maxNumTriangles = 10000;
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0, colorIndex = 0;

var redraw = false;

var colors = [
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    canvas.addEventListener("mousedown", function(event){
      redraw = true;
	  addPoint(event, vBuffer, cBuffer);
	  
    });

    canvas.addEventListener("mouseup", function(event){
      redraw = false;
	  addPoint(event, vBuffer, cBuffer);

    });
    //canvas.addEventListener("mousedown", function(){
    canvas.addEventListener("mousemove", function(event){

        if(redraw) {
			addPoint(event, vBuffer, cBuffer);
			addPoint(event, vBuffer, cBuffer);
		}

    } );
	
	document.getElementById("black").onclick = function () {
        colorIndex = 0;
    };
	
	document.getElementById("red").onclick = function () {
        colorIndex = 1;
    };
	
	document.getElementById("yellow").onclick = function () {
        colorIndex = 2;
    };
	
	document.getElementById("green").onclick = function () {
        colorIndex = 3;
    };
	
	document.getElementById("blue").onclick = function () {
        colorIndex = 4;
    };
	
	document.getElementById("magenta").onclick = function () {
        colorIndex = 5;
    };
	
	document.getElementById("cyan").onclick = function () {
        colorIndex = 6;
    };


    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
	
	gl.clear( gl.COLOR_BUFFER_BIT );
}

function addPoint(event, vBuffer, cBuffer)
{
	var t = vec2(
		2*event.clientX/canvas.width-1,
		2*(canvas.height-event.clientY)/canvas.height-1
	);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
	
	t = vec4(colors[colorIndex]);
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
	index++;
	
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINES, 0, index );
}
