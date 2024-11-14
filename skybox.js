"use strict";

let skyboxQuadBufferInfo;
let skyboxTexture;
let skyboxLocation;
let viewDirectionProjectionInverseLocation;
let positionLocation;
let positionBuffer;

// Fill the buffer with the values that define a quad.
function setGeometry(gl) {
    var positions = new Float32Array(
      [
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  }
  

function skyboxSetup(gl) {

  skyboxQuadBufferInfo = primitives.createXYQuadBufferInfo(gl);

  // Create a texture.
  skyboxTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);

  const faceInfos = [
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      url: 'Textures/planet_skybox.webp',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      url: 'Textures/planet_skybox.webp',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      url: 'Textures/planet_skybox.webp',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      url: 'Textures/planet_skybox.webp',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      url: 'Textures/planet_skybox.webp',
    },
    {
      target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
      url: 'Textures/planet_skybox.webp',
    },
  ];
  faceInfos.forEach((faceInfo) => {
    const {target, url} = faceInfo;

    // Upload the canvas to the cubemap face.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 512;
    const height = 512;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;

    // setup each face so it's immediately renderable
    gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

    // Asynchronously load an image
    const image = new Image();
    image.src = url;
    image.addEventListener('load', function() {
      // Now that the image has loaded make copy it to the texture.
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);
      gl.texImage2D(target, level, internalFormat, format, type, image);
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    });
  });
  gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);


    // lookup uniforms
    skyboxLocation = gl.getUniformLocation(skyboxProgramInfo.program, "u_skybox");
    viewDirectionProjectionInverseLocation =
        gl.getUniformLocation(skyboxProgramInfo.program, "u_viewDirectionProjectionInverse");

          // look up where the vertex data needs to go.
    positionLocation = gl.getAttribLocation(skyboxProgramInfo.program, "a_position");

      // Create a buffer for positions
  positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Put the positions in the buffer
  setGeometry(gl);
}

let then = 0;   
  // Draw the scene.
function renderSkybox(gl, cameraPosition, target, up) {

// convert to seconds
let time = TIME;
// Subtract the previous time from the current time
var deltaTime = time - then;
// Remember the current time for the next frame.
then = time;

//webglUtils.resizeCanvasToDisplaySize(gl.canvas);

// Tell WebGL how to convert from clip space to pixels
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.enable(gl.CULL_FACE);
gl.enable(gl.DEPTH_TEST);

// Clear the canvas AND the depth buffer.
//gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// Tell it to use our program (pair of shaders)
gl.useProgram(skyboxProgramInfo.program);

// Turn on the position attribute
gl.enableVertexAttribArray(positionLocation);

// Bind the position buffer.
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 2;          // 2 components per iteration
var type = gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer
gl.vertexAttribPointer(
    positionLocation, size, type, normalize, stride, offset);

// Make a view matrix from the camera matrix.
//var viewMatrix = m4.inverse(window.viewMatrix.flat());
var viewMatrix = m4.inverse(window.viewMatrix.flat());

// We only care about direciton so remove the translation
viewMatrix[12] = 0;
viewMatrix[13] = 0;
viewMatrix[14] = 0;

var viewDirectionProjectionMatrix =
    m4.multiply(window.projectionMatrix.flat(), viewMatrix);
var viewDirectionProjectionInverseMatrix =
    m4.inverse(viewDirectionProjectionMatrix);

// Set the uniforms
gl.uniformMatrix4fv(
    viewDirectionProjectionInverseLocation, false,
    viewDirectionProjectionInverseMatrix);

// Tell the shader to use texture unit 0 for u_skybox
gl.uniform1i(skyboxLocation, 0);

// let our quad pass the depth test at 1.0
gl.depthFunc(gl.LEQUAL);

// Draw the geometry.
gl.drawArrays(gl.TRIANGLES, 0, 1 * 6);
}