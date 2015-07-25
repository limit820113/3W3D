"use strict";

var gl;
var points;
var initVS = [-1, -1, 0, 1, 1, -1];
var vertices = [];

window.onload = function init()
{
	if (isNaN(document.getElementById("level").value) || isNaN(document.getElementById("degree").value))
	{
		alert("invalid input");
		return;
	}
    var canvas = document.getElementById( "gl-canvas" );
	
	canvas.width = canvas.height = (window.innerWidth < window.innerHeight) ? window.innerWidth : window.innerHeight;
	vertices = [];

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	
	smaller(initVS, document.getElementById("level").value);

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    gl.uniform1f(
		gl.getUniformLocation ( program, "degree" ), 
		document.getElementById("degree").value
	);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function smaller(vs, level) {
	if (level == 1) {
		for (var i = 0; i < vs.length; i++)
			vertices.push(vs[i]);
	}
	else {
		for (var i = 0; i < 3; i++) {
			var t = [];
			
			for (var j = 0; j < 3; j++)
				t.push((vs[i*2]+vs[(i+j)%3*2])/2, (vs[i*2+1]+vs[(i+j)%3*2+1])/2);
			
			smaller(t, level-1);
		}
	}
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, vertices.length/2 );
}
